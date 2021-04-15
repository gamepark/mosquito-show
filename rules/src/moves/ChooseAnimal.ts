import Animal from "../animals/Animal"
import Position from "../common/Position"
import AnimalField from "../fields/AnimalField"
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


export function selectAnimal(move:  ChooseAnimal, state: GameState | GameView) { 
   if(state.board.field[move.position.x][move.position.y] instanceof AnimalField){
      let animalField = state.board.field[move.position.x][move.position.y] as AnimalField;
      animalField.animalOnField = move.animal
   }
   // TODO ERROR Frontend, when animal on mosquito effect
}