import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { Mosquito } from '../material/MosquitoEffect'
import { removeMosquitoFromPlayer } from '../utils/BoardUtils'
import { MoveType } from './MoveType'

export type MoveMosquitoToken = {
  type: typeof MoveType.MoveMosquitoToken
  origin: Coordinates
  destination: Coordinates
}

export const moveMosquitoTokenMove = (origin: Coordinates, destination: Coordinates): MoveMosquitoToken => ({
  type: MoveType.MoveMosquitoToken, origin, destination
})

export const moveMosquitoToken = (game: GameState, move: MoveMosquitoToken): void => {
  const mosquito = game.mosquitos[move.origin.x][move.origin.y].pop()!
  game.mosquitos[move.destination.x][move.destination.y].push(mosquito)
  removeMosquitoFromPlayer(game, Mosquito.Grey)
}

export const moveMosquitoTokenInView = (game: GameView, move: MoveMosquitoToken): void => {
  const mosquito = game.mosquitos[move.origin.x][move.origin.y].pop()!
  game.mosquitos[move.destination.x][move.destination.y].push(mosquito)
  removeMosquitoFromPlayer(game, Mosquito.Grey)
}