/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { chooseMosquitoEffectMove, DiscardTokenFromPlayerBoard, isDiscardTokenFromPlayerBoardMove, skipTurnMove } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { canMoveAnimal } from '@gamepark/mosquito-show/utils/AnimalUtils'
import { getActivePlayerState } from '@gamepark/mosquito-show/utils/GameUtils'
import { useAnimation, usePlay, usePlayerId } from '@gamepark/react-client'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import LocalGameView from 'src/LocalGameView'
import { eatenMosquitoPostionTop, goldenMosquitoPositionLeft, goldenMosquitoPositionTop, headerHeight, margin, mosquitoTokenSize, playerBoardDelta, playerboardSize, playerboardTokenBoarderMargin, playerboardTokenDelta, playerColorBlue, playerColorOrange } from '../../styles'
import MosquitoToken from '../fieldelement/MosquitoToken'
import Button from '../util/Button'
import { MosquitoAvatar } from './MosquitoAvatar'

type PlayerBoardProps = {
  game: LocalGameView
  playerIndex: number
} & HTMLAttributes<HTMLDivElement>

export default function PlayerBoard({ game, playerIndex, ...props }: PlayerBoardProps) {
  const play = usePlay()
  const playerId = usePlayerId()
  const { t } = useTranslation()
  const playerstate = game.players[playerIndex]
  const discardTokenFromPlayerBoardAnimation = useAnimation<DiscardTokenFromPlayerBoard>(animation => isDiscardTokenFromPlayerBoardMove(animation.move))

  const onClick = (eatenMosquitoIndex: number) => {
    if (getActivePlayerState(game) !== undefined && getActivePlayerState(game)!.selectedMosquitoIndex === undefined && !getActivePlayerState(game)!.chameleonMustMove) {
      return () => play(chooseMosquitoEffectMove(eatenMosquitoIndex))
    }
    return undefined
  }

  return <div css={(playerstate.color == getActivePlayerState(game)?.color) ? showActivePlayer(playerstate.color, game.activePlayer) :  outbox(playerstate.color, game.activePlayer)} {...props}>
    {  
      <MosquitoAvatar player={playerstate} playerInfo={1} color={playerstate.color}></MosquitoAvatar>
    }
    {
      [...Array(playerstate.goldenMosquitos)].map((_, index) =>
        <MosquitoToken key={index} mosquito={Mosquito.Golden} clickable={false} selected={false} css={goldenMosquitoPosition(index)}>
          <div css={goldenMosquitoFont}>{index + 1}</div>
        </MosquitoToken>

      )
    }
    {playerstate.eatenMosquitos.map((eatenMosquito, index) =>
      <MosquitoToken key={index} mosquito={eatenMosquito} clickable={onClick(index) !== undefined} selected={false} onClick={onClick(index)} css={[eatenMosquitoPosition(index),
      discardTokenFromPlayerBoardAnimation && index === playerstate.selectedMosquitoIndex && discardTokenFromPlayerBoardAnimationTranslation(discardTokenFromPlayerBoardAnimation.duration)]
      } />
    )
    }

    <span css={buttonFont}>
      {playerstate.color == playerId && playerstate.animalForcedToMove && !canMoveAnimal(game, playerstate.animalForcedToMove) ?
        <Button children={t('skip.turn.button')} color={playerstate.color === PlayerColor.Blue ? playerColorBlue : playerColorOrange} onClick={() => play(skipTurnMove())} css={buttonPosition} /> : undefined
      }
    </span>
  </div>
}

const discardTokenFromPlayerBoardAnimationTranslation = (duration: number) => css`
transition: transform ${duration}s ease-in-out;
transform: translate(0em, 30em);
&:before, &:after {
  animation: ${fadeOut75Keyframes} ${duration}s ease-in-out;
}
`

const fadeOut75Keyframes = keyframes`
from, 75% {
  opacity: 1;
}
to{
  opacity: 0;
}
`

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

const outbox = (player: PlayerColor, activePlayer?: PlayerColor) => css`
  position: absolute;
  top: ${headerHeight + margin}em;
  left: ${(player === PlayerColor.Blue ? 1 : 1 + playerBoardDelta)}em;
  height: 45em;
  width: ${playerboardSize}em;
  border-style: ${player === activePlayer ? 'dashed' : 'solid'};
  border-color: ${(player === PlayerColor.Blue ? playerColorBlue : playerColorOrange)};
`

const showActivePlayer = (player: PlayerColor, activePlayer?: PlayerColor) => css`
  position: absolute;
  top: ${headerHeight + margin}em;
  left: ${(player === PlayerColor.Blue ? 1 : 1 + playerBoardDelta)}em;
  height: 45em;
  width: ${playerboardSize}em;
  border-style: ${player === activePlayer ? 'dashed' : 'solid'};
  border-color: ${(player === PlayerColor.Blue ? playerColorBlue : playerColorOrange)};
  background-color: rgba(0, 0, 0, 0.5);
`