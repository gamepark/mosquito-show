import PlayerColor from './PlayerColor'
import Animal from './material/Animal'
import MosquitoEffect from './material/MosquitoEffect';

export default interface PlayerState {
  color: PlayerColor,
  ownedGoldenMosquitos: number,
  availableMosquitoEffects: MosquitoEffect[],
  chosenAnimal: Animal
}