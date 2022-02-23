import GameState from "../GameState";
import GameView from "../GameView";
import { getActivePlayerState } from "../utils/GameUtils";
import { MoveType } from "./MoveType";

export type ChooseMosquitoEffect = {
  type: typeof MoveType.ChooseMosquitoEffect
  mosquitoIndex?: number
}

export const chooseMosquitoEffectMove = (mosquitoIndex?: number): ChooseMosquitoEffect => ({
  type: MoveType.ChooseMosquitoEffect, mosquitoIndex
})


export const chooseMosquitoEffect = (game: GameState | GameView, move: ChooseMosquitoEffect): void => {
  getActivePlayerState(game)!.selectedMosquitoIndex = move.mosquitoIndex
}
