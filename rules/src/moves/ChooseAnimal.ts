import GameView from "../GameView";
import MoveType from "./MoveType";

type ChooseAnimal = {
    type: typeof MoveType.ChooseAnimal
    selectAnimalId: number
}

export default ChooseAnimal

export const selectAnimal = (move: ChooseAnimal, state: GameView): void => {
    state.possibleAnimalFields = []
    var selectedAnimalId = move.selectAnimalId
    state.selectedAnimalId = selectedAnimalId
    var animalFieldIds = state.board.animalfield

    if (animalFieldIds.length == 4) {
        if (selectedAnimalId == 1 || selectedAnimalId == 2) {
            moveTucan();
        }
        if (selectedAnimalId == 3 || selectedAnimalId == 4) {
            moveChameleon();
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

    function moveTucan() {
        state.possibleAnimalFields = []
        var currentAnimalField = getCurrentAnimalField()
        var currentFieldIdBeforeMove
        var currentFieldIdAfterMove
        if (currentAnimalField != undefined) {
            // left bottom
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            for(let i = 0; i<3; i++){
                currentFieldIdAfterMove = currentFieldIdBeforeMove + 3
                
                if(currentFieldIdAfterMove <= 16 && !isAnimalOnField(currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove/4) != Math.ceil(currentFieldIdAfterMove/4)){
                    state.possibleAnimalFields.push(currentFieldIdAfterMove)
                    currentFieldIdBeforeMove = currentFieldIdAfterMove
                }
            }
            // left up
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            for(let i = 0; i<3; i++){
                currentFieldIdAfterMove = currentFieldIdBeforeMove -5
                if(currentFieldIdAfterMove >0 && !isAnimalOnField(currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove/4) != Math.ceil(currentFieldIdAfterMove/4)){
                    state.possibleAnimalFields.push(currentFieldIdAfterMove)
                    currentFieldIdBeforeMove = currentFieldIdAfterMove
                }
            }
            // right up
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            for(let i = 0; i<3; i++){
                currentFieldIdAfterMove = currentFieldIdBeforeMove - 3
                if(currentFieldIdAfterMove >0 && !isAnimalOnField(currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove/4) != Math.ceil(currentFieldIdAfterMove/4)){
                    state.possibleAnimalFields.push(currentFieldIdAfterMove)
                    currentFieldIdBeforeMove = currentFieldIdAfterMove
                }
            }
            // right bottom
            currentFieldIdBeforeMove = currentAnimalField.fieldId
            for(let i = 0; i<3; i++){
                currentFieldIdAfterMove = currentFieldIdBeforeMove + 5
                if(currentFieldIdAfterMove <= 16 && !isAnimalOnField(currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove/4) != Math.ceil(currentFieldIdAfterMove/4)){
                    state.possibleAnimalFields.push(currentFieldIdAfterMove)
                    currentFieldIdBeforeMove = currentFieldIdAfterMove
                }
            }
        }
    }

    function moveChameleon() {
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