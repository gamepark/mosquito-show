import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { MoveType } from './MoveType'
import { MoveView } from './MoveView'

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
  game.handleMosquitoEffectOver = true
}

export const moveMosquitoTokenInView = (game: GameView, move: MoveMosquitoToken): void => {
  const mosquito = game.mosquitos[move.origin.x][move.origin.y].pop()!
  game.mosquitos[move.destination.x][move.destination.y].push(mosquito)
  game.handleMosquitoEffectOver = true
}

export function isMoveMosquitoTokenMove(move: MoveView): move is MoveMosquitoToken {
  return move.type === MoveType.MoveMosquitoToken
}