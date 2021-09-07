import { css } from '@emotion/react';
import GameState from '@gamepark/mosquito-show/GameState';

type Props = {
  loading: boolean
  game: GameState
}

export default function Header({loading, game}: Props) {

  return (
    <header css={style}>
      <h1 css={titleStyle}>{getText()}</h1>
    </header>
  )

  function getText(){
    
    return "ActivePlayer: "+ game.activePlayer;
  }
}


const style = css`
  position: center;
  display: flex;
  width: 100%;
  height: 7em;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 1s ease-in;
`

const titleStyle = css`
  flex-grow: 1;
  flex-shrink: 0;
  transition: color 1s ease-in;
  padding: 0.25em;
  margin: 0;
  line-height: 1.25;
  font-size: 4em;
  letter-spacing: 0.03em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: normal;
  display: flex;
  justify-content: center;
`