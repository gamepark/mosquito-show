import GameView from "../GameView"
import PlayerColor from "../PlayerColor"

function switchPlayerColor(state: GameView) {
    if (state.activePlayer === PlayerColor.Blue) {
        state.activePlayer = PlayerColor.Orange
    } else if (state.activePlayer === PlayerColor.Orange) {
        state.activePlayer = PlayerColor.Blue
    }
    if (state.mosquitoEffect != 3) {
        state.inMoveAnimalSwitchNotAllowed = true
    }
    state.selectedAnimalId = undefined
}