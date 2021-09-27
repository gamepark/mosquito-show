import GameState from '@gamepark/mosquito-show/GameState';
import MosquitoShow from '@gamepark/mosquito-show/MosquitoShow';
import { Move } from '@gamepark/mosquito-show/moves';
import PlayerColor from '@gamepark/mosquito-show/PlayerColor';
import { Dummy } from '@gamepark/rules-api';

export default class TutorialAI {
  private readonly playerColor: PlayerColor;
  private readonly dummy: Dummy<GameState, Move, PlayerColor>;

  public constructor(playerColor: PlayerColor) {
    this.playerColor = playerColor
    this.dummy = new Dummy(MosquitoShow);
  }

  play(game: GameState): Promise<Move[]> {
    const activePlayer = game.players.find(p => p.color === this.playerColor);
    let moves: Array<Move> = [];
    if (activePlayer) {

    }

    if (moves.length) {
      return Promise.resolve(moves);
    }

    return this.dummy.getRandomMove(game, this.playerColor);
  }

}