import { MosquitoOnBoard } from './material/MosquitoEffect'
import PlayerColor from './PlayerColor'
import PlayerState from './PlayerState'

/**
 * In here, you describe what a GameState will look like at any time during a game.
 */
type GameState = {
  players: PlayerState[]
  activePlayer?: PlayerColor
  mosquitos: MosquitoOnBoard[][][]
  changePlayer: boolean
}

export default GameState