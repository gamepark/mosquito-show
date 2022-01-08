import GameState from './GameState'
import { MosquitoOnBoard } from './material/MosquitoEffect'

type GameView = Omit<GameState, 'mosquitos'> & {
  mosquitos: Partial<MosquitoOnBoard>[][][]
}

export default GameView