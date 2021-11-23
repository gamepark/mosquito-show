import { Mosquito } from "../material/MosquitoEffect";
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