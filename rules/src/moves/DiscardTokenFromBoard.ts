import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import {MoveType} from './MoveType'
import {MoveView} from './MoveView'

export type DiscardTokenFromBoard = {
  type: typeof MoveType.DiscardTokenFromBoard
} & Coordinates

export const discardTokenFromBoardMove = (x: number, y: number): DiscardTokenFromBoard => ({
  type: MoveType.DiscardTokenFromBoard, x, y
})

export function discardTokenFromBoard(game: GameState | GameView, move: DiscardTokenFromBoard) {
  game.mosquitos[move.x][move.y].pop()
  game.handleMosquitoEffectOver = true
}

export function isDiscardTokenFromBoardMove(move: MoveView): move is DiscardTokenFromBoard {
  return move.type === MoveType.DiscardTokenFromBoard
}