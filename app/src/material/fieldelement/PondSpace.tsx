/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import LocalGameView from '../../LocalGameView'
import {jungleSpaceDelta, mosquitoTokenSize} from '../../styles'
import MosquitoToken from './MosquitoToken'

type Props = {
  game: LocalGameView
} & Coordinates

export default function PondSpace({game, x, y}: Props) {
  return (
    <div css={[style(x, y)]}>
      {game.mosquitos[x][y].map((mosquitoOnBoard, index) => <MosquitoToken mosquitoOnBoard={mosquitoOnBoard} css={tokenPosition(index)}/>)}
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
