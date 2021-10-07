/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import GameView from '@gamepark/mosquito-show/GameView'
import {Letterbox} from '@gamepark/react-components'
import Board from './material/board/Board'
import {PlayerBoard} from './material/board/PlayerBoard'

type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  return (
    <Letterbox css={letterBoxStyle}>
      <div css={[display, boardGrid]}>
        <PlayerBoard playerstate={game.players[0]} gameboard={game.board} activePlayer={game.activePlayer} css={playerBoard}/>
        <Board game={game}/>
        <PlayerBoard playerstate={game.players[1]} gameboard={game.board} activePlayer={game.activePlayer} css={playerBoard}/>
      </div>
    </Letterbox>
  )
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

const display = css`
  height: 100%;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`

const playerBoard = css`
  position: relative;
  display: inline-grid;
  height: 100%;
  width: 100%;
`
const boardGrid = css`
  display: grid;
  grid-template-columns: 22% 56% 22%;
  grid-template-rows: 100%;
`