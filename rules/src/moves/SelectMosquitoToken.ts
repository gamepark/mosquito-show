import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { MoveType } from './MoveType'

export type SelectMosquitoToken = {
  type: typeof MoveType.SelectMosquitoToken
} & Coordinates

export const selectMosquitoTokenMove = (x: number, y: number): SelectMosquitoToken => ({
  type: MoveType.SelectMosquitoToken, x, y
})

export function selectMosquitoToken(state: GameView | GameState, move: SelectMosquitoToken) {
  // TODO
}
