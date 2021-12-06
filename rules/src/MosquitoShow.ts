import { IncompleteInformation, SequentialGame } from '@gamepark/rules-api'
import Animal from './animals/Animal'
import Coordinates from './fields/Coordinates'
import GameState from './GameState'
import GameView from './GameView'
import { Mosquito, Waterlily } from './material/MosquitoEffect'
import { isGameOptions, MosquitoShowOptions } from './MosquitoShowOptions'
import { chooseMosquitoEffectMove, eat, eatMove, Move, moveAnimal, moveAnimalMove, moveMosquitoToken, moveMosquitoTokenMove, MoveType, playRedMosquitoEffect, playWhiteMosquitoEffect, playWhiteMosquitoEffectMove } from './moves'
import { MoveView } from './moves/MoveView'
import { revealMosquito, revealMosquitoMove } from './moves/RevealMosquito'
import PlayerColor from './PlayerColor'
import { createMosquitos } from './utils/BoardUtils'

const {Orange, Blue} = PlayerColor
const {Toucan, Chameleon} = Animal

/**
 * Your Board Game rules must extend either "SequentialGame" or "SimultaneousGame".
 * When there is at least on situation during the game where multiple players can act at the same time, it is a "SimultaneousGame"
 * If the game contains information that players does not know (dices, hidden cards...), it must implement "IncompleteInformation".
 * If the game contains information that some players know, but the other players does not, it must implement "SecretInformation" instead.
 * Later on, you can also implement "Competitive", "Undo", "TimeLimit" and "Eliminations" to add further features to the game.
 */
export default class MosquitoShow extends SequentialGame<GameState, Move, PlayerColor>
  implements IncompleteInformation<GameState, GameView, Move, MoveView, PlayerColor> {

  constructor(state: GameState)
  constructor(options: MosquitoShowOptions)
  constructor(arg: GameState | MosquitoShowOptions) {
    if (isGameOptions(arg)) {
      // const board = setupGameBoard()
      super({
        players: [Blue, Orange].map(color => ({color, goldenMosquitos: 0, eatenMosquitos: [], pendingToucanEat: []})),
        activePlayer: Math.random() < 0.5 ? Orange : Blue,
        mosquitos: createMosquitos(),
        mosquitoEffect: -1,
        mosquitoEffectStartFieldId: -1,
        inMoveAnimalSwitchNotAllowed: true,
        pendingChameleonMove: false
      })
    } else {
      super(arg)
    }
  }

  /**
   * Retrieves the player which must act. It is used to secure the game and prevent players from acting outside their turns.
   * Only required in a SequentialGame.
   * @return The identifier of the player whose turn it is
   */
  getActivePlayer(): PlayerColor | undefined {
    return this.state.activePlayer
  }

  /**
   * Return the exhaustive list of moves that can be played by the active player.
   * This is used for 2 features:
   * - security (preventing unauthorized moves from being played);
   * - "Dummy players": when a player leaves a game, it is replaced by a "Dummy" that plays random moves, allowing the other players to finish the game.
   * In a SimultaneousGame, as multiple players can be active you will be passed a playedId as an argument.
   * If the game allows a very large (or infinite) number of moves, instead of implementing this method, you can implement instead:
   * - isLegal(move: Move):boolean, for security; and
   * - A class that implements "Dummy" to provide a custom Dummy player.
   */
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
    } else if (activePlayer.eatenMosquitos.length && !activePlayer.selectedMosquito) {
      activePlayer.eatenMosquitos.forEach(mosquitoEffect => moves.push(chooseMosquitoEffectMove(mosquitoEffect)))
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
              origin.x != x || origin.y != y ? moves.push(moveMosquitoTokenMove(origin, { x, y })) : undefined
            )
          )
        }
        )
      }
    } else {
      getPondsWithMosquitoAroundChameleon(this.state).forEach(pond => moves.push(eatMove(pond.x, pond.y)))
      getValidDestinations(this.state, Toucan).forEach(coordinates => moves.push(moveAnimalMove(Toucan, coordinates)))
    }
    // for activeplayer
    // if from gameboard each animal -> move for all possible fields
    // else if -> move for toucan possible fields && (eat for possible token fields (when !chameleonmoved) || move for chameleon possible fields)
    //
    return moves
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   */
  play(move: Move): void {
    switch (move.type) {
      case MoveType.MoveAnimal:
        moveAnimal(this.state, move)
        break
      case MoveType.MoveMosquitoToken:
        moveMosquitoToken(this.state, move)
        break
      case MoveType.Eat:
        eat(this.state, move)
        break
      case MoveType.PlayWhiteMosquitoEffect:
        playWhiteMosquitoEffect(this.state, move)
        break
      case MoveType.PlayRedMosquitoEffect:
        playRedMosquitoEffect(this.state, move)
        break    
      case MoveType.RevealMosquito:
        revealMosquito(this.state, move)
        break
    }
    endOfTurn(this.state)
  }

  /**
   * Here you can return the moves that should be automatically played when the game is in a specific state.
   * Here is an example from monopoly: you roll a dice, then move you pawn accordingly.
   * A first solution would be to do both state updates at once, in a "complex move" (RollDiceAndMovePawn).
   * However, this first solution won't allow you to animate step by step what happened: the roll, then the pawn movement.
   * "getAutomaticMove" is the solution to trigger multiple moves in a single action, and still allow for step by step animations.
   * => in that case, "RollDice" could set "pawnMovement = x" somewhere in the game state. Then getAutomaticMove will return "MovePawn" when
   * "pawnMovement" is defined in the state.
   * Of course, you must return nothing once all the consequences triggered by a decision are completed.
   * VERY IMPORTANT: you should never change the game state in here. Indeed, getAutomaticMove will never be called in replays, for example.
   *
   * @return The next automatic consequence that should be played in current game state.
   */
  getAutomaticMove(): void | Move {
    const activePlayer = this.state.players.find(player => player.color === this.state.activePlayer)
    if (!activePlayer) return
    if (activePlayer.pendingToucanEat.length) {
      const {y, x} = activePlayer.pendingToucanEat[0]
      return eatMove(x, y)
    } else if (!activePlayer.eatenMosquitos.length) {
      const mosquito = mosquitoToReveal(this.state)
      if (mosquito) {
        return revealMosquitoMove(mosquito.x, mosquito.y)
      }
    }

    // Chameleon
    /*if (this.state.selectedAnimalId == 3 || this.state.selectedAnimalId == 4) {
      const activePlayerState = getActivePlayerState(this.state)!
      // Handle Mosquito Effect after Moving
      if (activePlayerState.availableMosquitoEffects.length > 0 && activePlayerState.chameleonMoved) {
        return playMosquitoEffectMove(0, -1, -1)
      }
    }*/
    // // Toucan
    // if (this.state.selectedAnimalId == 1 || this.state.selectedAnimalId == 2) {
    //   var activePlayerState = getActivePlayerState(this.state)
    //   const currentAnimalField = this.getCurrentAnimalField();
    //   var nextToucanPosition: number = -1
    //   var effectFieldToEat: number
    //   if (activePlayerState !== undefined && currentAnimalField !== undefined && activePlayerState.toucanStartPosition !== currentAnimalField.fieldId) {
    //     var upDownIndicator = currentAnimalField.fieldId - activePlayerState.toucanStartPosition
    //     if (upDownIndicator % 3 == 0 && upDownIndicator % 5 == 0) {
    //       if (upDownIndicator > 0) {
    //         // bottom right
    //         nextToucanPosition = activePlayerState.toucanStartPosition + 5
    //       }
    //       if (upDownIndicator < 0) {
    //         // up left
    //         nextToucanPosition = activePlayerState.toucanStartPosition - 5
    //       }
    //     } else {
    //       if (upDownIndicator > 0 && upDownIndicator % 3 == 0) {
    //         // bottom left
    //         nextToucanPosition = activePlayerState.toucanStartPosition + 3
    //       }
    //       if (upDownIndicator > 0 && upDownIndicator % 5 == 0) {
    //         // bottom right
    //         nextToucanPosition = activePlayerState.toucanStartPosition + 5
    //       }
    //       if (upDownIndicator < 0 && upDownIndicator % 3 == 0) {
    //         // up right
    //         nextToucanPosition = activePlayerState.toucanStartPosition - 3
    //       }
    //       if (upDownIndicator < 0 && upDownIndicator % 5 == 0) {
    //         // up left
    //         nextToucanPosition = activePlayerState.toucanStartPosition - 5
    //       }
    //     }
    //     // Handle Up to three Eat Moves
    //     if (nextToucanPosition !== -1) {
    //       effectFieldToEat = activePlayerState.toucanStartPosition + nextToucanPosition
    //       activePlayerState.toucanStartPosition = nextToucanPosition
    //       return eatMove(effectFieldToEat, nextToucanPosition)
    //     } else {
    //       console.error('Could not get nextToucanPosition')
    //     }
    //   }
    //   // Handle Up to three Mosquito Effects
    //   if (activePlayerState !== undefined && currentAnimalField !== undefined && activePlayerState.toucanStartPosition === currentAnimalField.fieldId && activePlayerState.availableMosquitoEffects.length > 0) {
    //     // Handle Golden Mosquitos first
    //     for (let i = 0; i < activePlayerState.availableMosquitoEffects.length; i++) {
    //       const effect = activePlayerState.availableMosquitoEffects[i];
    //       if (effect.front == 5) {
    //         return playMosquitoEffectMove(i, -1, -1)
    //       }
    //     }
    //     // In case of one left Effect play it automatically, otherwise let Player choose
    //     if (activePlayerState.availableMosquitoEffects.length > 1) {
    //       if (activePlayerState.toucanChosenEffectId == -1) {
    //         //choose
    //         console.error("still something to do")
    //       } else {
    //         for (let i = 0; i < activePlayerState.availableMosquitoEffects.length; i++) {
    //           const effect = activePlayerState.availableMosquitoEffects[i];
    //           if (effect.id == activePlayerState.toucanChosenEffectId) {
    //             return playMosquitoEffectMove(i, -1, -1)
    //           }
    //         }
    //       }
    //     } else if (activePlayerState.availableMosquitoEffects.length == 1) {
    //       return playMosquitoEffectMove(0, -1, -1)
    //     }
    //   }
    // }
    // // Handle Red Mosquito Effect after PlayerSwitch
    // if (this.state.mosquitoEffect === 3 && this.state.selectedAnimalId === undefined && this.state.mosquitoEffectStartFieldId > -1) {
    //   for (let i = 0; i < this.state.board.animalFields.length; i++) {
    //     const animalField = this.state.board.animalFields[i];
    //     if (animalField.fieldId == this.state.mosquitoEffectStartFieldId) {
    //       this.state.inMoveAnimalSwitchNotAllowed = false
    //       return selectAnimalMove(animalField.animalId)
    //     }
    //   }
    // }
  }

  /*getCurrentAnimalField() {
    var animalFieldIds = this.state.board.animalLocations
    for (let j = 0; j < animalFieldIds.length; j++) {
      if (animalFieldIds[j].animalId == this.state.selectedAnimalId) {
        return animalFieldIds[j]
      }
    }
    return undefined
  }*/

  /**
   * If your game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(): GameView {
    return {
      ...this.state,
      mosquitos: this.state.mosquitos.map(row =>
        row.map(pile =>
          pile.map(mosquitoOnBoard => {
            if (mosquitoOnBoard.revealed) {
              return {mosquito: mosquitoOnBoard.mosquito}
            } else {
              return {waterlily: mosquitoOnBoard.waterlily}
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
        return mosquitoOnBoard.revealed ? move : {...move, mosquito: mosquitoOnBoard.mosquito}
      }
      case MoveType.RevealMosquito: {
        const pile = this.state.mosquitos[move.x][move.y]
        const mosquitoOnBoard = pile[pile.length - 1]
        return {...move, mosquito: mosquitoOnBoard.mosquito}
      }
      default:
        return move
    }
  }
}

export function isPlacementPhase(game: GameState | GameView) {
  return game.players.some(player => !player.toucan || !player.chameleon)
}

export function getValidDestinations(game: GameState | GameView, animal: Animal): Coordinates[] {
  const player = game.players.find(player => player.color === game.activePlayer)
  if (!player) return []
  const origin = animal === Animal.Chameleon ? player.chameleon : player.toucan
  if (!origin || (!player.chameleonMustMove && player.eatenMosquitos.some(mosquito => mosquito === Mosquito.Blue))) {
    // Any free space
    const result: Coordinates[] = []
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (!getAnimalLocations(game).some(location => location.x === x && location.y === y)) {
          result.push({x, y})
        }
      }
    }
    return result
  }
  const animalLocations = getAnimalLocations(game)
  if (animal === Chameleon) {
    if (!player.chameleonMustMove) return []
    const {x, y} = origin
    return [{x: x + 1, y}, {x, y: y + 1}, {x: x - 1, y}, {x, y: y - 1}]
      .filter(({x, y}) => x >= 0 && x <= 3 && y >= 0 && y <= 3 && !animalLocations.some(animal => animal.x === x && animal.y === y))
  } else {
    const result: Coordinates[] = []
    let x = origin.x
    let y = origin.y
    while (x > 0 && y > 0 && game.mosquitos[--x][--y].length && !animalLocations.some(animal => animal.x === x && animal.y === y)) {
      result.push({x, y})
    }
    x = origin.x
    y = origin.y
    while (x < 3 && y > 0 && game.mosquitos[x++][--y].length && !animalLocations.some(animal => animal.x === x && animal.y === y)) {
      result.push({x, y})
    }
    x = origin.x
    y = origin.y
    while (x > 0 && y < 3 && game.mosquitos[--x][y++].length && !animalLocations.some(animal => animal.x === x && animal.y === y)) {
      result.push({x, y})
    }
    x = origin.x
    y = origin.y
    while (x < 3 && y < 3 && game.mosquitos[x++][y++].length && !animalLocations.some(animal => animal.x === x && animal.y === y)) {
      result.push({x, y})
    }
    return result
  }
}

export function getAnimalLocations(game: GameState | GameView): Coordinates[] {
  return game.players.flatMap(p => {
    const locations: Coordinates[] = []
    if (p.toucan) locations.push(p.toucan)
    if (p.chameleon) locations.push(p.chameleon)
    return locations
  })
}

export function isValidDestination(game: GameState | GameView, animal: Animal, {x, y}: Coordinates) {
  const player = game.players.find(p => p.color === game.activePlayer)
  if (!player) return false
  const origin = animal === Chameleon ? player.chameleon : player.toucan
  if (!origin || (!player.chameleonMustMove && player.eatenMosquitos.some(mosquito => mosquito === Mosquito.Blue))) {
    return !getAnimalLocations(game).some(location => location.x === x && location.y === y)
  }
  return getValidDestinations(game, animal).some(destination => destination.x === x && destination.y === y)
}

export function canMoveAnimal(game: GameState | GameView, animal: Animal) {
  const player = game.players.find(p => p.color === game.activePlayer)!
  const location = animal === Animal.Chameleon ? player.chameleon : player.toucan
  if (!location) {
    return true
  }
  if (player.chameleonMustMove) {
    return animal === Animal.Chameleon
  }
  return true // TODO: implement constraints
}

export function getPondsWithMosquitoAroundChameleon(game: GameState) {
  const location = game.players.find(p => p.color === game.activePlayer)?.chameleon
  if (!location) return []
  const pondSpaces: Coordinates[] = []
  if (location.x > 0 && location.y > 0 && game.mosquitos[location.x - 1][location.y - 1].length > 0) {
    pondSpaces.push({x: location.x - 1, y: location.y - 1})
  }
  if (location.x > 0 && location.y < 3 && game.mosquitos[location.x - 1][location.y].length > 0) {
    pondSpaces.push({x: location.x - 1, y: location.y})
  }
  if (location.x < 3 && location.y > 0 && game.mosquitos[location.x][location.y - 1].length > 0) {
    pondSpaces.push({x: location.x, y: location.y - 1})
  }
  if (location.x < 3 && location.y < 3 && game.mosquitos[location.x][location.y].length > 0) {
    pondSpaces.push({x: location.x, y: location.y})
  }
  return pondSpaces
}

export function chameleonCanEat(game: GameState | GameView, x: number, y: number) {
  if (!game.mosquitos[x][y].length) return false
  const player = game.players.find(p => p.color === game.activePlayer)
  if (!player || !player.chameleon || player.chameleonMustMove) return false
  return (player.chameleon.x === x || player.chameleon.x === x + 1) && (player.chameleon.y === y || player.chameleon.y === y + 1)

}

export function endOfTurn(game: GameState | GameView) {
  const player = game.players.find(p => p.color === game.activePlayer)!
  if (player.goldenMosquitos >= 9) {
    delete game.activePlayer
  } else if (!player.chameleonMustMove && !player.pendingToucanEat.length && !player.eatenMosquitos.length && !mosquitoToReveal(game)) {
    game.activePlayer = player.color === Blue ? Orange : Blue
    if (!canMoveAnimal(game, Toucan) && !canMoveAnimal(game, Chameleon)) {
      // TODO: not game over if animal cannot move due to red mosquito
      delete game.activePlayer
    }
  }
}

export function mosquitoToReveal(game: GameState | GameView) {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      const pile = game.mosquitos[x][y]
      if (!pile.length) continue
      const mosquito = pile[pile.length - 1]
      if (mosquito.waterlily === Waterlily.WaterLily && !mosquito.revealed) {
        return {x, y}
      }
    }
  }
  return
}

export function getActivePlayerState(state: GameState | GameView) {
  return state.players.find(player => player.color === state.activePlayer)!
}


export function getPredictableAutomaticMoves(state: GameState | GameView): Move | void {

}
