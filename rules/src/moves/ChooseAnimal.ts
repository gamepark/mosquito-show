import { getActivePlayerState } from "../GameState"
import GameView from "../GameView"
import MoveType from "./MoveType"

type ChooseAnimal = {
    type: typeof MoveType.ChooseAnimal
    selectAnimalId: number
}

export default ChooseAnimal

export const selectAnimalMove = (selectAnimalId: number): ChooseAnimal => ({
    type: MoveType.ChooseAnimal, selectAnimalId
})

//1 = Toucan_orange, 3 = Chameleon_orange, 2 = Toucan_blue, 4 = Chameleon_blue
export const selectAnimal = (move: ChooseAnimal, state: GameView): void => {
    state.possibleAnimalFields = []
    var selectedAnimalId = move.selectAnimalId
    state.selectedAnimalId = selectedAnimalId
    var animalFieldIds = state.board.animalFields
    
    if (animalFieldIds.length == 4) {
        if (selectedAnimalId == 1 || selectedAnimalId == 2) {
            showPossibleToucanAnimalFields()
        }
        if (selectedAnimalId == 3 || selectedAnimalId == 4) {
            const activePlayerState = getActivePlayerState(state)
            if(activePlayerState !== undefined && activePlayerState.availableMosquitoEffects.length > 0){
                showPossibleChameleonAnimalFields()
            } else {
                showPossibleMosquitoEffectFields()
            }
        }
    }
    else {
        for (let i = 1; i <= 16; i++) {
            state.possibleAnimalFields.push(i)
        }
        for (let j = 0; j < animalFieldIds.length; j++) {
            var deleteElement = animalFieldIds[j].fieldId
            delete state.possibleAnimalFields[deleteElement - 1]
            if (animalFieldIds[j].animalId == selectedAnimalId) {
                state.possibleAnimalFields = []
                break
            }
        }
    }
    
    function showPossibleMosquitoEffectFields(){
        state.possibleEffectFields = []
        var currentAnimalField = getCurrentAnimalField()
        var currentFieldIdBeforeMove : number
        var currentFieldIdAfterMove : number
        var mosquitoEffectField
        if (currentAnimalField != undefined) {
            // left bottom
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            currentFieldIdAfterMove = currentFieldIdBeforeMove + 3
            mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
            if(mosquitoEffectField !== undefined && mosquitoEffectField.effects.length > 0 && currentFieldIdAfterMove <= 16 && Math.ceil(currentFieldIdBeforeMove/4) + 1 == Math.ceil(currentFieldIdAfterMove/4)){
                state.possibleEffectFields.push(mosquitoEffectField.id)
            }
            
            // left up
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            currentFieldIdAfterMove = currentFieldIdBeforeMove -5
            mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
            if(mosquitoEffectField !== undefined && mosquitoEffectField.effects.length > 0 && currentFieldIdAfterMove >0 && Math.ceil(currentFieldIdBeforeMove/4) == Math.ceil(currentFieldIdAfterMove/4) + 1){
                state.possibleEffectFields.push(mosquitoEffectField.id)
            }

            // right up
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            currentFieldIdAfterMove = currentFieldIdBeforeMove - 3
            mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
            if(mosquitoEffectField !== undefined && mosquitoEffectField.effects.length > 0 && currentFieldIdAfterMove >0 && Math.ceil(currentFieldIdBeforeMove/4) == Math.ceil(currentFieldIdAfterMove/4) + 1){
                state.possibleEffectFields.push(mosquitoEffectField.id)
            }
                
            // right bottom
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            currentFieldIdAfterMove = currentFieldIdBeforeMove + 5
            mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
            if(mosquitoEffectField !== undefined && mosquitoEffectField.effects.length > 0 && currentFieldIdAfterMove <= 16 && Math.ceil(currentFieldIdBeforeMove/4) + 1 == Math.ceil(currentFieldIdAfterMove/4)){
                state.possibleEffectFields.push(mosquitoEffectField.id)
            }
        }
    }

    function showPossibleToucanAnimalFields() {
        state.possibleAnimalFields = []
        var currentAnimalField = getCurrentAnimalField()
        var currentFieldIdBeforeMove : number
        var currentFieldIdAfterMove : number
        var mosquitoEffectField
        if (currentAnimalField != undefined) {
            // left bottom
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            for(let i = 0; i<3; i++){
                currentFieldIdAfterMove = currentFieldIdBeforeMove + 3
                mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
                if(mosquitoEffectField !== undefined && mosquitoEffectField.effects.length === 0){
                    break;
                }
                if(currentFieldIdAfterMove <= 16 && !isAnimalOnField(currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove/4) + 1 == Math.ceil(currentFieldIdAfterMove/4)){
                    state.possibleAnimalFields.push(currentFieldIdAfterMove)
                    currentFieldIdBeforeMove = currentFieldIdAfterMove
                }
            }
            // left up
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            for(let i = 0; i<3; i++){
                currentFieldIdAfterMove = currentFieldIdBeforeMove -5
                mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
                if(mosquitoEffectField !== undefined && mosquitoEffectField.effects.length === 0){
                    break;
                }
                if(currentFieldIdAfterMove >0 && !isAnimalOnField(currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove/4) == Math.ceil(currentFieldIdAfterMove/4) + 1){
                    state.possibleAnimalFields.push(currentFieldIdAfterMove)
                    currentFieldIdBeforeMove = currentFieldIdAfterMove
                }
            }
            // right up
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            for(let i = 0; i<3; i++){
                currentFieldIdAfterMove = currentFieldIdBeforeMove - 3
                mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
                if(mosquitoEffectField !== undefined && mosquitoEffectField.effects.length === 0){
                    break;
                }
                if(currentFieldIdAfterMove >0 && !isAnimalOnField(currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove/4) == Math.ceil(currentFieldIdAfterMove/4) + 1){
                    state.possibleAnimalFields.push(currentFieldIdAfterMove)
                    currentFieldIdBeforeMove = currentFieldIdAfterMove
                }
            }
            // right bottom
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            for(let i = 0; i<3; i++){
                currentFieldIdAfterMove = currentFieldIdBeforeMove + 5
                mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
                if(mosquitoEffectField !== undefined && mosquitoEffectField.effects.length === 0){
                    break;
                }
                if(currentFieldIdAfterMove <= 16 && !isAnimalOnField(currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove/4) + 1 == Math.ceil(currentFieldIdAfterMove/4)){
                    state.possibleAnimalFields.push(currentFieldIdAfterMove)
                    currentFieldIdBeforeMove = currentFieldIdAfterMove
                }
            }
        }

    }

    function showPossibleChameleonAnimalFields() {
        state.possibleAnimalFields = []
        var currentAnimalField = getCurrentAnimalField()
        if (currentAnimalField != undefined) {
            var currentAnimalFieldId = currentAnimalField.fieldId
            if (currentAnimalFieldId - 4 > 0) {
                state.possibleAnimalFields.push(currentAnimalFieldId - 4)
            }
            if (currentAnimalFieldId + 4 <= 16) {
                state.possibleAnimalFields.push(currentAnimalFieldId + 4)
            }
            if (currentAnimalFieldId - 1 > 0 && Math.ceil((currentAnimalFieldId - 1) / 4) == Math.ceil((currentAnimalFieldId) / 4)) {
                state.possibleAnimalFields.push(currentAnimalFieldId - 1)
            }
            if (currentAnimalFieldId + 1 <= 16 && Math.ceil((currentAnimalFieldId + 1) / 4) == Math.ceil((currentAnimalFieldId) / 4)) {
                state.possibleAnimalFields.push(currentAnimalFieldId + 1)
            }

            for (let j = 0; j < animalFieldIds.length; j++) {
                var deleteElement = animalFieldIds[j].fieldId
                if(state.possibleAnimalFields.includes(deleteElement)){
                    delete state.possibleAnimalFields[state.possibleAnimalFields.indexOf(deleteElement)]
                }
            }
        }
    }

    function getCurrentAnimalField() {
        for (let j = 0; j < animalFieldIds.length; j++) {
            if (animalFieldIds[j].animalId == selectedAnimalId) {
                return animalFieldIds[j]
            }
        }
        return undefined
    }

    function isAnimalOnField(fieldId : number){
        for (let j = 0; j < animalFieldIds.length; j++) {
            if (animalFieldIds[j].fieldId == fieldId) {
                return true
            }
        }
        return false;
    }
}