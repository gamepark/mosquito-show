/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
// import GameView from '@gamepark/mosquito-show/GameView'
import {Letterbox} from '@gamepark/react-components'
import {Board} from './material/board/Board';

// type Props = {
//   game: GameView
// }

export default function GameDisplay() {
  return (
    <Letterbox css={letterBoxStyle}>
      <div css={ gameBoard }>
        <Board/>
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
  perspective: 100em;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
// const gameBoard = css`
//   position: absolute;
//   background-size: 100% 100%;
//   height: 50%;
//   width: 50%;
//   top: 20%;
//   left: 20%;
// `