import GameBoard from './GameBoard'
import PlayerColor from './PlayerColor'
import PlayerState from './PlayerState'

/**
 * In here, you describe what a GameState will look like at any time during a game.
 */
type GameState = {
  players: PlayerState[],
  activPlayer : PlayerColor,
  board: GameBoard
}

export default GameState