import Animal from '../animals/Animal'
import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { Mosquito } from '../material/MosquitoEffect'
import { getActivePlayerState } from '../MosquitoShow'
import { removeMosquitoFromPlayer } from '../utils/BoardUtils'
import { MoveType } from './MoveType'

export type PlayBlueMosquitoEffect = {
  type: typeof MoveType.PlayBlueMosquitoEffect
  animal: Animal
} & Coordinates

export const playBlueMosquitoEffectMove = (animal: Animal, coordinates: Coordinates): PlayBlueMosquitoEffect => ({
  type: MoveType.PlayBlueMosquitoEffect, animal, x: coordinates.x, y: coordinates.y
})

export const playBlueMosquitoEffect = (game: GameState | GameView, move: PlayBlueMosquitoEffect): void => {
  const player = game.players.find(p => p.color === game.activePlayer)!
  if (move.animal === Animal.Chameleon) {
    player.chameleon = {x: move.x, y: move.y}
  } else {
    player.toucan = {x: move.x, y: move.y}
  }
  removeMosquitoFromPlayer(game, Mosquito.Blue)
  delete getActivePlayerState(game).selectedMosquito
  console.log('played Blue Effect')
}