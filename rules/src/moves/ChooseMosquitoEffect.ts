import GameState from "../GameState";
import GameView from "../GameView";
import { Mosquito } from "../material/MosquitoEffect";
import { getActivePlayerState } from "../utils/GameUtils";
import { MoveType } from "./MoveType";

export type ChooseMosquitoEffect = {
    type: typeof MoveType.ChooseMosquitoEffect
    mosquito?: Mosquito
}

export const chooseMosquitoEffectMove = (mosquito?: Mosquito): ChooseMosquitoEffect => ({
    type: MoveType.ChooseMosquitoEffect, mosquito
  })


  export const chooseMosquitoEffect = (game: GameState | GameView, move: ChooseMosquitoEffect): void => {
    getActivePlayerState(game)!.selectedMosquito = move.mosquito
  }
   