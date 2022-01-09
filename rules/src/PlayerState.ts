import Animal from './animals/Animal'
import Coordinates from './fields/Coordinates'
import { Mosquito } from './material/MosquitoEffect'
import PlayerColor from './PlayerColor'

export default interface PlayerState {
  color: PlayerColor
  toucan?: Coordinates
  chameleon?: Coordinates
  goldenMosquitos: number
  eatenMosquitos: Mosquito[]
  pendingToucanEat: Coordinates[]
  chameleonMustMove?: boolean
  animalForcedToMove?: Animal
  skippedTurn?: boolean
  selectedMosquito?: Mosquito
}