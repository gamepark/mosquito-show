import Animal from '@gamepark/mosquito-show/animals/Animal'
import GameView from '@gamepark/mosquito-show/GameView'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'

type LocalGameView = GameView & {
  selectedAnimal?: Animal
  selectedMosquito?: Mosquito
}

export default LocalGameView