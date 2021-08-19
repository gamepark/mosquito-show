import GameView from "../GameView";
import PlayerColor from "../PlayerColor";
import MoveType from "./MoveType";

type MoveAnimal = {
    type: typeof MoveType.MoveAnimal
    fieldId: number
    animalId: number
    
}

export const moveAnimlaMove = (fieldId: number, animalId: number): MoveAnimal => ({
    type: MoveType.MoveAnimal, fieldId, animalId
})

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
    if(state.activePlayer === PlayerColor.Blue){
        state.activePlayer = PlayerColor.Orange 
    }
    if(state.activePlayer === PlayerColor.Orange){
        state.activePlayer = PlayerColor.Blue 
    }
}

export default MoveAnimal

