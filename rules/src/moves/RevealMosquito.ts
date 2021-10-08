import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import {Mosquito} from '../material/MosquitoEffect'
import {MoveType} from './MoveType'

export type RevealMosquito = {
  type: typeof MoveType.RevealMosquito
} & Coordinates

export type RevealMosquitoView = RevealMosquito & {
  mosquito: Mosquito
}

export const revealMosquitoMove = (x: number, y: number): RevealMosquito => ({type: MoveType.RevealMosquito, x, y})

export function revealMosquito(game: GameState, move: RevealMosquito) {
  const pile = game.mosquitos[move.x][move.y]
  pile[pile.length - 1].revealed = true
}

export function revealMosquitoInView(game: GameView, move: RevealMosquitoView) {
  const pile = game.mosquitos[move.x][move.y]
  pile[pile.length - 1].mosquito = move.mosquito
  delete pile[pile.length - 1].waterlily
}
