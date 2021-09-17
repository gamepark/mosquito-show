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
    let animalFields = state.board.animalFields
    let fieldSet = false
    if(animalFields != undefined){
        for (let i = 0; i < animalFields.length; i++) {
            if(animalFields[i].animalId == animalId){
                animalFields[i] = field;
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
        state.board.animalFields.push(field)
        var activePlayerState = getActivePlayerState(state)
        if(state.selectedAnimalId == 1 || state.selectedAnimalId == 2){
            if(activePlayerState !== undefined && activePlayerState.toucanStartPosition == -1){
                // Initial Toucan Move from PlayerBoard
                state.players
                .filter(p => p.color == state.activePlayer)
                .forEach(p => {
                    p.toucanStartPosition = move.fieldId
                })
            }
        } else if(state.selectedAnimalId == 3 || state.selectedAnimalId == 4){
                // Initial Chameleon Move from PlayerBoard
                if(activePlayerState !== undefined){
                    activePlayerState.chameleonMoved = false
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

