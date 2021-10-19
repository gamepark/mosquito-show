/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { chameleonCanEat } from '@gamepark/mosquito-show/MosquitoShow'
import { eatMove } from '@gamepark/mosquito-show/moves'
import { usePlay, usePlayerId } from '@gamepark/react-client'
import { useMemo } from 'react'
import LocalGameView from '../../LocalGameView'
import { jungleSpaceDelta, mosquitoTokenSize } from '../../styles'
import MosquitoToken from './MosquitoToken'

type Props = {
  game: LocalGameView
} & Coordinates

export default function PondSpace({game, x, y}: Props) {
  const playerId = usePlayerId()
  const play = usePlay()
  const canEat = useMemo(() => playerId && chameleonCanEat(game, x, y), [game])
  const mosquitos = game.mosquitos[x][y]
  
  return (
    <div css={[style(x, y)]}>
      {mosquitos.map((mosquitoOnBoard, index) =>
        <MosquitoToken key={index} mosquitoOnBoard={mosquitoOnBoard} css={tokenPosition(index)}
                       onClick={game.selectedAnimal === Animal.Chameleon && canEat && mosquitos.length === index + 1 ?
                         () => play(eatMove(x, y), {delayed: !mosquitoOnBoard.mosquito}) : undefined}
        />
      )}
    </div>
  )
}

const style = (x: number, y: number) => css`
  position: absolute;
  left: ${x * jungleSpaceDelta + 17}em;
  top: ${y * jungleSpaceDelta + 16.5}em;
  width: ${mosquitoTokenSize}em;
  height: ${mosquitoTokenSize}em;
  border-radius: 50%;
`

const tokenPosition = (index: number) => css`
  top: ${index * -0.4}em;
  left: ${index * 0.4}em;
`
