import Chameleon from './animals/Chameleon';
import Toucan from './animals/Toucan';
import MosquitoEffect from './material/MosquitoEffect';
import PlayerColor from './PlayerColor';

export default interface PlayerState {
  color: PlayerColor,
  ownedGoldenMosquitos: number,
  availableMosquitoEffects: MosquitoEffect[],
  chosenAnimal: Toucan | Chameleon
}