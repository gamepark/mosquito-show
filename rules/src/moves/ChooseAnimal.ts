import GameState from "../GameState"
import GameView from "../GameView"
import PlayerColor from "../PlayerColor"
import MoveType from "./MoveType"

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type ChooseAnimal = {
    type: typeof MoveType.ChooseAnimal
    playerId: PlayerColor
}

export default ChooseAnimal


export function selectAnimal(state: GameState | GameView) {

}