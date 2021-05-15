/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import { Letterbox } from '@gamepark/react-components';
import { Board } from './material/board/Board';
import { PlayerBoard } from './material/board/PlayerBoard';

type Props = {
  game: GameBoard | undefined
}

const GameDisplay: React.FC<Props> = ({ game }: Props) => {
  return (
    <Letterbox css={letterBoxStyle}>
      <div css={[display, boardGrid]}>
        <div css={playerBoard}><PlayerBoard /></div>
        <div css={gameBoard} ><Board gameboard={game} /></div>
        <div css={playerBoard}><PlayerBoard /></div>
      </div>
    </Letterbox>
  )
}

export {
  GameDisplay
};

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

const gameBoard = css`
position: relative;
display: inline-grid;
height: 100%;
width: 100%;
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