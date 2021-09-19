import Effect from "../fields/Effect";
import { getActivePlayerState } from "../GameState";
import GameView from "../GameView";
import MoveType from "./MoveType";

 type Eat = {
     type: typeof MoveType.Eat
     mosquitoEffectFieldId: number
    }

export default Eat

export const eatMove = (mosquitoEffectFieldId: number): Eat => ({
    type: MoveType.Eat, mosquitoEffectFieldId
})
 
export const selectMosquitoEffectField = (move: Eat, state:  GameView): void => {
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
    const activePlayerState = getActivePlayerState(state)
    if(mosquitoEffect !== undefined){
        activePlayerState?.availableMosquitoEffects.push(mosquitoEffect)
    }
    state.possibleEffectFields = []
} 