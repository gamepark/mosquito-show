import Animal from '../animals/Animal'
import GameState from '../GameState'
import GameView from '../GameView'
import { Mosquito } from '../material/MosquitoEffect'
import { getActivePlayerState } from '../MosquitoShow'
import { removeMosquitoFromPlayer } from '../utils/BoardUtils'
import { MoveType } from './MoveType'

export type PlayRedMosquitoEffect = {
  type: typeof MoveType.PlayRedMosquitoEffect
  selectedEnemyAnimal: Animal
}

export const playRedMosquitoEffectMove = (selectedEnemyAnimal: Animal
): PlayRedMosquitoEffect => ({
  type: MoveType.PlayRedMosquitoEffect, selectedEnemyAnimal
})

export function playRedMosquitoEffect(game: GameState | GameView, move: PlayRedMosquitoEffect) {
  console.log('play Red Effect Animal: '+move.selectedEnemyAnimal)
  game.players.find(player => player.color !== game.activePlayer)!.animalForcedToMove = move.selectedEnemyAnimal
  console.log('set -> '+game.players.find(player => player.color !== game.activePlayer)!.animalForcedToMove)
  removeMosquitoFromPlayer(game, Mosquito.Red)
  delete getActivePlayerState(game).selectedMosquito
}