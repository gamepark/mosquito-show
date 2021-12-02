import GameState from '../GameState'
import GameView from '../GameView'
import { Mosquito } from '../material/MosquitoEffect'
import { MoveType } from './MoveType'

export type SelectMosquitoToken = {
  type: typeof MoveType.SelectMosquitoToken
  mosquitoToken?: Mosquito
}

export const selectMosquitoTokenMove = (mosquitoToken?: Mosquito): SelectMosquitoToken => ({
  type: MoveType.SelectMosquitoToken, mosquitoToken
})

export function selectMosquitoToken(state: GameView | GameState, move: SelectMosquitoToken) {
  // TODO
}
