/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { Mosquito, MosquitoOnBoard } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { eatMove, EatView, isEatViewMove, isPlayGreyMosquitoEffectMove, isPlayWhiteMosquitoEffectMove, PlayGreyMosquitoEffect, playGreyMosquitoEffectMove, PlayWhiteMosquitoEffect, playWhiteMosquitoEffectMove, selectMosquitoTokenMove } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import PlayerState from '@gamepark/mosquito-show/PlayerState'
import { chameleonCanEat } from '@gamepark/mosquito-show/utils/AnimalUtils'
import { getActivePlayerState } from '@gamepark/mosquito-show/utils/GameUtils'
import { useAnimation, usePlay, usePlayerId } from '@gamepark/react-client'
import { useMemo } from 'react'
import LocalGameView from '../../LocalGameView'
import { boardSize, goldenMosquitoPositionLeft, goldenMosquitoPositionTop, jungleSpaceDelta, mosquitoTokenSize, playerBoardDelta, playerboardSize } from '../../styles'
import MosquitoToken from './MosquitoToken'

const { Orange, Blue } = PlayerColor

type Props = {
  game: LocalGameView
} & Coordinates

export default function PondSpace({ game, x, y }: Props) {
  const playerId = usePlayerId()
  const play = usePlay()
  const canEat = useMemo(() => playerId && chameleonCanEat(game, x, y), [game])
  const mosquitos = game.mosquitos[x][y]
  const isPondSpaceEmpty = getActivePlayerState(game)?.selectedMosquito == Mosquito.Grey && mosquitos.length == 0
  const animationGrey = useAnimation<PlayGreyMosquitoEffect>(animation => isPlayGreyMosquitoEffectMove(animation.move)
    && animation.move.origin.x === x
    && animation.move.origin.y === y)
  const animationWhite = useAnimation<PlayWhiteMosquitoEffect>(animation => isPlayWhiteMosquitoEffectMove(animation.move)
    && animation.move.x === x
    && animation.move.y === y)
  const animationEat = useAnimation<EatView>(animation => isEatViewMove(animation.move)
    && animation.move.x === x
    && animation.move.y === y)


  const onMosquitoTokenClick = (mosquitoOnTop: boolean, mosquitoOnBoard: Partial<MosquitoOnBoard>) => {
    const player = game.players.find(p => p.color === game.activePlayer)
    if (!player) return undefined
    if (getActivePlayerState(game)?.selectedMosquito == Mosquito.White) {
      return () => play(playWhiteMosquitoEffectMove(x, y))
    }
    if (getActivePlayerState(game)?.selectedMosquito == Mosquito.Grey) {
      if (!game.selectedPondSpace) {
        return () => play(selectMosquitoTokenMove(x, y), { local: true })
      } else {
        return game.selectedPondSpace!.x != x || game.selectedPondSpace!.y != y ? () => play(playGreyMosquitoEffectMove(game.selectedPondSpace!, { x, y })) : undefined
      }
    }
    if (getActivePlayerState(game)?.selectedMosquito == Mosquito.Blue) {
      return undefined
    }
    if (game.selectedAnimal === Animal.Chameleon && canEat && mosquitoOnTop) {
      return () => play(eatMove((!mosquitoOnBoard.mosquito && !mosquitoOnBoard.revealed), x, y), { delayed: !mosquitoOnBoard.mosquito })
    }
    return undefined
  }

  const onPondSpaceClick = () => {
    if (getActivePlayerState(game)?.selectedMosquito == Mosquito.Grey && mosquitos.length == 0 && game.selectedPondSpace && (game.selectedPondSpace!.x != x || game.selectedPondSpace!.y != y)) {
      play(playGreyMosquitoEffectMove(game.selectedPondSpace!, { x, y }))
    }
    return undefined
  }

  return (
    <div onClick={onPondSpaceClick}
      css={[style(x, y),
      isPondSpaceEmpty && emptyPondSpace,
      isPondSpaceEmpty && game.selectedPondSpace && glow]}>
      {mosquitos.map((mosquitoOnBoard, index) =>
        <MosquitoToken key={index} mosquito={animationEat && index === mosquitos.length - 1 && mosquitoOnBoard.mosquito === undefined ? animationEat.move.mosquito : mosquitoOnBoard.mosquito} waterlily={mosquitoOnBoard.waterlily}
          css={[tokenPosition(index), animationGrey && index === mosquitos.length - 1
            && greyAnimationTranslation(animationGrey.duration, animationGrey.move.origin, animationGrey.move.destination, mosquitoOnBoard.mosquito === undefined, game.mosquitos[animationGrey.move.destination.x][animationGrey.move.destination.y].length - game.mosquitos[animationGrey.move.origin.x][animationGrey.move.origin.y].length),
          animationWhite && index === mosquitos.length - 1
          && whiteAnimationTranslation(animationWhite.duration, x, y, getActivePlayerState(game)!.color, index, mosquitoOnBoard.mosquito === undefined),
          animationEat && index === mosquitos.length - 1 && (game.mosquitos[animationEat.move.x][animationEat.move.y][index].mosquito == Mosquito.Golden || animationEat.move.mosquito === Mosquito.Golden)
          && eatGoldenAnimationTranslation(animationEat.duration, x, y, getActivePlayerState(game)!, index, mosquitoOnBoard.mosquito === undefined)]}
          onClick={onMosquitoTokenClick(mosquitos.length === index + 1, mosquitoOnBoard)}
        />
      )}
    </div>
  )
}

// Other
// Other Hidden

const eatGoldenAnimationTranslation = (duration: number, x: number, y: number, playerState: PlayerState, index: number, hidden: boolean) => css`
  z-index: 10;
  animation: ${eatGoldenAnimationKeyframes(x, y, playerState, index, hidden)} ${duration}s ease-in-out;
  }
`

const eatGoldenAnimationKeyframes = (x: number, y: number, playerState: PlayerState, index: number, hidden: boolean) => keyframes`
from{
  transform: rotateY(${hidden ? 180 : 0}deg);
}
50%{
  transform: translate(${0 + (index * 0.4)}em, ${0 - (index * 0.4)}em) rotateY(${hidden ? 0 : 0}deg);
}
to{
  transform: translate(${(playerState.color === PlayerColor.Blue ? 1 + (1 + ((playerState.goldenMosquitos + 1) * goldenMosquitoPositionLeft)) : 1 + (1 + playerBoardDelta + ((playerState.goldenMosquitos + 1) * goldenMosquitoPositionLeft))) - (x * jungleSpaceDelta + 17) - playerboardSize - mosquitoTokenSize / 2}em, ${goldenMosquitoPositionTop - (y * jungleSpaceDelta + 16.5) + (index * 0.4)}em) rotateY(${hidden ? 0 : 0}deg);
}
`

const whiteAnimationTranslation = (duration: number, x: number, y: number, player: PlayerColor, index: number, hidden: boolean) => css`
  animation: ${whiteAnimationKeyframes(x, y, player, index, hidden)} ${duration}s ease-in-out;
  &:before, &:after {
    animation: ${fadeOut75Keyframes} ${duration}s ease-in-out;
  }
`

const whiteAnimationKeyframes = (x: number, y: number, player: PlayerColor, index: number, hidden: boolean) => keyframes`
from{
  transform: translate(${0 + (index * 0.4)}em, ${0 - (index * 0.4)}em);
}
to{
  transform: translate(${(player === Blue ? ((1 - playerboardSize / 2 - mosquitoTokenSize / 2) - (x * jungleSpaceDelta + 17)) : (((1 + (100 * 16 / 9 - boardSize) / 2 + boardSize) - playerboardSize / 2 - mosquitoTokenSize / 2) - (x * jungleSpaceDelta + 17)))}em, ${50 - (y * jungleSpaceDelta + 16.5)}em);
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

const flip25Keyframes = (hidden: boolean) => keyframes`
from{
  transform: rotateY(${hidden ? 180 : 0}deg);
}
50%, to{
  transform: none;
}
`

const greyAnimationTranslation = (duration: number, origin: Coordinates, destination: Coordinates, hidden: boolean, indexDelta: number) => css`
  z-index:10;
  transition: transform ${duration}s ease-in-out;
  transform: translate(${(destination.x - origin.x) * jungleSpaceDelta + (indexDelta * 0.4)}em, ${(destination.y - origin.y) * jungleSpaceDelta - (indexDelta * 0.4)}em) rotateY(${hidden ? 180 : 0}deg);
`

const style = (x: number, y: number) => css`
  position: absolute;
  left: ${x * jungleSpaceDelta + 17}em;
  top: ${y * jungleSpaceDelta + 16.5}em;
  width: ${mosquitoTokenSize}em;
  height: ${mosquitoTokenSize}em;
  border-radius: 50%;
`

const tokenPosition = (index: number) => css`
  top: ${index * -0.4}em;
  left: ${index * 0.4}em;
`

const emptyPondSpace = css`
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
  }
`

const glowKeyframes = keyframes`
  from {
    box-shadow: 0 0 0.3em white, 0 0 0.3em white, 0 0 0.3em white;
  }
  to {
    box-shadow: 0 0 0.6em white, 0 0 0.6em white, 0 0 0.6em white, 0 0 0.6em white, 0 0 0.6em white;
  }
`

const glow = css`
  cursor: pointer;
  &:before, &:after {
    animation: ${glowKeyframes} 2s infinite alternate ease-in-out;
  }
`