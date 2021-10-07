/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import GameBoard from '@gamepark/mosquito-show/GameBoard'
import {getValidDestinations} from '@gamepark/mosquito-show/MosquitoShow'
import {moveAnimalMove, selectAnimalMove} from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import {usePlay, usePlayerId} from '@gamepark/react-client'
import LocalGameView from '../../LocalGameView'
import {animalWidth, boardSize, headerHeight, margin} from '../../styles'
import AnimalMini from '../fieldelement/AnimalMini'
import {Effect} from '../fieldelement/Effect'
import Images from '../Images'

const {Orange, Blue} = PlayerColor
const {Toucan, Chameleon} = Animal

type Props = {
  game: LocalGameView
}

export default function Board({game, ...props}: Props) {
  const playerId = usePlayerId()
  const play = usePlay()
  const effects = []

  for (var i = 0; i < game.board.mosquitoFields.length; i++) {
    effects.push(
      <Effect mosquitoEffectField={game.board.mosquitoFields[i]} state={game}/>
    )
  }

  const onClickAnimal = (color: PlayerColor, animal: Animal) => {
    if (game.activePlayer !== playerId) return
    if (color === playerId) {
      // TODO: only if player can move an animal
      play(selectAnimalMove(animal === game.selectedAnimal ? undefined : animal), {local: true})
    }
  }
  
  return (
    <div css={boardStyle} {...props}>
      {game.selectedAnimal && getValidDestinations(game.board, playerId, game.selectedAnimal).map(location =>
        <div key={location} css={highlightPosition(1)} onClick={() => play(moveAnimalMove(game.selectedAnimal!, location))}/>
      )}
      {[Blue, Orange].map(color =>
        [Chameleon, Toucan].map(animal =>
          <AnimalMini key={color + '_' + animal} player={color} animal={animal}
                      onClick={() => onClickAnimal(color, animal)}
                      css={[placeAnimal(game.board, color, animal),
                        playerId === color && game.selectedAnimal === animal && selectedAnimal]}/>
        )
      )}
      {effects}
    </div>
  )
}

const boardStyle = css`
  position: absolute;
  top: ${headerHeight + margin}em;
  left: ${50 * 16 / 9 - boardSize / 2}em;
  height: ${boardSize}em;
  width: ${boardSize}em;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${Images.BoardFront});
`

const highlightPosition = (id: number) => css`
  height: 13%;
  width: 13%;
  position: absolute;
  left: ${5 + (((id - 1) % 4) * 25.5)}%;
  top: ${5 + ((Math.floor((id - 1) / 4)) * 25.5)}%;
  border-radius: 50%;
  border: 5px solid red;
  background-position: center;
  background-size: cover;
`

function placeAnimal(board: GameBoard, player: PlayerColor, animal: Animal) {
  const location = board.animalLocations.find(location => location.player === player && location.animal === animal)
  if (location) {
    return position(location.fieldId)
  } else {
    return animalOutsideBoard(player, animal)
  }
}

const selectedAnimal = css`
  filter: drop-shadow(0 0 0.2em white) drop-shadow(0 0 0.2em white) drop-shadow(0 0 0.2em white);
`

const position = (id: number) => css`
  position: absolute;
  left: ${5 + (((id - 1) % 4) * 25.5)}%;
  top: ${5 + ((Math.floor((id - 1) / 4)) * 25.5)}%;
`

const animalOutsideBoard = (player: PlayerColor, animal: Animal) => css`
  position: absolute;
  top: 70em;
  left: ${(player === PlayerColor.Orange ? boardSize + 15 : -15 - animalWidth) + (animal === Toucan ? -10 : 10)}em;
`
