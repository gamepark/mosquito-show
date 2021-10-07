import Animal from '../animals/Animal'
import PlayerColor from '../PlayerColor'
import Coordinates from './Coordinates'

type AnimalLocation = {
  player: PlayerColor
  animal: Animal
  fieldId?: number
} & Coordinates

export default AnimalLocation