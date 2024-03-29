import { Action, Competitive, IncompleteInformation, Rules, Undo } from '@gamepark/rules-api'
import Animal from './animals/Animal'
import Coordinates from './fields/Coordinates'
import GameState from './GameState'
import GameView from './GameView'
import { Mosquito } from './material/MosquitoEffect'
import { isGameOptions, MosquitoShowOptions } from './MosquitoShowOptions'
import {
  changeActivePlayer,
  changeActivePlayerMove,
  chooseMosquitoEffect,
  chooseMosquitoEffectMove,
  discardTokenFromBoard,
  discardTokenFromBoardMove,
  discardTokenFromPlayerBoard,
  discardTokenFromPlayerBoardMove,
  eat,
  eatMove,
  Move,
  moveAnimal,
  moveAnimalMove,
  moveMosquitoToken,
  moveMosquitoTokenMove,
  MoveType, revealMosquito, revealMosquitoMove, selectOpponentAnimal,
  selectOpponentAnimalMove,
  skipTurn,
  skipTurnMove
} from './moves'
import { MoveView } from './moves/MoveView'
import PlayerColor from './PlayerColor'
import { canMoveAnimal, canMoveAnimalOfPlayer, getPondsWithMosquitoAroundChameleon, getValidDestinations } from './utils/AnimalUtils'
import { createMosquitos, mosquitoToReveal, tokenForcedToReveal } from './utils/BoardUtils'
import { canUndo, endOfTurn, gameEndBlock, gameEndGolden, getPlayerState, isOver, isPlacementPhase } from './utils/GameUtils'
import { getSelectedMosquitoFromPlayer } from './utils/PlayerBoardUtils'

const { Orange, Blue } = PlayerColor
const { Toucan, Chameleon } = Animal

export default class MosquitoShow extends Rules<GameState | GameView, Move | MoveView, PlayerColor>
  implements IncompleteInformation<GameView, Move, MoveView>, Undo<GameState, Move, PlayerColor>, Competitive<GameState | GameView, Move, PlayerColor> {

  constructor(state: GameState | GameView)
  constructor(options: MosquitoShowOptions)
  constructor(arg: GameState | GameView | MosquitoShowOptions) {
    if (isGameOptions(arg)) {
      super({
        players: [Blue, Orange].map(color => ({ color, goldenMosquitos: 0, eatenMosquitos: [], pendingToucanEat: [], hasPlayerToMoveAnimal: undefined })),
        activePlayer: Math.random() < 0.5 ? Orange : Blue,
        mosquitos: createMosquitos(),
        turnOver: false,
        handleMosquitoEffectOver: false
      })
    } else {
      super(arg)
    }
  }

  isOver(): boolean {
    return isOver(this.state)
  }

  rankPlayers(playerA: PlayerColor, playerB: PlayerColor): number {
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
    return getPlayerState(this.state, playerId)!.goldenMosquitos
  }

  canUndo(action: Action<Move, PlayerColor>, consecutiveActions: Action<Move, PlayerColor>[]): boolean {
    return canUndo(this.state, action, consecutiveActions)
  }

  getActivePlayer(): PlayerColor | undefined {
    return this.state.activePlayer
  }

  getLegalMoves(playerId: PlayerColor): Move[] {
    const moves: Move[] = []
    const activePlayer = this.state.players.find(player => player.color === this.state.activePlayer)!

    if (playerId !== activePlayer.color) {
      return []
    }
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
    } else if (activePlayer.eatenMosquitos.length && activePlayer.selectedMosquitoIndex === undefined) {
      activePlayer.eatenMosquitos.forEach((_, index) => moves.push(chooseMosquitoEffectMove(index)))
    } else if (activePlayer.selectedMosquitoIndex !== undefined) {
      if (getSelectedMosquitoFromPlayer(activePlayer) == Mosquito.White) {
        this.state.mosquitos.map((yz, x) => yz.map((z, y) => z.length ? moves.push(discardTokenFromBoardMove(x, y)) : undefined))
      }
      if (getSelectedMosquitoFromPlayer(activePlayer) == Mosquito.Grey) {
        const origins: Coordinates[] = []
        this.state.mosquitos.map((yz, x) => yz.map((z, y) => z.length ? origins.push({ x, y }) : undefined))
        origins.forEach(origin => {
          [...Array(3)].map((_, x) =>
            [...Array(3)].map((_, y) =>
              origin.x != x || origin.y != y ? moves.push(moveMosquitoTokenMove(origin, { x, y })) : undefined
            )
          )
        }
        )
      }
      if (getSelectedMosquitoFromPlayer(activePlayer) == Mosquito.Blue) {
        getValidDestinations(this.state, Chameleon).forEach(coordinates => moves.push(moveAnimalMove(Chameleon, coordinates)))
        getValidDestinations(this.state, Toucan).forEach(coordinates => moves.push(moveAnimalMove(Toucan, coordinates)))
      }
      if (getSelectedMosquitoFromPlayer(activePlayer) == Mosquito.Red) {
        [Chameleon, Toucan].forEach(animal => moves.push(selectOpponentAnimalMove(animal)))
      }
    } else if (this.state.turnOver) {
      moves.push(changeActivePlayerMove())
    } else if (this.state.handleMosquitoEffectOver) {
      moves.push(discardTokenFromPlayerBoardMove())
    } else {
      getPondsWithMosquitoAroundChameleon(this.state).forEach(pond => moves.push(eatMove(tokenForcedToReveal(this.state, pond.x, pond.y), pond.x, pond.y)))
      getValidDestinations(this.state, Toucan).forEach(coordinates => moves.push(moveAnimalMove(Toucan, coordinates)))
    }
    return moves
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.MoveAnimal:
        moveAnimal(this.state, move)
        break
      case MoveType.Eat:
        eat(this.state, move)
        break
      case MoveType.MoveMosquitoToken:
        moveMosquitoToken(this.state, move)
        break
      case MoveType.DiscardTokenFromBoard:
        discardTokenFromBoard(this.state, move)
        break
      case MoveType.SelectOpponentAnimal:
        selectOpponentAnimal(this.state, move)
        break
      case MoveType.ChooseMosquitoEffect:
        chooseMosquitoEffect(this.state, move)
        return []
      case MoveType.RevealMosquito:
        revealMosquito(this.state, move)
        break
      case MoveType.SkipTurn:
        skipTurn(this.state, move)
        break
      case MoveType.ChangeActivePlayer:
        changeActivePlayer(this.state, move)
        gameEndBlock(this.state)
        return []
      case MoveType.DiscardTokenFromPlayerBoard:
        discardTokenFromPlayerBoard(this.state, move)
        break
    }
    gameEndGolden(this.state)
    endOfTurn(this.state)
    return []
  }

  getAutomaticMoves(): Move[] {
    const activePlayer = this.state.players.find(player => player.color === this.state.activePlayer)
    if (!activePlayer) return []
    if (activePlayer.pendingToucanEat.length) {
      const { y, x } = activePlayer.pendingToucanEat[0]
      return [eatMove(tokenForcedToReveal(this.state, x, y), x, y)]
    } else if (this.state.handleMosquitoEffectOver) {
      return [discardTokenFromPlayerBoardMove()]
    } else if (this.state.turnOver) {
      return [changeActivePlayerMove()]
    } else if (!activePlayer.eatenMosquitos.length && !activePlayer.chameleonMustMove) {
      const mosquito = mosquitoToReveal(this.state)
      if (mosquito) {
        return [revealMosquitoMove(mosquito.x, mosquito.y)]
      }
    }
    return []
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
        return { ...move, mosquito: mosquitoOnBoard.mosquito! }
      }
      default:
        return move
    }
  }
}
