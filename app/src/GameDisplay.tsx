/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import GameView from '@gamepark/mosquito-show/GameView'
import {Letterbox} from '@gamepark/react-components'
import { Images} from './material/Resources';

type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <div css={ gameBoard } style={{backgroundImage: `url(${Images.BoardFront})`}}>
      </div>
      <div css={css`position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;`}>
        {JSON.stringify(game)}
      </div>
    </Letterbox>
  )
}

export {
  GameDisplay
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const letterBoxStyle = css`
  animation: ${fadeIn} 3s ease-in forwards;
`

const gameBoard = css`
  position: absolute;
  background-size: 100% 100%;
  height: 50%;
  width: 50%;
  top: 20%;
  left: 20%;
`