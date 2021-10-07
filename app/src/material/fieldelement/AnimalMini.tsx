/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import {Draggable} from '@gamepark/react-components'
import {DraggableProps} from '@gamepark/react-components/dist/Draggable/Draggable'
import {animalHeight, animalWidth} from '../../styles'
import Images from '../Images'

type AnimalProp = {
  player: PlayerColor
  animal: Animal
} & Omit<DraggableProps, 'type'>

export default function AnimalMini({player, animal, ...props}: AnimalProp) {
  return <Draggable type="animal" css={[style(player, animal)]} {...props}/>
}

const style = (player: PlayerColor, animal: Animal) => css`
  position: absolute;
  height: ${animalHeight}em;
  width: ${animalWidth}em;
  border-radius: 50%;
  background-image: url(${animalImage(player, animal)});
  background-size: cover;
`

function animalImage(player: PlayerColor, animal: Animal) {
  if (player === PlayerColor.Blue) {
    if (animal === Animal.Chameleon) return Images.blueChameleon
    else return Images.blueToucan
  } else {
    if (animal === Animal.Chameleon) return Images.orangeChameleon
    else return Images.orangeToucan
  }
}
