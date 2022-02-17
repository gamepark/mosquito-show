/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { chooseMosquitoEffectMove, skipTurnMove } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { canMoveAnimal } from '@gamepark/mosquito-show/utils/AnimalUtils'
import { getActivePlayerState } from '@gamepark/mosquito-show/utils/GameUtils'
import { usePlay, usePlayerId } from '@gamepark/react-client'
import { HTMLAttributes, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LocalGameView from 'src/LocalGameView'
import { eatenMosquitoPostionTop, goldenMosquitoPositionLeft, goldenMosquitoPositionTop, headerHeight, margin, mosquitoTokenSize, playerBoardDelta, playerboardSize, playerboardTokenBoarderMargin, playerboardTokenDelta, playerColorBlue, playerColorOrange } from '../../styles'
import MosquitoToken from '../fieldelement/MosquitoToken'
import Button from '../util/Button'

type PlayerBoardProps = {
  game: LocalGameView
  playerIndex: number
} & HTMLAttributes<HTMLDivElement>

export default function PlayerBoard({ game, playerIndex, ...props }: PlayerBoardProps) {
  const play = usePlay()
  const playerId = usePlayerId()
  const { t } = useTranslation()
  const playerstate = game.players[playerIndex]
  const [eatenMosquitoClicked, setEatenMosquiteClicked] = useState<number | undefined>()

  const onClick = (eatenMosquito: Mosquito, index: number) => {
    if (getActivePlayerState(game) !== undefined && !getActivePlayerState(game)!.selectedMosquito && !getActivePlayerState(game)!.chameleonMustMove) {
      setEatenMosquiteClicked(index)
      return () => play(chooseMosquitoEffectMove(eatenMosquito))
    }
    return undefined
  }

  return <div css={outbox(playerstate.color, game.activePlayer)} {...props}>
    {
      [...Array(playerstate.goldenMosquitos)].map((_, index) =>
        <MosquitoToken key={index} mosquito={Mosquito.Golden} css={goldenMosquitoPosition(index)}>
          <div css={goldenMosquitoFont}>{index + 1}</div>
        </MosquitoToken>

      )
    }
    {playerstate.eatenMosquitos.map((eatenMosquito, index) =>
      <MosquitoToken key={index} mosquito={eatenMosquito} onClick={onClick(eatenMosquito, index)} css={eatenMosquitoPosition(index)} />
    )
    }

    <span css={buttonFont}>
      {playerstate.color == playerId && playerstate.animalForcedToMove && !canMoveAnimal(game, playerstate.animalForcedToMove) ?
        <Button children={t('skip.turn.button')} color={playerstate.color === PlayerColor.Blue ? playerColorBlue : playerColorOrange} onClick={() => play(skipTurnMove())} css={buttonPosition} /> : undefined
      }
    </span>
  </div>
}
const buttonFont = () => css`
  font-size: medium;
`
const buttonPosition = () => css`
  position: absolute;
  top: 80%;
  height: 20%;
  width: 100%;

`

const goldenMosquitoFont = () => css`
  color: black;
  font-size: 5em; 
  position: absolute;
  top: 0.7em;
  left: 1.3em;
`

const goldenMosquitoPosition = (index: number) => css`
  position: absolute;
  top: ${goldenMosquitoPositionTop}em;
  left: ${1 + (index * goldenMosquitoPositionLeft)}em;
`

const eatenMosquitoPosition = (index: number) => css`
  position: absolute;
  top: ${eatenMosquitoPostionTop}em;
  left: ${playerboardTokenBoarderMargin + index * mosquitoTokenSize + index * playerboardTokenDelta}em;
`
//left: ${(playerboardSize - (length * mosquitoTokenSize)) / (length + 1) * (index + 1) + (index * mosquitoTokenSize)}em;

const outbox = (player: PlayerColor, activePlayer?: PlayerColor) => css`
  position: absolute;
  top: ${headerHeight + margin}em;
  left: ${(player === PlayerColor.Blue ? 1 : 1 + playerBoardDelta)}em;
  height: 45em;
  width: ${playerboardSize}em;
  border-style: ${player === activePlayer ? 'dashed' : 'solid'};
  border-color: ${(player === PlayerColor.Blue ? playerColorBlue : playerColorOrange)};
`