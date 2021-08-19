import Effect from "../fields/Effect"
import GameView from "../GameView"
import MoveType from "./MoveType"

 type Eat = {
     type: typeof MoveType.Eat
     mosquitoEffectFieldId: number
    }
 
export const selectMosquitoEffectField = (move: Eat, state:  GameView): void => {
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
        console.log(mosquitoEffect.id+","+mosquitoEffect.back+","+mosquitoEffect.front)
    }
    state.possibleEffectFields = []
    // let field = {animalId: move.animalId,  fieldId: move.fieldId}
    // let animals = state.board.animalfield
    // let fieldSet = false
    // if(animals != undefined){
    //     for (let i = 0; i < animals.length; i++) {
    //         if(animals[i].animalId == move.animalId){
    //             animals[i] = field;
    //             fieldSet = true;
    //             break;
    //         }
    //     }
    // }
    // if(!fieldSet){
    //     state.board.animalfield.push(field)
    // }
    // state.possibleAnimalFields = []
}

 export default Eat
 