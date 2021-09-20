import { Game } from '@gamepark/rules-api';
import { getActivePlayerState } from './GameState';
import GameView from './GameView';
import { selectAnimal, selectAnimalMove, showPossibleChameleonAnimalFields, showPossibleMosquitoEffectFields, showPossibleToucanAnimalFields } from './moves/ChooseAnimal';
import { eatMove, selectMosquitoEffectField } from './moves/Eat';
import Move from './moves/Move';
import { moveAnimal } from './moves/MoveAnimal';
import MoveType from './moves/MoveType';
import MoveView from './moves/MoveView';
import { playMosquitoEffect, playMosquitoEffectMove } from './moves/PlayMosquitoEffect';
import PlayerState from './PlayerState';

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
export default class MosquitoShowView implements Game<GameView, MoveView> {
  state: GameView

  constructor(state: GameView) {
    this.state = state
    state.possibleAnimalFields = []
    state.possibleEffectFields = []
  }

  /**
   * In this method, inside the view, we must return any move that the frontend can fully anticipate.
   * The reason why it should be anticipated instead of waiting for the backend to provide with all the automatic consequences is latency.
   * If the backend takes time to reply, maybe we will have the reply while we are animating the first consequences. The player won't notice the latency!
   *
   * @return A MoveView which can be completely anticipated by the player or the spectator
   */
  getAutomaticMove(): void | MoveView {
    // Chameleon
    if (this.state.selectedAnimalId == 3 || this.state.selectedAnimalId == 4) {
      const activePlayerState = getActivePlayerState(this.state)
      // Show possible Fields to Move after Eat
      if (activePlayerState !== undefined && activePlayerState.availableMosquitoEffects.length > 0 && !activePlayerState.chameleonMoved && (this.state.possibleAnimalFields === undefined || this.state.possibleAnimalFields.length == 0)) {
        return selectAnimalMove(this.state.selectedAnimalId)
      }
      // Handle Mosquito Effect after Moving
      if (activePlayerState !== undefined && activePlayerState.availableMosquitoEffects.length > 0 && activePlayerState.chameleonMoved) {
        return playMosquitoEffectMove(0, -1, -1)
      }
    }
    // Toucan
    if (this.state.selectedAnimalId == 1 || this.state.selectedAnimalId == 2) {
      var activePlayerState = getActivePlayerState(this.state)
      const currentAnimalField = this.getCurrentAnimalField();
      var nextToucanPosition: number = -1
      var effectFieldToEat: number
      if (activePlayerState !== undefined && currentAnimalField !== undefined && activePlayerState.toucanStartPosition !== currentAnimalField.fieldId) {
        var upDownIndicator = currentAnimalField.fieldId - activePlayerState.toucanStartPosition
        if (upDownIndicator % 3 == 0 && upDownIndicator % 5 == 0) {
          if (upDownIndicator > 0) {
            // bottom right
            nextToucanPosition = activePlayerState.toucanStartPosition + 5
          }
          if (upDownIndicator < 0) {
            // up left
            nextToucanPosition = activePlayerState.toucanStartPosition - 5
          }
        } else {
          if (upDownIndicator > 0 && upDownIndicator % 3 == 0) {
            // bottom left
            nextToucanPosition = activePlayerState.toucanStartPosition + 3
          }
          if (upDownIndicator > 0 && upDownIndicator % 5 == 0) {
            // bottom right
            nextToucanPosition = activePlayerState.toucanStartPosition + 5
          }
          if (upDownIndicator < 0 && upDownIndicator % 3 == 0) {
            // up right
            nextToucanPosition = activePlayerState.toucanStartPosition - 3
          }
          if (upDownIndicator < 0 && upDownIndicator % 5 == 0) {
            // up left
            nextToucanPosition = activePlayerState.toucanStartPosition - 5
          }
        }
        // Handle Up to three Eat Moves
        if (nextToucanPosition !== -1) {
          effectFieldToEat = activePlayerState.toucanStartPosition + nextToucanPosition
          activePlayerState.toucanStartPosition = nextToucanPosition
          return eatMove(effectFieldToEat)
        } else {
          console.error('Could not get nextToucanPosition')
        }
      }
        // Handle Up to three Mosquito Effects
        if (activePlayerState !== undefined && currentAnimalField !== undefined && activePlayerState.toucanStartPosition === currentAnimalField.fieldId && activePlayerState.availableMosquitoEffects.length > 0) {
          // Handle Golden Mosquitos first
          for (let i = 0; i < activePlayerState.availableMosquitoEffects.length; i++) {
            const effect = activePlayerState.availableMosquitoEffects[i];
            if (effect.front == 5) {
              return playMosquitoEffectMove(i, -1, -1)
            }
          }
          // In case of one left Effect play it automatically, otherwise let Player choose
          if (activePlayerState.availableMosquitoEffects.length > 1) {
            if (activePlayerState.toucanChosenEffectId == -1) {
              //choose
              console.error("still something to do")
            } else {
              for (let i = 0; i < activePlayerState.availableMosquitoEffects.length; i++) {
                const effect = activePlayerState.availableMosquitoEffects[i];
                if (effect.id == activePlayerState.toucanChosenEffectId) {
                  return playMosquitoEffectMove(i, -1, -1)
                }
              }
            }
          } else if (activePlayerState.availableMosquitoEffects.length == 1) {
            return playMosquitoEffectMove(0, -1, -1)
          }
        }
    }
    // Handle Red Mosquito Effect after PlayerSwitch
    if (this.state.mosquitoEffect === 3 && this.state.selectedAnimalId === undefined && this.state.mosquitoEffectStartFieldId > -1) {
      for (let i = 0; i < this.state.board.animalFields.length; i++) {
        const animalField = this.state.board.animalFields[i];
        if (animalField.fieldId == this.state.mosquitoEffectStartFieldId) {
          this.state.inMoveAnimalSwitchNotAllowed = false
          return selectAnimalMove(animalField.animalId)
        }
      }
    }
    // Check block after PlayerSwitch
    if (this.state.selectedAnimalId === undefined) {
      var activePlayerState = getActivePlayerState(this.state)
      if (activePlayerState !== undefined) {
        activePlayerState.toucanBlocked = false
        activePlayerState.chameleonBlocked = false
        //1 = Toucan_orange, 3 = Chameleon_orange, 2 = Toucan_blue, 4 = Chameleon_blue
        if (activePlayerState.color === 1) {
          this.checkBlockState(activePlayerState, 2, 4)
        } else {
          this.checkBlockState(activePlayerState, 1, 3)
        }
        this.state.selectedAnimalId = undefined
        this.state.possibleAnimalFields = []
        this.state.possibleEffectFields = []
      }
    }
  }

  checkBlockState(activePlayerState: PlayerState, toucanAnimalId: number, chameleonAnimalId: number) {
    this.state.selectedAnimalId = toucanAnimalId
    showPossibleToucanAnimalFields(this.state)
    activePlayerState.toucanBlocked = this.state.possibleAnimalFields?.length === 0
    this.state.selectedAnimalId = chameleonAnimalId
    showPossibleMosquitoEffectFields(this.state)
    showPossibleChameleonAnimalFields(this.state)
    if (!(this.state.possibleAnimalFields !== undefined && this.state.possibleAnimalFields.length > 0 && this.state.possibleEffectFields !== undefined && this.state.possibleEffectFields.length > 0)) {
      activePlayerState.chameleonBlocked = true
    }
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

  getLegalMoves(): Move[] {
    return [

      // { type: MoveType.MoveAnimal, animalId: 1,  fieldId: 2}
      // {type: MoveType.DrawCard, playerId: this.getActivePlayer()!}
    ]
  }


  /**
   * This is where a move is reproduced on the browser of a player. Most move will be treated the exact same way on both server and client side,
   * however some moves, that involved hiding information or discovering hidden information, will receive a different treatment than in the main rules class.
   *
   * @param move The move that must be applied in the browser of the player or the spectator
   */
  play(move: MoveView): void {
    switch (move.type) {
      case MoveType.ChooseAnimal:
        selectAnimal(move, this.state)
        break;
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

}