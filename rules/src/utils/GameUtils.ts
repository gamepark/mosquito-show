import AnimalField from '../fields/AnimalField'

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

export function getPossibleFieldsFromPlayerboard(fieldsInUse: AnimalField[]): number[] {
  return Array(16).fill(null).map((_, index) => index + 1).filter(position => !fieldsInUse.some(field => field.fieldId === position))
}