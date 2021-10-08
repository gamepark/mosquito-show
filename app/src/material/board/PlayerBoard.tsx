/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import PlayerState from '@gamepark/mosquito-show/PlayerState'
import {FunctionComponent, HTMLAttributes} from 'react'
import Images from '../Images'

type PlayerBoardProps = {
  playerstate: PlayerState
  activePlayer: PlayerColor
} & HTMLAttributes<HTMLDivElement>

const PlayerBoard: FunctionComponent<PlayerBoardProps> = ({playerstate, activePlayer, ...props}: PlayerBoardProps) => {
  /* const token = []

   if (playerstate !== undefined) {
     for (var i = 0; i < playerstate.eatenMosquitos.length; i++) {
       token.push(
         <Token effect={playerstate.eatenMosquitos[i]} effectIndex={i}/>
       )
     }
   }*/

  return <div css={outbox} {...props}>
    <div css={victorypointsRow}>
      <div css={tokenStyle} style={{backgroundImage: `url(${Images.goldenMosquito})`}}/>
      <div css={victorypoints}> x</div>
      <div css={victorypoints}> {playerstate?.goldenMosquitos}</div>
    </div>
    <div css={tokens}>
      {/*{token}*/}
    </div>
  </div>
}

export {
  PlayerBoard
}

const tokenStyle = css`
  position: relative;
  display: inline-grid;
  height: 50%;
  width: 50%;
  background-size: contain;
  background-repeat: no-repeat;
`

const tokens = css`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 100%;
`

const victorypointsRow = css`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 100%;
`
const victorypoints = css`
  font-size: 70px;
`

const outbox = css`
  position: absolute;
  display: inline-grid;
  height: 100%;
  width: 100%;
`
