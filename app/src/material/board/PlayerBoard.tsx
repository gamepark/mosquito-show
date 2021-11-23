/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { chooseMosquitoEffectMove } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { usePlay } from '@gamepark/react-client'
import { FunctionComponent, HTMLAttributes } from 'react'
import LocalGameView from 'src/LocalGameView'
import { boardSize, headerHeight, margin, mosquitoTokenSize, playerboardSize } from '../../styles'
import MosquitoToken from '../fieldelement/MosquitoToken'

type PlayerBoardProps = {
  game: LocalGameView
  playerIndex: number
} & HTMLAttributes<HTMLDivElement>

const PlayerBoard: FunctionComponent<PlayerBoardProps> = ({ game, playerIndex, ...props }: PlayerBoardProps) => {
  const play = usePlay()
  const playerstate = game.players[playerIndex]
  
  return <div css={outbox(playerstate.color, game.activePlayer)} {...props}>
    {
      [...Array(playerstate.goldenMosquitos)].map((_, index) =>
        <MosquitoToken mosquito={Mosquito.Golden} css={goldenMosquitoPosition(index)} />
      )
    }
    {playerstate.eatenMosquitos.map((eatenMosquito, index) =>
      <MosquitoToken mosquito={eatenMosquito} onClick={game.selectedMosquito === undefined ? () => play(chooseMosquitoEffectMove(eatenMosquito)) : undefined} css={eatenMosquitoPosition(index, playerstate.eatenMosquitos.length)} />
    )
    }
  </div>
}

export {
  PlayerBoard
}

const goldenMosquitoPosition = (index: number) => css`
  position: absolute;
  top: 10em;
  left: ${1 + (index * ((playerboardSize - mosquitoTokenSize - 2) / 11))}em;
`

const eatenMosquitoPosition = (index: number, length: number) => css`
  position: absolute;
  top: 25em;
  left: ${(playerboardSize - (length * mosquitoTokenSize)) / (length + 1) * (index + 1) + (index * mosquitoTokenSize)}em;
`

const outbox = (player: PlayerColor, activePlayer?: PlayerColor) => css`
  position: absolute;
  top: ${headerHeight + margin}em;
  transform: translate(${(player === PlayerColor.Blue ? 1 : 1 + (100 * 16 / 9 - boardSize) / 2 + boardSize)}em);
  height: 45em;
  width: ${playerboardSize}em;
  border-style: ${player === activePlayer ? 'dashed' : 'solid'};
  border-color: ${(player === PlayerColor.Blue ? 'blue' : 'orange')};
`