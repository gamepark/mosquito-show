import Animal from "../animals/Animal"
import Position from "../common/Position"
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
    position: Position
    animal: Animal
}

export default ChooseAnimal


export const selectAnimal = (move:  ChooseAnimal, state: GameState | GameView): void => { 
   state.board.field[move.position.x][move.position.y].selected = !state.board.field[move.position.x][move.position.y].selected
}