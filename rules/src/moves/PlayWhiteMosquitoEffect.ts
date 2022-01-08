import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { Mosquito } from '../material/MosquitoEffect'
import { removeMosquitoFromPlayer } from '../utils/BoardUtils'
import { getActivePlayerState } from '../utils/GameUtils'
import { MoveType } from './MoveType'

export type PlayWhiteMosquitoEffect = {
  type: typeof MoveType.PlayWhiteMosquitoEffect
} & Coordinates

export type PlayWhiteMosquitoEffectView = PlayWhiteMosquitoEffect & {
  mosquito?: Mosquito
}

export const playWhiteMosquitoEffectMove = (x: number, y: number): PlayWhiteMosquitoEffect => ({
  type: MoveType.PlayWhiteMosquitoEffect,  x, y
})

export function playWhiteMosquitoEffect(game: GameState, move: PlayWhiteMosquitoEffect) {
  game.mosquitos[move.x][move.y].pop()!.mosquito
  removeMosquitoFromPlayer(game, Mosquito.White)
  delete getActivePlayerState(game)?.selectedMosquito
}

export function playMosquitoEffectInView(game: GameView, move: PlayWhiteMosquitoEffectView) {
  game.mosquitos[move.x][move.y].pop()!.mosquito ?? move.mosquito!
  removeMosquitoFromPlayer(game, Mosquito.White)
  delete getActivePlayerState(game)?.selectedMosquito
}