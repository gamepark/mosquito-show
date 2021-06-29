import GameView from "../GameView";
import MoveType from "./MoveType";

type MoveAnimal = {
    type: typeof MoveType.MoveAnimal
    fieldId: number
    animalId: number
    
}


export const moveAnimal = (move: MoveAnimal, state:  GameView): void => {
    // First combi 
    let field = {animalId: move.animalId,  fieldId: move.fieldId}
    state.board.animalfield.push(field)
    state.possibleFields = []
    // Delete all marks
}

export default MoveAnimal