/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { canMoveAnimal, getActivePlayerState } from '@gamepark/mosquito-show/MosquitoShow'
import { playRedMosquitoEffectMove, selectAnimalMove } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import PlayerState from '@gamepark/mosquito-show/PlayerState'
import { usePlay, usePlayerId } from '@gamepark/react-client'
import { Draggable } from '@gamepark/react-components'
import LocalGameView from '../../LocalGameView'
import { animalHeight, animalWidth, boardSize, jungleSpaceDelta } from '../../styles'
import { canSelect } from '../../util/GameUtils'
import Images from '../Images'

const {Orange, Blue} = PlayerColor
const {Toucan, Chameleon} = Animal

type AnimalProp = {
  game: LocalGameView
  owner: PlayerState
  animal: Animal
}

export const ANIMAL = 'ANIMAL'
export type AnimalDragObject = { animal: Animal }

export default function AnimalMini({game, owner, animal}: AnimalProp) {
  const playerId = usePlayerId<PlayerColor>()
  const play = usePlay()
  const selected = playerId === owner.color && game.selectedAnimal === animal
  const canMove = (playerId === game.activePlayer && playerId === owner.color && canMoveAnimal(game, animal) && getActivePlayerState(game)?.selectedMosquito !== Mosquito.Red)
  const chooseEnemyAnimal = (getActivePlayerState(game)?.selectedMosquito === Mosquito.Red && owner.color != game.activePlayer)
  const canSelectAnimal = canSelect(game)

  const onClick = () => {
    if (canMove) {
      if(getActivePlayerState(game)?.animalForcedToMove && getActivePlayerState(game)?.animalForcedToMove !== animal){
        return
      }
      play(selectAnimalMove(animal === game.selectedAnimal ? undefined : animal), {local: true})
    } else if (chooseEnemyAnimal){
      play(playRedMosquitoEffectMove(animal))
    }
  }

  return <Draggable type={ANIMAL} item={{animal}} canDrag={canSelectAnimal && canMove} drop={play}
                    css={[style(owner.color, animal), selected ? selectedAnimal : (canSelectAnimal && (canMove || chooseEnemyAnimal)) && filterAnimation]}
                    preTransform={placeAnimal(owner, animal)}
                    onClick={onClick}/>
}

const style = (player: PlayerColor, animal: Animal) => css`
  position: absolute;
  height: ${animalHeight}em;
  width: ${animalWidth}em;
  border-radius: 50%;
  background-image: url(${animalImage(player, animal)});
  background-size: cover;
  filter: drop-shadow(0 0 0.2em black) drop-shadow(0 0 0.2em black) drop-shadow(0 0 0.2em black);
`

function animalImage(player: PlayerColor, animal: Animal) {
  if (player === Blue) {
    return animal === Chameleon ? Images.blueChameleon : Images.blueToucan
  } else {
    return animal === Chameleon ? Images.orangeChameleon : Images.orangeToucan
  }
}

function placeAnimal(player: PlayerState, animal: Animal) {
  const location = animal === Animal.Chameleon ? player.chameleon : player.toucan
  if (location) {
    return animalPosition(location)
  } else {
    return animalOutsideBoard(player.color, animal)
  }
}

const animalPosition = ({x, y}: Coordinates) => `translate(${x * jungleSpaceDelta + 4}em, ${y * jungleSpaceDelta}em)`

const animalOutsideBoard = (player: PlayerColor, animal: Animal) =>
  `translate(${(player === Orange ? boardSize + 15 : -15 - animalWidth) + (animal === Toucan ? -10 : 10)}em, 70em)`

const selectedAnimal = css`
  filter: drop-shadow(0 0 0.2em white) drop-shadow(0 0 0.2em white) drop-shadow(0 0 0.2em white);
`

const filterKeyframe = keyframes`
  from {
    filter: drop-shadow(0 0 0.2em white);
  }
  to {
    filter: drop-shadow(0 0 0.4em white) drop-shadow(0 0 0.4em white);
  }
`

const filterAnimation = css`
  animation: ${filterKeyframe} 2s infinite alternate ease-in-out;
`
