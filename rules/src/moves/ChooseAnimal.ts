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
    // var possible  = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)
    // var animalfields = state.board.animalfield
    // var length = animalfields.length;
    // for(var i=0; i <length;i++){
    //     possible.push(animalfields[i].id);
    // }
    let coo: Coordinates = {
        x: 1,
        y: 1
    };
    state.possibleFields?.push(coo)
}