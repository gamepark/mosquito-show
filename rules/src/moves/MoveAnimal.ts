import GameView from "../GameView";
import MoveType from "./MoveType";

type MoveAnimal = {
    type: typeof MoveType.MoveAnimal
    fieldId: number
    animalId: number
    
}


export const moveAnimal = (move: MoveAnimal, state:  GameView): void => {
    let field = {animalId: move.animalId,  fieldId: move.fieldId}
    let animals = state.board.animalfield
    let fieldSet = false
    if(animals != undefined){
        for (let i = 0; i < animals.length; i++) {
            if(animals[i].animalId == move.animalId){
                animals[i] = field;
                fieldSet = true;
                break;
            }
        }
    }
    if(!fieldSet){
        state.board.animalfield.push(field)
    }
    state.possibleAnimalFields = []
}

export default MoveAnimal