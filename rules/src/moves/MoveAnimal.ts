import { getActivePlayerState } from "../GameState";
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
    const animalId = move.animalId;
    let field = {animalId: animalId,  fieldId: move.fieldId}
    let animals = state.board.animalfield
    let fieldSet = false
    if(animals != undefined){
        for (let i = 0; i < animals.length; i++) {
            if(animals[i].animalId == animalId){
                animals[i] = field;
                fieldSet = true;
                break;
            }
        }
    }
    
    if(state.selectedAnimalId == 3 || state.selectedAnimalId == 4){
        // Chameleon Move
        state.players
        .filter(p => p.color == state.activePlayer)
        .forEach(p => {
            p.chameleonMoved = true
        })
    }
    if(!fieldSet){
        state.board.animalfield.push(field)
        if(state.selectedAnimalId == 1 || state.selectedAnimalId == 2){
            var activePlayerState = getActivePlayerState(state)
            if(activePlayerState !== undefined && activePlayerState.toucanStartPosition == -1){
                // Initial Toucan Move from PlayerBoard
                state.players
                .filter(p => p.color == state.activePlayer)
                .forEach(p => {
                    p.toucanStartPosition = move.fieldId
                })
            }
        }
        if(state.activePlayer === PlayerColor.Blue){
            state.activePlayer = PlayerColor.Orange 
        } else if(state.activePlayer === PlayerColor.Orange){
            state.activePlayer = PlayerColor.Blue 
        }
        state.selectedAnimalId = undefined
    }
    
    state.possibleAnimalFields = []
    // if(state.activePlayer === PlayerColor.Blue){
    //     state.activePlayer = PlayerColor.Orange 
    // } else if(state.activePlayer === PlayerColor.Orange){
    //     state.activePlayer = PlayerColor.Blue 
    // }
}

export default MoveAnimal

