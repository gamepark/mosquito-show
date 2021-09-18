import Effect from './fields/Effect';
import PlayerColor from './PlayerColor';

export default interface PlayerState {
  color: PlayerColor,
  ownedGoldenMosquitos: number,
  availableMosquitoEffects: Effect[],
  toucanChosenEffectId: number,
  toucanStartPosition: number,
  chameleonMoved: boolean,
  toucanBlocked: boolean,
  chameleonBlocked: boolean
}