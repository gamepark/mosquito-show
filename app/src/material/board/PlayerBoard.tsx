/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import PlayerState from '@gamepark/mosquito-show/PlayerState'
import { FunctionComponent, HTMLAttributes } from 'react'
import { boardSize, headerHeight, margin } from '../../styles'
import MosquitoToken from '../fieldelement/MosquitoToken'

type PlayerBoardProps = {
  playerstate: PlayerState
  activePlayer?: PlayerColor
} & HTMLAttributes<HTMLDivElement>

const PlayerBoard: FunctionComponent<PlayerBoardProps> = ({playerstate, activePlayer, ...props}: PlayerBoardProps) => {
  return <div css={outbox(playerstate.color, activePlayer)} {...props}>
    {playerstate.eatenMosquitos.map( eatenMosquito =>
      <MosquitoToken mosquito={eatenMosquito} css={tokenPosition}/>
    )
  }
  </div>
}

export {
  PlayerBoard
}

const tokenPosition = css`
  top: -10em;
  left: -20em;
`

const outbox = (player: PlayerColor, activePlayer?: PlayerColor) => css`
  position: absolute;
  top: ${headerHeight + margin}em;
  transform: translate(${(player === PlayerColor.Blue ? 1 : 1+(100*16/9-boardSize)/2 + boardSize)}em);
  height: 45em;
  width: ${(98*16/9-boardSize)/2}em;
  border-style: ${player === activePlayer? 'dashed' : 'solid'};
  border-color: ${(player === PlayerColor.Blue ? 'blue' : 'orange')};
`