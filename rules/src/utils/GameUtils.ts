import AnimalField from "../fields/AnimalField"

// function switchPlayerColor(state: GameView) {
//     if (state.activePlayer === PlayerColor.Blue) {
//         state.activePlayer = PlayerColor.Orange
//     } else if (state.activePlayer === PlayerColor.Orange) {
//         state.activePlayer = PlayerColor.Blue
//     }
//     if (state.mosquitoEffect != 3) {
//         state.inMoveAnimalSwitchNotAllowed = true
//     }
//     state.selectedAnimalId = undefined
// }

export function getPossibleFieldsFromPlayerboard(fieldsInUse: AnimalField[]) : number[]{
    var possibleFields: number[] = []
    for (let i = 1; i <= 16; i++) {
        possibleFields.push(i)
    }
    for (let j = 0; j < fieldsInUse.length; j++) {
        var deleteElement = fieldsInUse[j].fieldId
        possibleFields.splice(possibleFields.indexOf(deleteElement), 1)
    }
    return possibleFields
}