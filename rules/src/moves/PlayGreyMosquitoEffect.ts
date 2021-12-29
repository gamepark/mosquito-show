import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { Mosquito } from '../material/MosquitoEffect'
import { getActivePlayerState } from '../MosquitoShow'
import { removeMosquitoFromPlayer } from '../utils/BoardUtils'
import { MoveType } from './MoveType'

export type PlayGreyMosquitoEffect = {
  type: typeof MoveType.PlayGreyMosquitoEffect
  origin: Coordinates
  destination: Coordinates
}

export const playGreyMosquitoEffectMove = (origin: Coordinates, destination: Coordinates): PlayGreyMosquitoEffect => ({
  type: MoveType.PlayGreyMosquitoEffect, origin, destination
})

export const playGreyMosquitoEffect = (game: GameState, move: PlayGreyMosquitoEffect): void => {
  const mosquito = game.mosquitos[move.origin.x][move.origin.y].pop()!
  game.mosquitos[move.destination.x][move.destination.y].push(mosquito)
  removeMosquitoFromPlayer(game, Mosquito.Grey)
  delete getActivePlayerState(game)?.selectedMosquito
}

export const playGreyMosquitoEffectInView = (game: GameView, move: PlayGreyMosquitoEffect): void => {
  const mosquito = game.mosquitos[move.origin.x][move.origin.y].pop()!
  game.mosquitos[move.destination.x][move.destination.y].push(mosquito)
  removeMosquitoFromPlayer(game, Mosquito.Grey)
  delete getActivePlayerState(game)?.selectedMosquito
}