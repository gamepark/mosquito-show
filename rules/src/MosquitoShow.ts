import {IncompleteInformation, SequentialGame} from '@gamepark/rules-api'
import Animal from './animals/Animal'
import Coordinates from './fields/Coordinates'
import GameBoard from './GameBoard'
import GameState from './GameState'
import GameView from './GameView'
import {isGameOptions, MosquitoShowOptions} from './MosquitoShowOptions'
import {eatMove, Move, moveAnimal, moveAnimalMove, MoveType, playMosquitoEffect, selectMosquitoEffectField} from './moves'
import {MoveView} from './moves/MoveView'
import PlayerColor from './PlayerColor'
import {createMosquitos} from './utils/BoardUtils'

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
        players: [{
          color: PlayerColor.Blue, ownedGoldenMosquitos: 0, availableMosquitoEffects: [], toucanChosenEffectId: -1, toucanStartPosition: -1,
          chameleonMoved: false, toucanBlocked: false, chameleonBlocked: false
        },
          {
            color: PlayerColor.Orange, ownedGoldenMosquitos: 0, availableMosquitoEffects: [], toucanChosenEffectId: -1, toucanStartPosition: -1,
            chameleonMoved: false, toucanBlocked: false, chameleonBlocked: false
          }
        ],
        activePlayer: Math.random() < 0.5 ? PlayerColor.Orange : PlayerColor.Blue,
        board: {animalLocations: []},
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
    //const activePlayer = this.state.players.find(player => player.color === this.state.activePlayer)!

    if (isGameSetup(this.state)) {
      for (const animal of [Chameleon, Toucan]) {
        if (!isOnBoard(this.state.board, this.state.activePlayer, animal)) {
          getValidDestinations(this.state.board, this.state.activePlayer, animal).forEach(coordinates => moves.push(moveAnimalMove(animal, coordinates)))
        }
      }
    } else {
      getPondsWithMosquitoAroundChameleon(this.state).forEach(pond => moves.push(eatMove(pond.x, pond.y)))
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
      case MoveType.Eat:
        selectMosquitoEffectField(move, this.state)
        break
      case MoveType.PlayMosquitoEffect:
        playMosquitoEffect(move, this.state)
        break
    }
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
    if (move.type === MoveType.Eat) {
      let pile = this.state.mosquitos[move.x][move.y]
      return {...move, mosquito: pile[pile.length - 1].mosquito}
    }
    return move
  }
}

export function isGameSetup(game: GameState | GameView) {
  return game.board.animalLocations.length < 4
}

export function isOnBoard(board: GameBoard, player: PlayerColor, animal: Animal) {
  return board.animalLocations.some(location => location.animal === animal && location.player === player)
}

export function getValidDestinations(board: GameBoard, player: PlayerColor, animal: Animal): Coordinates[] {
  const result: Coordinates[] = []
  const origin = board.animalLocations.find(location => location.animal === animal && location.player === player)
  if (!origin) {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (!board.animalLocations.some(location => location.x === x && location.y === y)) {
          result.push({x, y})
        }
      }
    }
  }
  return result
}

export function isValidDestination(board: GameBoard, player: PlayerColor, animal: Animal, {x, y}: Coordinates) {
  const origin = board.animalLocations.find(location => location.animal === animal && location.player === player)
  if (!origin) {
    return !board.animalLocations.some(location => location.x === x && location.y === y)
  }
  return false // TODO animal legal moves after setup
}

export function canMoveAnimal(game: GameView, animal: Animal) {
  const location = game.board.animalLocations.find(location => location.animal === animal && location.player === game.activePlayer)
  if (!location) {
    return true
  }
  return true // TODO: implement constraints
}

export function getPondsWithMosquitoAroundChameleon(game: GameState) {
  const location = game.board.animalLocations.find(location => location.animal === Chameleon && location.player === game.activePlayer)
  if (!location) return []
  const ponds = [
    {x: location.x, y: location.y},
    {x: location.x + 1, y: location.y},
    {x: location.x, y: location.y + 1},
    {x: location.x + 1, y: location.y + 1}
  ]
  return ponds.filter(pond => game.mosquitos[pond.x][pond.y].length > 0)
}

export function getPredictableAutomaticMoves(state: GameState | GameView): Move | void {

}
