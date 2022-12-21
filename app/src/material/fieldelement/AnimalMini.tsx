/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { isMoveAnimalMove, MoveAnimal, selectAnimalMove, selectOpponentAnimalMove } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import PlayerState from '@gamepark/mosquito-show/PlayerState'
import { canMoveAnimal } from '@gamepark/mosquito-show/utils/AnimalUtils'
import { getActivePlayerState } from '@gamepark/mosquito-show/utils/GameUtils'
import { getSelectedMosquito } from '@gamepark/mosquito-show/utils/PlayerBoardUtils'
import { Animation, useAnimation, usePlay, usePlayerId } from '@gamepark/react-client'
import { Draggable } from '@gamepark/react-components'
import LocalGameView from '../../LocalGameView'
import { animalHeight, animalWidth, boardSize, jungleSpaceDelta } from '../../styles'
import { canSelect } from '../../util/GameUtils'
import Images from '../Images'

const { Orange, Blue } = PlayerColor
const { Toucan, Chameleon } = Animal

type AnimalProp = {
  game: LocalGameView
  owner: PlayerState
  animal: Animal
}

export const ANIMAL = 'ANIMAL'
export type AnimalDragObject = { animal: Animal }

export default function AnimalMini({ game, owner, animal }: AnimalProp) {
  const playerId = usePlayerId<PlayerColor>()
  const moveAnimalAnimation = useAnimation<MoveAnimal>(animation => isMoveAnimalMove(animation.move) && animation.move.animal === animal && game.activePlayer === owner.color)
  const play = usePlay()
  const selected = playerId === owner.color && game.selectedAnimal === animal
  const canMove = (playerId === game.activePlayer && playerId === owner.color && canMoveAnimal(game, animal) && (getActivePlayerState(game)?.animalForcedToMove === undefined || getActivePlayerState(game)?.animalForcedToMove === animal) && getSelectedMosquito(game) !== Mosquito.Red)
  const chooseEnemyAnimal = (getSelectedMosquito(game) === Mosquito.Red && owner.color !== game.activePlayer)
  const canSelectAnimal = canSelect(game, animal)

  const onClick = () => {
    if (canMove) {
      if (getActivePlayerState(game)?.animalForcedToMove && getActivePlayerState(game)?.animalForcedToMove !== animal) {
        return
      }
      play(selectAnimalMove(animal === game.selectedAnimal ? undefined : animal), { local: true })
    } else if (chooseEnemyAnimal) {
      play(selectOpponentAnimalMove(animal))
    }
  }

  return <Draggable type={ANIMAL} item={{ animal }} canDrag={canSelectAnimal && canMove} drop={play}
    css={[style(owner.color, animal), selected ? selectedAnimal(owner, animal) : (canSelectAnimal && (canMove || chooseEnemyAnimal)) && filterAnimation(owner, animal), moveAnimalAnimation && moveAnimalAnimationTranslation(moveAnimalAnimation.duration)]}
    preTransform={placeAnimal(owner, animal, moveAnimalAnimation)}
    onClick={onClick} />
}

const moveAnimalAnimationTranslation = (duration: number) => css`
  transition: transform ${duration}s ease-in-out;
`

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

function placeAnimal(player: PlayerState, animal: Animal, animation?: Animation) {
  const location = animation ? animation.move : animal === Animal.Chameleon ? player.chameleon : player.toucan
  if (location) {
    return animalPosition(location)
  } else {
    return animalOutsideBoard(player.color, animal)
  }
}

const animalPosition = ({ x, y }: Coordinates) => `translate(${x * jungleSpaceDelta + 4}em, ${y * jungleSpaceDelta}em)`

const animalOutsideBoard = (player: PlayerColor, animal: Animal) =>
  `translate(${(player === Orange ? boardSize + 15 : -15 - animalWidth) + (animal === Toucan ? -10 : 10)}em, 70em)`

const selectedAnimal = (player: PlayerState, animal: Animal) => css`
  filter: drop-shadow(0 0 0.2em ${player.animalForcedToMove === animal ? 'red' : 'white'}) drop-shadow(0 0 0.2em ${player.animalForcedToMove === animal ? 'red' : 'white'}) drop-shadow(0 0 0.2em ${player.animalForcedToMove === animal ? 'red' : 'white'});
`

const filterKeyframe = (player: PlayerState, animal: Animal) => keyframes`
  from {
    filter: drop-shadow(0 0 0.2em ${player.animalForcedToMove === animal ? 'red' : 'white'});
  }
  to {
    filter: drop-shadow(0 0 0.4em ${player.animalForcedToMove === animal ? 'red' : 'white'}) drop-shadow(0 0 0.4em ${player.animalForcedToMove === animal ? 'red' : 'white'});
  }
`

const filterAnimation = (player: PlayerState, animal: Animal) => css`
  animation: ${filterKeyframe(player, animal)} 2s infinite alternate ease-in-out;
`
