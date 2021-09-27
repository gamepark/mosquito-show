import { Game } from '@gamepark/rules-api';
import GameView from './GameView';
import { Move, moveAnimal, MoveType, playMosquitoEffect, selectAnimal, SelectAnimal, selectMosquitoEffectField } from './moves';

type LocalMove = Move | SelectAnimal

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
export default class MosquitoShowView implements Game<GameView, LocalMove> {
  state: GameView

  constructor(state: GameView) {
    this.state = state
    state.possibleAnimalFields = []
    state.possibleEffectFields = []
  }

  /**
   * In this method, inside the view, we must return any move that the frontend can fully anticipate.
   * The reason why it should be anticipated instead of waiting for the backend to provide with all the automatic consequences is latency.
   * If the backend takes time to reply, maybe we will have the reply while we are animating the first consequences. The player won't notice the latency!
   *
   * @return A MoveView which can be completely anticipated by the player or the spectator
   */
  getAutomaticMove() {
  }

  /**
   * This is where a move is reproduced on the browser of a player. Most move will be treated the exact same way on both server and client side,
   * however some moves, that involved hiding information or discovering hidden information, will receive a different treatment than in the main rules class.
   *
   * @param move The move that must be applied in the browser of the player or the spectator
   */
  play(move: LocalMove): void {
    switch (move.type) {
      case 'SelectAnimal':
        selectAnimal(move, this.state)
        break;
      case MoveType.MoveAnimal:
        moveAnimal(move, this.state)
        break;
      case MoveType.Eat:
        selectMosquitoEffectField(move, this.state)
        break;
      case MoveType.PlayMosquitoEffect:
        playMosquitoEffect(move, this.state)
        break;
    }
  }

}