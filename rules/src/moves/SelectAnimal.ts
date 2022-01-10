import Animal from '../animals/Animal'
import GameState from '../GameState'
import GameView from '../GameView'
import { MoveType } from './MoveType'

export type SelectAnimal = {
  type: typeof MoveType.SelectAnimal
  animal?: Animal
}

export const selectAnimalMove = (animal?: Animal): SelectAnimal => ({
  type: MoveType.SelectAnimal, animal
})

export function selectAnimal(state: GameView | GameState, move: SelectAnimal) {
  // nothing to do
}
