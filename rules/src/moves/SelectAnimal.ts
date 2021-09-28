import { getActivePlayerState } from "../GameState"
import GameView from "../GameView"
import PlayerColor from "../PlayerColor"
import { getPossibleFieldsFromPlayerboard } from "../utils/GameUtils"

export type SelectAnimal = {
    type: 'SelectAnimal'
    selectAnimalId: number
}

export const selectAnimalMove = (selectAnimalId: number): SelectAnimal => ({
    type: 'SelectAnimal', selectAnimalId
})

//1 = Toucan_orange, 3 = Chameleon_orange, 2 = Toucan_blue, 4 = Chameleon_blue
export function selectAnimal(move: SelectAnimal, state: GameView) {
    state.possibleAnimalFields = []
    var selectedAnimalId = move.selectAnimalId
    state.selectedAnimalId = selectedAnimalId
    var animalFields = state.board.animalFields

    if (animalFields.length == 4) {
        const activePlayerState = getActivePlayerState(state)
        if (activePlayerState !== undefined) {
            if (selectedAnimalId == 1 || selectedAnimalId == 2) {
                showPossibleToucanAnimalFields(state)
                if (state.mosquitoEffect === 3) {
                    state.mosquitoEffect = -1
                    state.mosquitoEffectStartFieldId = -1
                    if (state.possibleAnimalFields.length === 0) {
                        switchPlayerColor()
                    }
                }
            }
            if (selectedAnimalId == 3 || selectedAnimalId == 4) {
                if (activePlayerState.availableMosquitoEffects.length > 0) {
                    showPossibleChameleonAnimalFields(state)
                    state.pendingChameleonMove = false
                } else {
                    showPossibleMosquitoEffectFields(state)
                    showPossibleChameleonAnimalFields(state)
                    if (state.mosquitoEffect === 3) {
                        if (!(state.possibleAnimalFields.length > 0 && state.possibleEffectFields !== undefined && state.possibleEffectFields.length > 0)) {
                            switchPlayerColor()
                            state.possibleEffectFields = []
                        }
                        state.mosquitoEffect = -1
                        state.mosquitoEffectStartFieldId = -1
                    } else {
                        if (!(state.possibleAnimalFields.length > 0 && state.possibleEffectFields !== undefined && state.possibleEffectFields.length > 0)) {
                            state.possibleEffectFields = []
                        }
                    }
                    state.possibleAnimalFields = []
                }
            }
        }
    }
    else {
        // From Playerboard -> Board
        state.possibleAnimalFields = getPossibleFieldsFromPlayerboard(animalFields)
    }

    function switchPlayerColor() {
        if (state.activePlayer === PlayerColor.Blue) {
            state.activePlayer = PlayerColor.Orange
        } else if (state.activePlayer === PlayerColor.Orange) {
            state.activePlayer = PlayerColor.Blue
        }
        state.selectedAnimalId = undefined
    }


}

export function getCurrentAnimalField(state: GameView) {
    let animalFieldIds = state.board.animalFields
    for (let j = 0; j < animalFieldIds.length; j++) {
        if (animalFieldIds[j].animalId == state.selectedAnimalId) {
            return animalFieldIds[j]
        }
    }
    return undefined
}

export function showPossibleMosquitoEffectFields(state: GameView) {
    state.possibleEffectFields = []
    var currentAnimalField = getCurrentAnimalField(state)
    var currentFieldIdBeforeMove: number
    var currentFieldIdAfterMove: number
    var mosquitoEffectField
    if (currentAnimalField != undefined) {
        // left bottom
        currentFieldIdBeforeMove = currentAnimalField.fieldId
        currentFieldIdAfterMove = currentFieldIdBeforeMove + 3
        mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
        if (mosquitoEffectField !== undefined && mosquitoEffectField.effects.length > 0 && currentFieldIdAfterMove <= 16 && Math.ceil(currentFieldIdBeforeMove / 4) + 1 == Math.ceil(currentFieldIdAfterMove / 4)) {
            state.possibleEffectFields.push(mosquitoEffectField.id)
        }

        // left up
        currentFieldIdBeforeMove = currentAnimalField.fieldId
        currentFieldIdAfterMove = currentFieldIdBeforeMove - 5
        mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
        if (mosquitoEffectField !== undefined && mosquitoEffectField.effects.length > 0 && currentFieldIdAfterMove > 0 && Math.ceil(currentFieldIdBeforeMove / 4) == Math.ceil(currentFieldIdAfterMove / 4) + 1) {
            state.possibleEffectFields.push(mosquitoEffectField.id)
        }

        // right up
        currentFieldIdBeforeMove = currentAnimalField.fieldId
        currentFieldIdAfterMove = currentFieldIdBeforeMove - 3
        mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
        if (mosquitoEffectField !== undefined && mosquitoEffectField.effects.length > 0 && currentFieldIdAfterMove > 0 && Math.ceil(currentFieldIdBeforeMove / 4) == Math.ceil(currentFieldIdAfterMove / 4) + 1) {
            state.possibleEffectFields.push(mosquitoEffectField.id)
        }

        // right bottom
        currentFieldIdBeforeMove = currentAnimalField.fieldId
        currentFieldIdAfterMove = currentFieldIdBeforeMove + 5
        mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
        if (mosquitoEffectField !== undefined && mosquitoEffectField.effects.length > 0 && currentFieldIdAfterMove <= 16 && Math.ceil(currentFieldIdBeforeMove / 4) + 1 == Math.ceil(currentFieldIdAfterMove / 4)) {
            state.possibleEffectFields.push(mosquitoEffectField.id)
        }
    }
}

export function showPossibleChameleonAnimalFields(state: GameView) {
    state.possibleAnimalFields = []
    var currentAnimalFieldId = getCurrentAnimalField(state)!.fieldId
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

    for (let j = 0; j < state.board.animalFields.length; j++) {
        var deleteElement = state.board.animalFields[j].fieldId
        if (state.possibleAnimalFields.includes(deleteElement)) {
            state.possibleAnimalFields.splice(state.possibleAnimalFields.indexOf(deleteElement), 1)
        }
    }
}

export function showPossibleToucanAnimalFields(state: GameView) {
    state.possibleAnimalFields = []
    var currentAnimalField = getCurrentAnimalField(state)
    var currentFieldIdBeforeMove: number
    var currentFieldIdAfterMove: number
    var mosquitoEffectField
    if (currentAnimalField != undefined) {
        // left bottom
        currentFieldIdBeforeMove = currentAnimalField.fieldId
        for (let i = 0; i < 3; i++) {
            currentFieldIdAfterMove = currentFieldIdBeforeMove + 3
            mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
            if (mosquitoEffectField !== undefined && mosquitoEffectField.effects.length === 0) {
                break;
            }
            if (currentFieldIdAfterMove <= 16 && !isAnimalOnField(state, currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove / 4) + 1 == Math.ceil(currentFieldIdAfterMove / 4)) {
                state.possibleAnimalFields.push(currentFieldIdAfterMove)
                currentFieldIdBeforeMove = currentFieldIdAfterMove
            }
        }
        // left up
        currentFieldIdBeforeMove = currentAnimalField.fieldId
        for (let i = 0; i < 3; i++) {
            currentFieldIdAfterMove = currentFieldIdBeforeMove - 5
            mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
            if (mosquitoEffectField !== undefined && mosquitoEffectField.effects.length === 0) {
                break;
            }
            if (currentFieldIdAfterMove > 0 && !isAnimalOnField(state, currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove / 4) == Math.ceil(currentFieldIdAfterMove / 4) + 1) {
                state.possibleAnimalFields.push(currentFieldIdAfterMove)
                currentFieldIdBeforeMove = currentFieldIdAfterMove
            }
        }
        // right up
        currentFieldIdBeforeMove = currentAnimalField.fieldId
        for (let i = 0; i < 3; i++) {
            currentFieldIdAfterMove = currentFieldIdBeforeMove - 3
            mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
            if (mosquitoEffectField !== undefined && mosquitoEffectField.effects.length === 0) {
                break;
            }
            if (currentFieldIdAfterMove > 0 && !isAnimalOnField(state, currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove / 4) == Math.ceil(currentFieldIdAfterMove / 4) + 1) {
                state.possibleAnimalFields.push(currentFieldIdAfterMove)
                currentFieldIdBeforeMove = currentFieldIdAfterMove
            }
        }
        // right bottom
        currentFieldIdBeforeMove = currentAnimalField.fieldId
        for (let i = 0; i < 3; i++) {
            currentFieldIdAfterMove = currentFieldIdBeforeMove + 5
            mosquitoEffectField = state.board.mosquitoFields.find(i => i.id === (currentFieldIdBeforeMove + currentFieldIdAfterMove))
            if (mosquitoEffectField !== undefined && mosquitoEffectField.effects.length === 0) {
                break;
            }
            if (currentFieldIdAfterMove <= 16 && !isAnimalOnField(state, currentFieldIdAfterMove) && Math.ceil(currentFieldIdBeforeMove / 4) + 1 == Math.ceil(currentFieldIdAfterMove / 4)) {
                state.possibleAnimalFields.push(currentFieldIdAfterMove)
                currentFieldIdBeforeMove = currentFieldIdAfterMove
            }
        }
    }
}

export function isAnimalOnField(state: GameView, fieldId: number) {
    for (let j = 0; j < state.board.animalFields.length; j++) {
        if (state.board.animalFields[j].fieldId == fieldId) {
            return true
        }
    }
    return false;
}