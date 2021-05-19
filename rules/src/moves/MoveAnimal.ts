import Animal from "../animals/Animal";
import Position from "../common/Position";
import GameState from "../GameState";
import GameView from "../GameView";
import PlayerColor from "../PlayerColor";
import MoveType from "./MoveType";

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type MoveAnimal = {
    type: typeof MoveType.MoveAnimal
    playerId: PlayerColor
    position: Position
    animal: Animal
}


export const moveAnimal = (move: MoveAnimal, state: GameState | GameView): void => {
    // state.board.field[move.position.x][move.position.y].animalOnField = move.animal
}

export default MoveAnimal