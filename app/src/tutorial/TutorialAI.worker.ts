import GameState from '@gamepark/mosquito-show/GameState'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import TutorialAI from './TutorialAI'


export async function ai(game: GameState, playerId: PlayerColor) {
  return new TutorialAI(playerId).play(game)
}
