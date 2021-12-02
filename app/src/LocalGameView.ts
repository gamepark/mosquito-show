import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import GameView from '@gamepark/mosquito-show/GameView'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'

type LocalGameView = GameView & {
  selectedAnimal?: Animal
  selectedPondSpace?: Coordinates
  selectedMosquito?: Mosquito
}

export default LocalGameView