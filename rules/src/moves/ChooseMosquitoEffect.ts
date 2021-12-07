import GameState from "../GameState";
import GameView from "../GameView";
import { Mosquito } from "../material/MosquitoEffect";
import { getActivePlayerState } from "../MosquitoShow";
import { MoveType } from "./MoveType";

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
export type ChooseMosquitoEffect = {
    type: typeof MoveType.ChooseMosquitoEffect
    mosquito?: Mosquito
}

export const chooseMosquitoEffectMove = (mosquito?: Mosquito): ChooseMosquitoEffect => ({
    type: MoveType.ChooseMosquitoEffect, mosquito
  })


  export const chooseMosquitoEffect = (game: GameState | GameView, move: ChooseMosquitoEffect): void => {
    getActivePlayerState(game).selectedMosquito = move.mosquito
  }
   