import { Game } from '@gamepark/rules-api'
import { getActivePlayerState } from './GameState'
import GameView from './GameView'
import { selectAnimal, selectAnimalMove } from './moves/ChooseAnimal'
import { eatMove, selectMosquitoEffectField } from './moves/Eat'
import Move from './moves/Move'
import { moveAnimal } from './moves/MoveAnimal'
import MoveType from './moves/MoveType'
import MoveView from './moves/MoveView'
import { playMosquitoEffect, playMosquitoEffectMove } from './moves/PlayMosquitoEffect'

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
export default class MosquitoShowView implements Game<GameView, MoveView> {
  state: GameView

  constructor(state: GameView) {
    this.state =  state
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
    // Show possible Chameleon Fields after Eat
    if(this.state.selectedAnimalId == 3 || this.state.selectedAnimalId == 4){
      const activePlayerState = getActivePlayerState(this.state)
      if(activePlayerState !== undefined && activePlayerState.availableMosquitoEffects.length >0 && !activePlayerState.chameleonMoved && (this.state.possibleAnimalFields === undefined || this.state.possibleAnimalFields.length == 0)){
        return selectAnimalMove(this.state.selectedAnimalId)
      }
      if(activePlayerState !== undefined && activePlayerState.availableMosquitoEffects.length >0 && activePlayerState.chameleonMoved){
        console.log("still something to do")
        return playMosquitoEffectMove(activePlayerState.availableMosquitoEffects[0])
      }
    }
    // Eat after moving Toucan
    if(this.state.selectedAnimalId == 1 || this.state.selectedAnimalId == 2){
      var activePlayerState = getActivePlayerState(this.state)
      const currentAnimalField = this.getCurrentAnimalField();
      var nextToucanPosition : number = -1
      var effectFieldToEat : number
      if(activePlayerState !== undefined && currentAnimalField !== undefined && activePlayerState.toucanStartPosition !== currentAnimalField.fieldId){
        var upDownIndicator = currentAnimalField.fieldId - activePlayerState.toucanStartPosition
        if(upDownIndicator % 3 == 0 && upDownIndicator % 5 == 0){
          if(upDownIndicator > 0){
            // bottom right
            nextToucanPosition = activePlayerState.toucanStartPosition + 5
          }
          if(upDownIndicator < 0){
            // up left
            nextToucanPosition = activePlayerState.toucanStartPosition - 5
          }
        } else {
          if(upDownIndicator > 0 && upDownIndicator % 3 == 0){
            // bottom left
            nextToucanPosition = activePlayerState.toucanStartPosition + 3
          }
          if(upDownIndicator > 0 && upDownIndicator % 5 == 0){
            // bottom right
            nextToucanPosition = activePlayerState.toucanStartPosition + 5
          }
          if(upDownIndicator < 0 && upDownIndicator % 3 == 0){
            // up left
            nextToucanPosition = activePlayerState.toucanStartPosition - 5
          }
          if(upDownIndicator < 0 && upDownIndicator % 5 == 0){
            // up right
            nextToucanPosition = activePlayerState.toucanStartPosition - 3
          }
        }
          if(nextToucanPosition !== -1){
            effectFieldToEat = activePlayerState.toucanStartPosition + nextToucanPosition
            activePlayerState.toucanStartPosition = nextToucanPosition
            return eatMove(effectFieldToEat)
          } else {
            console.error('Could not get nextToucanPosition')
        }
      }
      if(activePlayerState !== undefined && currentAnimalField !== undefined && activePlayerState.toucanStartPosition === currentAnimalField.fieldId && activePlayerState.availableMosquitoEffects.length > 0){
        console.log("still something to do")
        // playMosquitoEffectMove()
      }
      console.log(getActivePlayerState(this.state)?.toucanStartPosition)
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