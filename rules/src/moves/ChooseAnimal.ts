import GameView from "../GameView";
import MoveType from "./MoveType";

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type ChooseAnimal = {
    type: typeof MoveType.ChooseAnimal
    selectAnimalId: number
}

export default ChooseAnimal

export const selectAnimal = (move:  ChooseAnimal, state:  GameView): void => { 
    state.possibleFields = []
    state.selectedAnimalId = move.selectAnimalId
    var fieldIds = state.board.animalfield
    // if(fieldIds == undefined){
    //     return;
    // }
    for(let i = 1; i <= 16; i++){
        state.possibleFields.push(i);
    }
    for(let j = 1; j <= fieldIds.length; j++ ){
        var deleteElement = fieldIds[j].id
        state.possibleFields = state.possibleFields.slice(deleteElement,1);
        
    }
 
}