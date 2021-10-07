import Animal from '../animals/Animal'
import PlayerColor from '../PlayerColor'

type AnimalField = {
  player: PlayerColor
  animal: Animal
  fieldId: number
}

export default AnimalField