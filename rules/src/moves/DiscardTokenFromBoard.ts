import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { Mosquito } from '../material/MosquitoEffect'
import { MoveType } from './MoveType'
import { MoveView } from './MoveView'

export type DiscardTokenFromBoard = {
  type: typeof MoveType.DiscardTokenFromBoard
} & Coordinates

export type DiscardTokenFromBoardView = DiscardTokenFromBoard & {
  mosquito?: Mosquito
}

export const discardTokenFromBoardMove = (x: number, y: number): DiscardTokenFromBoard => ({
  type: MoveType.DiscardTokenFromBoard, x, y
})

export function discardTokenFromBoard(game: GameState, move: DiscardTokenFromBoard) {
  game.mosquitos[move.x][move.y].pop()!.mosquito
  game.handleMosquitoEffectOver = true
}

export function discardTokenFromBoardInView(game: GameView, move: DiscardTokenFromBoardView) {
  game.mosquitos[move.x][move.y].pop()!.mosquito ?? move.mosquito!
  game.handleMosquitoEffectOver = true
}

export function isDiscardTokenFromBoardMove(move: MoveView): move is DiscardTokenFromBoard {
  return move.type === MoveType.DiscardTokenFromBoard
}