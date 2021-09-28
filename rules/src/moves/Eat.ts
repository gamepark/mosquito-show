import Effect from "../fields/Effect";
import { getActivePlayerState } from "../GameState";
import GameView from "../GameView";
import { MoveType } from "./MoveType";

export type Eat = {
     type: typeof MoveType.Eat
     selectedAnimalId: number
     mosquitoEffectFieldId: number
     toucanNextPositionFieldId: number
    }

export const eatMove = (selectedAnimalId: number, mosquitoEffectFieldId: number, toucanNextPositionFieldId: number): Eat => ({
    type: MoveType.Eat, selectedAnimalId, mosquitoEffectFieldId, toucanNextPositionFieldId
})
 
export const selectMosquitoEffectField = (move: Eat, state:  GameView): void => {
    state.selectedAnimalId = move.selectedAnimalId
    state.inMoveAnimalSwitchNotAllowed=false
    let mosquitoEffectFields = state.board.mosquitoFields
    let mosquitoEffect : Effect|undefined
    if(mosquitoEffectFields != undefined){
        for (let i = 0; i < mosquitoEffectFields.length; i++) {
            if(mosquitoEffectFields[i].id == move.mosquitoEffectFieldId){
                let currentMosquitoEffect = mosquitoEffectFields[i].effects.pop()
                if(currentMosquitoEffect !== undefined){
                    mosquitoEffect = currentMosquitoEffect
                }
                break;
            }
        }
    }
    if(mosquitoEffect !== undefined){
        getActivePlayerState(state)!.availableMosquitoEffects.push(mosquitoEffect)
        state.pendingChameleonMove = true
    }
    state.possibleEffectFields = []
} 