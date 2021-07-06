import GameView from "../GameView";
import MoveType from "./MoveType";

type ChooseAnimal = {
    type: typeof MoveType.ChooseAnimal
    selectAnimalId: number
}

export default ChooseAnimal

export const selectAnimal = (move: ChooseAnimal, state: GameView): void => {
    state.possibleFields = []
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
            state.possibleFields.push(i)
        }
        for (let j = 0; j < animalFieldIds.length; j++) {
            var deleteElement = animalFieldIds[j].fieldId
            delete state.possibleFields[deleteElement - 1]
            if (animalFieldIds[j].animalId == selectedAnimalId) {
                state.possibleFields = []
                break
            }
        }
    }

    function moveTucan() {

    }

    function moveChameleon() {
        state.possibleFields = []
        var currentAnimalField = getCurrentAnimalField()
        if (currentAnimalField != undefined) {
            var currentAnimalFieldId = currentAnimalField.fieldId
            if (currentAnimalFieldId - 4 > 0) {
                state.possibleFields.push(currentAnimalFieldId - 4)
            }
            if (currentAnimalFieldId + 4 <= 16) {
                state.possibleFields.push(currentAnimalFieldId + 4)
            }
            if (currentAnimalFieldId - 1 > 0 && Math.ceil((currentAnimalFieldId - 1) / 4) == Math.ceil((currentAnimalFieldId) / 4)) {
                state.possibleFields.push(currentAnimalFieldId - 1)
            }
            if (currentAnimalFieldId + 1 <= 16 && Math.ceil((currentAnimalFieldId + 1) / 4) == Math.ceil((currentAnimalFieldId) / 4)) {
                state.possibleFields.push(currentAnimalFieldId + 1)
            }

            for (let j = 0; j < animalFieldIds.length; j++) {
                var deleteElement = animalFieldIds[j].fieldId
                if(state.possibleFields.includes(deleteElement)){
                    delete state.possibleFields[state.possibleFields.indexOf(deleteElement)]
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
}