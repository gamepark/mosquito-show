import Animal from '../animals/Animal'
import GameState from '../GameState'
import GameView from '../GameView'
import { MoveType } from './MoveType'

export type SelectOpponentAnimal = {
  type: typeof MoveType.SelectOpponentAnimal
  selectedEnemyAnimal: Animal
}

export const selectOpponentAnimalMove = (selectedEnemyAnimal: Animal
): SelectOpponentAnimal => ({
  type: MoveType.SelectOpponentAnimal, selectedEnemyAnimal
})

export function selectOpponentAnimal(game: GameState | GameView, move: SelectOpponentAnimal) {
  game.players.find(player => player.color !== game.activePlayer)!.animalForcedToMove = move.selectedEnemyAnimal
  game.handleMosquitoEffectOver = true
}