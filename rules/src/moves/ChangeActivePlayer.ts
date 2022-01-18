import GameState from '../GameState'
import GameView from '../GameView'
import PlayerColor from '../PlayerColor'
import { getActivePlayerState } from '../utils/GameUtils'
import { MoveType } from './MoveType'

export type ChangeActivePlayer = {
  type: typeof MoveType.ChangeActivePlayer
}

export const changeActivePlayerMove = (): ChangeActivePlayer => ({
  type: MoveType.ChangeActivePlayer
})

export const changeActivePlayer = (game: GameState | GameView, move: ChangeActivePlayer): void => {
  game.activePlayer = getActivePlayerState(game)!.color === PlayerColor.Blue ? PlayerColor.Orange : PlayerColor.Blue
  game.turnOver = false
}