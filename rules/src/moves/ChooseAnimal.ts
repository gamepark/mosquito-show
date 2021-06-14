import Coordinates from "../fields/Coordinates";
import GameView from "../GameView";
import MoveType from "./MoveType";

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type ChooseAnimal = {
    type: typeof MoveType.ChooseAnimal
}

export default ChooseAnimal

export const selectAnimal = (move:  ChooseAnimal, state:  GameView): void => { 
    state.possibleFields = []
    if(state.selectedAnimalId == undefined){
        return;
    }
    let coo: Coordinates = {
        x: 1,
        y: 1
    };
    state.possibleFields.push(coo)
}