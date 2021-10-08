/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import {getValidDestinations, isValidDestination} from '@gamepark/mosquito-show/MosquitoShow'
import {moveAnimalMove} from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import {usePlay, usePlayerId} from '@gamepark/react-client'
import {useMemo} from 'react'
import LocalGameView from '../../LocalGameView'
import {boardSize, headerHeight, margin} from '../../styles'
import AnimalMini from '../fieldelement/AnimalMini'
import PondSpace from '../fieldelement/PondSpace'
import Images from '../Images'
import JungleSpace from './JungleSpace'

const {Orange, Blue} = PlayerColor
const {Toucan, Chameleon} = Animal

type Props = {
  game: LocalGameView
}

export default function Board({game, ...props}: Props) {
  const playerId = usePlayerId()
  const play = usePlay()
  console.log(game.mosquitos)

  const validDestinations = useMemo(() => {
    if (game.selectedAnimal) {
      return getValidDestinations(game.board, playerId, game.selectedAnimal)
    } else {
      return []
    }
  }, [game.board, playerId, game.selectedAnimal])

  return (
    <div css={boardStyle} {...props}>
      {[...Array(4)].map((_, x) =>
        [...Array(4)].map((_, y) =>
          <JungleSpace key={x + '_' + y} x={x} y={y}
                       canMoveHere={animal => isValidDestination(game.board, playerId, animal, {x, y})}
                       onClick={validDestinations.some(destination => destination.x === x && destination.y === y) ?
                         () => play(moveAnimalMove(game.selectedAnimal!, {x, y}))
                         : undefined}/>
        )
      )}
      {[Blue, Orange].map(color =>
        [Chameleon, Toucan].map(animal =>
          <AnimalMini key={color + '_' + animal} game={game} owner={color} animal={animal}/>
        )
      )}

      {[...Array(3)].map((_, x) =>
        [...Array(3)].map((_, y) =>
          <PondSpace key={x + '_' + y} game={game} x={x} y={y}/>
        )
      )}
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
