import Animal from '@gamepark/mosquito-show/animals/Animal'
import GameView from '@gamepark/mosquito-show/GameView'

type LocalGameView = GameView & {
  selectedAnimal?: Animal
}

export default LocalGameView