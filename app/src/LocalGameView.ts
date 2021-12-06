import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import GameView from '@gamepark/mosquito-show/GameView'

type LocalGameView = GameView & {
  selectedAnimal?: Animal
  selectedEnemyAnimal?: Animal;
  selectedPondSpace?: Coordinates
 // selectedMosquito?: Mosquito
}

export default LocalGameView