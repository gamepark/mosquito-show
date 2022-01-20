import { Action, Competitive, IncompleteInformation, SequentialGame, Undo } from '@gamepark/rules-api'
import Animal from './animals/Animal'
import Coordinates from './fields/Coordinates'
import GameState from './GameState'
import GameView from './GameView'
import { Mosquito } from './material/MosquitoEffect'
import { isGameOptions, MosquitoShowOptions } from './MosquitoShowOptions'
import { changeActivePlayer, changeActivePlayerMove, chooseMosquitoEffect, chooseMosquitoEffectMove, eat, eatMove, Move, moveAnimal, moveAnimalMove, MoveType, playBlueMosquitoEffect, playBlueMosquitoEffectMove, playGreyMosquitoEffect, playGreyMosquitoEffectMove, playRedMosquitoEffect, playRedMosquitoEffectMove, playWhiteMosquitoEffect, playWhiteMosquitoEffectMove, skipTurn, skipTurnMove } from './moves'
import { MoveView } from './moves/MoveView'
import { revealMosquito, revealMosquitoMove } from './moves/RevealMosquito'
import PlayerColor from './PlayerColor'
import { canMoveAnimal, canMoveAnimalOfPlayer, getPondsWithMosquitoAroundChameleon, getValidDestinations } from './utils/AnimalUtils'
import { createMosquitos, mosquitoToReveal, tokenForcedToReveal } from './utils/BoardUtils'
import { canUndo, endOfTurn, gameEndBlock, gameEndGolden, getPlayerState, isPlacementPhase } from './utils/GameUtils'

const { Orange, Blue } = PlayerColor
const { Toucan, Chameleon } = Animal

export default class MosquitoShow extends SequentialGame<GameState, Move, PlayerColor>
  implements IncompleteInformation<GameState, GameView, Move, MoveView, PlayerColor>, Undo<GameState, Move, PlayerColor>, Competitive<GameState, Move, PlayerColor> {

  constructor(state: GameState)
  constructor(options: MosquitoShowOptions)
  constructor(arg: GameState | MosquitoShowOptions) {
    if (isGameOptions(arg)) {
      super({
        players: [Blue, Orange].map(color => ({ color, goldenMosquitos: 0, eatenMosquitos: [], pendingToucanEat: [], hasPlayerToMoveAnimal: undefined })),
        activePlayer: Math.random() < 0.5 ? Orange : Blue,
        mosquitos: createMosquitos(),
        turnOver: false
      })
    } else {
      super(arg)
    }
  }

  isOver(): boolean {
      return this.state.activePlayer === undefined
  }

  rankPlayers(playerA: PlayerColor, playerB: PlayerColor): number {
    console.log('rank')
    for (const player of this.state.players) {
      if (player.goldenMosquitos >= 9) {
        return player.color === playerA ? -1 : 1
      } else if (!canMoveAnimalOfPlayer(this.state, Toucan, player) && !canMoveAnimalOfPlayer(this.state, Chameleon, player)) {
        return player.color === playerA ? -1 : 1
      }
    }
    return 0
  }

  getScore(playerId: PlayerColor): number {
    console.log('score')
    return getPlayerState(this.state, playerId)!.goldenMosquitos
  }

  canUndo(action: Action<Move, PlayerColor>, consecutiveActions: Action<Move, PlayerColor>[]): boolean {
    return canUndo(action, consecutiveActions)
  }

  getActivePlayer(): PlayerColor | undefined {
    return this.state.activePlayer
  }

  getLegalMoves(): Move[] {
    const moves: Move[] = []
    const activePlayer = this.state.players.find(player => player.color === this.state.activePlayer)!

    if (isPlacementPhase(this.state)) {
      if (!activePlayer.toucan) {
        getValidDestinations(this.state, Toucan).forEach(coordinates => moves.push(moveAnimalMove(Toucan, coordinates)))
      }
      if (!activePlayer.chameleon) {
        getValidDestinations(this.state, Chameleon).forEach(coordinates => moves.push(moveAnimalMove(Chameleon, coordinates)))
      }
    } else if (activePlayer.chameleonMustMove) {
      getValidDestinations(this.state, Chameleon).forEach(coordinates => moves.push(moveAnimalMove(Chameleon, coordinates)))
    } else if (activePlayer.animalForcedToMove) {
      if (!canMoveAnimal(this.state, activePlayer.animalForcedToMove)) {
        moves.push(skipTurnMove())
      } else {
        if (activePlayer.animalForcedToMove === Chameleon) {
          getPondsWithMosquitoAroundChameleon(this.state).forEach(pond => moves.push(eatMove(tokenForcedToReveal(this.state, pond.x, pond.y), pond.x, pond.y)))
        } else {
          getValidDestinations(this.state, activePlayer.animalForcedToMove).forEach(coordinates => moves.push(moveAnimalMove(activePlayer.animalForcedToMove!, coordinates)))
        }
      }
    } else if (activePlayer.eatenMosquitos.length && !activePlayer.selectedMosquito) {
      const uniqueEatenMosquitos = activePlayer.eatenMosquitos.filter((element, index) => { return activePlayer.eatenMosquitos.indexOf(element) === index })
      uniqueEatenMosquitos.forEach(mosquitoEffect => moves.push(chooseMosquitoEffectMove(mosquitoEffect)))
    } else if (activePlayer.selectedMosquito) {
      if (activePlayer.selectedMosquito == Mosquito.White) {
        this.state.mosquitos.map((yz, x) => yz.map((z, y) => z.length ? moves.push(playWhiteMosquitoEffectMove(x, y)) : undefined))
      }
      if (activePlayer.selectedMosquito == Mosquito.Grey) {
        const origins: Coordinates[] = []
        this.state.mosquitos.map((yz, x) => yz.map((z, y) => z.length ? origins.push({ x, y }) : undefined))
        origins.forEach(origin => {
          [...Array(3)].map((_, x) =>
            [...Array(3)].map((_, y) =>
              origin.x != x || origin.y != y ? moves.push(playGreyMosquitoEffectMove(origin, { x, y })) : undefined
            )
          )
        }
        )
      }
      if (activePlayer.selectedMosquito == Mosquito.Blue) {
        getValidDestinations(this.state, Chameleon).forEach(coordinates => moves.push(playBlueMosquitoEffectMove(Chameleon, coordinates)))
        getValidDestinations(this.state, Toucan).forEach(coordinates => moves.push(playBlueMosquitoEffectMove(Toucan, coordinates)))
      }
      if (activePlayer.selectedMosquito == Mosquito.Red) {
        [Chameleon, Toucan].forEach(animal => moves.push(playRedMosquitoEffectMove(animal)))
      }
    } else if (this.state.turnOver) {
      moves.push(changeActivePlayerMove())
    } else {
      getPondsWithMosquitoAroundChameleon(this.state).forEach(pond => moves.push(eatMove(tokenForcedToReveal(this.state, pond.x, pond.y), pond.x, pond.y)))
      getValidDestinations(this.state, Toucan).forEach(coordinates => moves.push(moveAnimalMove(Toucan, coordinates)))
    }
    return moves
  }

  play(move: Move): void {
    switch (move.type) {
      case MoveType.MoveAnimal:
        moveAnimal(this.state, move)
        break
      case MoveType.Eat:
        eat(this.state, move)
        break
      case MoveType.PlayGreyMosquitoEffect:
        playGreyMosquitoEffect(this.state, move)
        break
      case MoveType.PlayWhiteMosquitoEffect:
        playWhiteMosquitoEffect(this.state, move)
        break
      case MoveType.PlayRedMosquitoEffect:
        playRedMosquitoEffect(this.state, move)
        break
      case MoveType.PlayBlueMosquitoEffect:
        playBlueMosquitoEffect(this.state, move)
        break
      case MoveType.ChooseMosquitoEffect:
        chooseMosquitoEffect(this.state, move)
        return
      case MoveType.RevealMosquito:
        revealMosquito(this.state, move)
        break
      case MoveType.SkipTurn:
        skipTurn(this.state, move)
        break
      case MoveType.ChangeActivePlayer:
        changeActivePlayer(this.state, move)
        gameEndBlock(this.state)
        return
    }
    gameEndGolden(this.state)
    endOfTurn(this.state)
  }

  getAutomaticMove(): void | Move {
    const activePlayer = this.state.players.find(player => player.color === this.state.activePlayer)
    if (!activePlayer) return
    if (activePlayer.pendingToucanEat.length) {
      const { y, x } = activePlayer.pendingToucanEat[0]
      return eatMove(tokenForcedToReveal(this.state, x, y), x, y)
    } else if (this.state.turnOver) {
      return changeActivePlayerMove()
    } else if (!activePlayer.eatenMosquitos.length && !activePlayer.chameleonMustMove) {
      const mosquito = mosquitoToReveal(this.state)
      if (mosquito) {
        return revealMosquitoMove(mosquito.x, mosquito.y)
      }
    }
  }

  getView(): GameView {
    return {
      ...this.state,
      mosquitos: this.state.mosquitos.map(row =>
        row.map(pile =>
          pile.map(mosquitoOnBoard => {
            if (mosquitoOnBoard.revealed) {
              return { mosquito: mosquitoOnBoard.mosquito }
            } else {
              return { waterlily: mosquitoOnBoard.waterlily }
            }
          })
        )
      )
    }
  }

  getMoveView(move: Move): MoveView {
    switch (move.type) {
      case MoveType.Eat: {
        const pile = this.state.mosquitos[move.x][move.y]
        const mosquitoOnBoard = pile[pile.length - 1]
        return mosquitoOnBoard.revealed ? move : { ...move, mosquito: mosquitoOnBoard.mosquito }
      }
      case MoveType.RevealMosquito: {
        const pile = this.state.mosquitos[move.x][move.y]
        const mosquitoOnBoard = pile[pile.length - 1]
        return { ...move, mosquito: mosquitoOnBoard.mosquito }
      }
      default:
        return move
    }
  }
}