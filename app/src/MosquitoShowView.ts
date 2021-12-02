import GameView from '@gamepark/mosquito-show/GameView'
import { endOfTurn } from '@gamepark/mosquito-show/MosquitoShow'
import { eatInView, Move, moveAnimal, moveMosquitoTokenInView, MoveType, playMosquitoEffectInView } from '@gamepark/mosquito-show/moves'
import { MoveView } from '@gamepark/mosquito-show/moves/MoveView'
import { revealMosquitoInView } from '@gamepark/mosquito-show/moves/RevealMosquito'
import { Game } from '@gamepark/rules-api'
import LocalGameView from './LocalGameView'

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
export default class MosquitoShowView implements Game<LocalGameView, Move> {
  state: LocalGameView

  constructor(state: GameView) {
    this.state = state
  }

  /**
   * In this method, inside the view, we must return any move that the frontend can fully anticipate.
   * The reason why it should be anticipated instead of waiting for the backend to provide with all the automatic consequences is latency.
   * If the backend takes time to reply, maybe we will have the reply while we are animating the first consequences. The player won't notice the latency!
   *
   * @return A MoveView which can be completely anticipated by the player or the spectator
   */

  /*  getAutomaticMove() {
      //const activePlayerState = getActivePlayerState(this.state)!
      if (this.state.pendingChameleonMove) { //&& activePlayerState.availableMosquitoEffects.length > 0 && !activePlayerState.chameleonMoved && (this.state.possibleAnimalFields === undefined || this.state.possibleAnimalFields.length == 0)) {
        return selectAnimalMove(this.state.selectedAnimalId!)
      }

      return getPredictableAutomaticMoves(this.state)
    }*/

  /**
   * This is where a move is reproduced on the browser of a player. Most move will be treated the exact same way on both server and client side,
   * however some moves, that involved hiding information or discovering hidden information, will receive a different treatment than in the main rules class.
   *
   * @param move The move that must be applied in the browser of the player or the spectator
   */
  play(move: MoveView): void {
    switch (move.type) {
      case MoveType.SelectAnimal:
        /*if (moquito effect to force to move opponent animal) {
          selectAnimal(this.state, move)
        } else ...*/
        this.state.selectedAnimal = move.animal
        return
      case MoveType.SelectMosquitoToken:
        this.state.selectedPondSpace = {x: move.x, y: move.y}
        return
      case MoveType.ChooseMosquitoEffect:
        this.state.selectedMosquito = move.mosquito
        return
      case MoveType.MoveAnimal:
        moveAnimal(this.state, move)
        delete this.state.selectedAnimal
        break
      case MoveType.MoveMosquitoToken:
        moveMosquitoTokenInView(this.state, move)
        delete this.state.selectedPondSpace
        delete this.state.selectedMosquito
        break
      case MoveType.Eat:
        eatInView(this.state, move)
        break
      case MoveType.PlayWhiteMosquitoEffect:
        playMosquitoEffectInView(this.state, move)
        delete this.state.selectedMosquito
        break
      case MoveType.RevealMosquito:
        revealMosquitoInView(this.state, move)
        break
    }
    endOfTurn(this.state)
  }

}