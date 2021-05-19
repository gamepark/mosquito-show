import Animal from './animals/Animal';
import MosquitoEffect from './material/MosquitoEffect';
import PlayerColor from './PlayerColor';

export default interface PlayerState {
  color: PlayerColor,
  ownedGoldenMosquitos: number,
  availableMosquitoEffects: MosquitoEffect[],
  animal: Animal[]
}