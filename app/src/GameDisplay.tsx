/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import GameView from '@gamepark/mosquito-show/GameView'
import useTutorial from '@gamepark/react-client/dist/Tutorial/useTutorial'
import { Letterbox } from '@gamepark/react-components'
import Board from './material/board/Board'
import PlayerBoard from './material/board/PlayerBoard'
import TutorialPopup from './tutorial/MosquitoShowTutorialPopup'

type Props = {
  game: GameView
}


export default function GameDisplay({game}: Props) {
  const tutorial = useTutorial()

  return (
    <Letterbox css={letterBoxStyle}>
      <div css={display}>
        <PlayerBoard game={game} playerIndex={0}/>
        <Board game={game}/>
        <PlayerBoard game={game} playerIndex={1}/>
        {tutorial && <TutorialPopup game={game} tutorial={tutorial}/>}
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