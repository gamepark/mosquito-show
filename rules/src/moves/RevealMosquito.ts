import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import {Mosquito} from '../material/MosquitoEffect'
import {MoveType} from './MoveType'
import {MoveView} from './MoveView'

export type RevealMosquito = {
  type: typeof MoveType.RevealMosquito
} & Coordinates

export type RevealMosquitoView = RevealMosquito & {
  mosquito: Mosquito
}

export const revealMosquitoMove = (x: number, y: number): RevealMosquito => ({type: MoveType.RevealMosquito, x, y})

export function revealMosquito(game: GameState | GameView, move: RevealMosquito | RevealMosquitoView) {
  const pile = game.mosquitos[move.x][move.y]
  if (isRevealMosquitoViewMove(move)) {
    pile[pile.length - 1].mosquito = move.mosquito
    delete pile[pile.length - 1].waterlily
  } else {
    pile[pile.length - 1].revealed = true
  }
}

export function isRevealMosquitoMove(move: MoveView): move is RevealMosquitoView {
  return move.type === MoveType.RevealMosquito
}

export function isRevealMosquitoViewMove(move: RevealMosquito | RevealMosquitoView): move is RevealMosquitoView {
  return (move as RevealMosquitoView).mosquito !== undefined
}
