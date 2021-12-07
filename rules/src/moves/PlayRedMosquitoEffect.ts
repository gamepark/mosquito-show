import Animal from '../animals/Animal'
import GameState from '../GameState'
import GameView from '../GameView'
import { Mosquito } from '../material/MosquitoEffect'
import PlayerColor from '../PlayerColor'
import { removeMosquitoFromPlayer } from '../utils/BoardUtils'
import { MoveType } from './MoveType'

export type PlayRedMosquitoEffect = {
  type: typeof MoveType.PlayRedMosquitoEffect
  selectedEnemyAnimal: Animal
  playerColorWhoHasToPlay: PlayerColor
}

export const playRedMosquitoEffectMove = (selectedEnemyAnimal: Animal, playerColorWhoHasToPlay: PlayerColor
): PlayRedMosquitoEffect => ({
  type: MoveType.PlayRedMosquitoEffect, selectedEnemyAnimal, playerColorWhoHasToPlay
})

export function playRedMosquitoEffect(game: GameState | GameView, move: PlayRedMosquitoEffect) {
  game.players.find(player => player.color === move.playerColorWhoHasToPlay)!.hasPlayerToMoveAnimal = move.selectedEnemyAnimal
  removeMosquitoFromPlayer(game, Mosquito.Red)
}

