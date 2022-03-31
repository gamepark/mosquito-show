import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { MoveType } from './MoveType'

export type SelectMosquitoToken = {
  type: typeof MoveType.SelectMosquitoToken
  coordinates?: Coordinates
}

export const selectMosquitoTokenMove = (coordinates?: Coordinates): SelectMosquitoToken => ({
  type: MoveType.SelectMosquitoToken, coordinates
})

export function selectMosquitoToken(state: GameView | GameState, move: SelectMosquitoToken) {
  // nothing to do
}
