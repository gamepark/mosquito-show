import { SequentialGame } from '@gamepark/rules-api'
import GameState, { getActivePlayerState } from './GameState'
import GameView from './GameView'
import { isGameOptions } from './MosquitoShowOptions'
import { Move, moveAnimal, MoveType } from './moves'
import { selectMosquitoEffectField } from './moves/Eat'
import { playMosquitoEffect, playMosquitoEffectMove } from './moves/PlayMosquitoEffect'
import PlayerColor, { getAnimalIdsFromColor } from './PlayerColor'
import { createEffectFields } from './utils/BoardUtils'
import { getPossibleFieldsFromPlayerboard } from './utils/GameUtils'

/**
 * Your Board Game rules must extend either "SequentialGame" or "SimultaneousGame".
 * When there is at least on situation during the game where multiple players can act at the same time, it is a "SimultaneousGame"
 * If the game contains information that players does not know (dices, hidden cards...), it must implement "IncompleteInformation".
 * If the game contains information that some players know, but the other players does not, it must implement "SecretInformation" instead.
 * Later on, you can also implement "Competitive", "Undo", "TimeLimit" and "Eliminations" to add further features to the game.
 */
export default class MosquitoShow extends SequentialGame<GameState, Move, PlayerColor>{
  /**
   * This constructor is called when the game "restarts" from a previously saved state.
   * @param state The state of the game
   */
  constructor(arg: GameState) {
    if (isGameOptions(arg)) {
      // const board = setupGameBoard()
      super({
        players: [{ color: PlayerColor.Blue, ownedGoldenMosquitos: 0, availableMosquitoEffects: [], toucanChosenEffectId: -1, toucanStartPosition: -1, chameleonMoved: false, toucanBlocked: false, chameleonBlocked: false },
        { color: PlayerColor.Orange, ownedGoldenMosquitos: 0, availableMosquitoEffects: [], toucanChosenEffectId: -1, toucanStartPosition: -1, chameleonMoved: false, toucanBlocked: false, chameleonBlocked: false }
        ],
        activePlayer: PlayerColor.Orange,
        board: { animalFields: [], mosquitoFields: createEffectFields() },
        mosquitoEffect: -1,
        mosquitoEffectStartFieldId: -1,
        inMoveAnimalSwitchNotAllowed: true,
        selectedAnimalId: -1,
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
    const activePlayer = this.state.players.find(player => player.color === this.state.activePlayer)
    if (!activePlayer) {
      return []
    }

    if (this.state.board.animalFields.length === 4) {
      moves.push({ type: MoveType.MoveAnimal, fieldId: 7, animalId: 3 })
    } else {
      // noch verfeinern, dass nur die moves legal sind von dem Tier, was noch nicht auf dem Plan ist.
      getPossibleFieldsFromPlayerboard(this.state.board.animalFields)
        .forEach(possibleFieldId => getAnimalIdsFromColor(activePlayer.color)
          .forEach(animalId => moves.push({ type: MoveType.MoveAnimal, fieldId: possibleFieldId, animalId: animalId }))
        )
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
        moveAnimal(move, this.state)
        break;
      case MoveType.Eat:
        selectMosquitoEffectField(move, this.state)
        break;
      case MoveType.PlayMosquitoEffect:
        playMosquitoEffect(move, this.state)
        break;
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
    if (this.state.selectedAnimalId == 3 || this.state.selectedAnimalId == 4) {
      const activePlayerState = getActivePlayerState(this.state)!
      // Handle Mosquito Effect after Moving
      if (activePlayerState.availableMosquitoEffects.length > 0 && activePlayerState.chameleonMoved) {
        return playMosquitoEffectMove(0, -1, -1)
      }
    }
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

  getCurrentAnimalField() {
    var animalFieldIds = this.state.board.animalFields
    for (let j = 0; j < animalFieldIds.length; j++) {
      if (animalFieldIds[j].animalId == this.state.selectedAnimalId) {
        return animalFieldIds[j]
      }
    }
    return undefined
  }

  /**
   * If your game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(): GameView {
    return { ...this.state, board: this.state.board }
  }

  /**
   * If you game has "SecretInformation", you must also implement "getPlayerView", returning the information visible by a specific player.
   * @param playerId Identifier of the player
   * @return what the player can see
   */
  getPlayerView(playerId: PlayerColor): GameView {
    // Here we could, for example, return a "playerView" with only the number of cards in hand for the other player only.
    return { ...this.state, board: this.state.board }
  }
}


export function getPredictableAutomaticMoves(state: GameState | GameView): Move | void {

}
