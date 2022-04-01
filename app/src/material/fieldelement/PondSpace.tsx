/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { Mosquito, MosquitoOnBoard } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { DiscardTokenFromBoard, discardTokenFromBoardMove, eatMove, EatView, isDiscardTokenFromBoardMove, isEatViewMove, isMoveMosquitoTokenMove, isRevealMosquitoViewMove, MoveMosquitoToken, moveMosquitoTokenMove, RevealMosquitoView, selectMosquitoTokenMove } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import PlayerState from '@gamepark/mosquito-show/PlayerState'
import { chameleonCanEat } from '@gamepark/mosquito-show/utils/AnimalUtils'
import { getActivePlayerState } from '@gamepark/mosquito-show/utils/GameUtils'
import { getSelectedMosquito } from '@gamepark/mosquito-show/utils/PlayerBoardUtils'
import { useAnimation, usePlay, usePlayerId } from '@gamepark/react-client'
import { useMemo } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import LocalGameView from '../../LocalGameView'
import { boardSize, eatenMosquitoPostionTop, goldenMosquitoPositionLeft, goldenMosquitoPositionTop, jungleSpaceDelta, mosquitoTokenSize, playerBoardDelta, playerboardSize, playerboardTokenBoarderMargin, playerboardTokenDelta } from '../../styles'
import DraggableMosquitoToken, { MosquitoTokenDragObject, MOSQUITO_TOKEN } from './DraggableMosquitoToken'
import MosquitoToken from './MosquitoToken'

const { Blue } = PlayerColor

type Props = {
  game: LocalGameView
} & Coordinates

export default function PondSpace({ game, x, y }: Props) {
  const playerId = usePlayerId()
  const play = usePlay()
  const canEat = useMemo(() => playerId && chameleonCanEat(game, x, y), [game])
  const mosquitos = game.mosquitos[x][y]
  const isPondSpaceEmpty = getSelectedMosquito(game) == Mosquito.Grey && mosquitos.length == 0
  const moveMosquitoTokenAnimation = useAnimation<MoveMosquitoToken>(animation => isMoveMosquitoTokenMove(animation.move)
    && animation.move.origin.x === x
    && animation.move.origin.y === y)
  const discardTokenFromBoardAnimation = useAnimation<DiscardTokenFromBoard>(animation => isDiscardTokenFromBoardMove(animation.move)
    && animation.move.x === x
    && animation.move.y === y)
  const eatAnimation = useAnimation<EatView>(animation => isEatViewMove(animation.move)
    && animation.move.x === x
    && animation.move.y === y)
  const revealMosquitoAnimation = useAnimation<RevealMosquitoView>(animation => isRevealMosquitoViewMove(animation.move)
    && animation.move.x === x
    && animation.move.y === y)

  const [, ref] = useDrop({
    accept: MOSQUITO_TOKEN,
    canDrop: (item: MosquitoTokenDragObject) => item.x !== x || item.y !== y,
    collect: (monitor: DropTargetMonitor<MosquitoTokenDragObject>) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    }),
    drop: (item: MosquitoTokenDragObject) => moveMosquitoTokenMove(item, { x, y })
  })

  const onMosquitoTokenClick = (mosquitoOnTop: boolean, mosquitoOnBoard: Partial<MosquitoOnBoard>) => {
    const player = game.players.find(p => p.color === game.activePlayer)
    if (!player) return undefined
    if (getSelectedMosquito(game) === Mosquito.White && mosquitoOnTop) {
      return () => play(discardTokenFromBoardMove(x, y))
    }
    if (getSelectedMosquito(game) === Mosquito.Grey && mosquitoOnTop) {
      if (!game.selectedPondSpace) {
        return () => play(selectMosquitoTokenMove({ x, y }), { local: true })
      } else if (game.selectedPondSpace!.x === x && game.selectedPondSpace!.y === y) {
        return () => play(selectMosquitoTokenMove(undefined), { local: true })
      } else {
        return game.selectedPondSpace!.x !== x || game.selectedPondSpace!.y !== y ? () => play(moveMosquitoTokenMove(game.selectedPondSpace!, { x, y })) : undefined
      }
    }
    if (getSelectedMosquito(game) === Mosquito.Blue) {
      return undefined
    }
    if (game.selectedAnimal === Animal.Chameleon && canEat && mosquitoOnTop) {
      return () => play(eatMove((!mosquitoOnBoard.mosquito && !mosquitoOnBoard.revealed), x, y), { delayed: !mosquitoOnBoard.mosquito })
    }
    return undefined
  }

  const onPondSpaceClick = () => {
    if (getSelectedMosquito(game) === Mosquito.Grey && mosquitos.length === 0 && game.selectedPondSpace && (game.selectedPondSpace!.x != x || game.selectedPondSpace!.y != y)) {
      play(moveMosquitoTokenMove(game.selectedPondSpace!, { x, y }))
    }
    return undefined
  }

  return (
    <div onClick={onPondSpaceClick}
      ref={ref}
      css={[style(x, y),
      isPondSpaceEmpty && emptyPondSpace,
      isPondSpaceEmpty && game.selectedPondSpace && glow]}>
      {mosquitos.map((mosquitoOnBoard, index) =>
        index === mosquitos.length - 1 && getSelectedMosquito(game) == Mosquito.Grey ?
          <DraggableMosquitoToken key={index} mosquito={mosquitoOnBoard.mosquito} waterlily={mosquitoOnBoard.waterlily} clickable={onMosquitoTokenClick(mosquitos.length === index + 1, mosquitoOnBoard) !== undefined} selected={game.selectedPondSpace !== undefined && game.selectedPondSpace!.x === x && game.selectedPondSpace!.y === y} css={[tokenPosition(index), moveMosquitoTokenAnimation && index === mosquitos.length - 1
            && moveMosquitoTokenAnimationTranslation(moveMosquitoTokenAnimation.duration, moveMosquitoTokenAnimation.move.origin, moveMosquitoTokenAnimation.move.destination, false, game.mosquitos[moveMosquitoTokenAnimation.move.destination.x][moveMosquitoTokenAnimation.move.destination.y].length - game.mosquitos[moveMosquitoTokenAnimation.move.origin.x][moveMosquitoTokenAnimation.move.origin.y].length)]} x={x} y={y} onClick={onMosquitoTokenClick(mosquitos.length === index + 1, mosquitoOnBoard)} /> :
          <MosquitoToken key={index} mosquito={(eatAnimation && index === mosquitos.length - 1 && mosquitoOnBoard.mosquito === undefined) ? eatAnimation.move.mosquito : (revealMosquitoAnimation && index === mosquitos.length - 1 && mosquitoOnBoard.mosquito === undefined) ? revealMosquitoAnimation.move.mosquito : mosquitoOnBoard.mosquito} waterlily={mosquitoOnBoard.waterlily} clickable={onMosquitoTokenClick(mosquitos.length === index + 1, mosquitoOnBoard) !== undefined} selected={false}
            css={[tokenPosition(index),
            discardTokenFromBoardAnimation && index === mosquitos.length - 1
            && discardTokenFromBoardAnimationTranslation(discardTokenFromBoardAnimation.duration, x, y, getActivePlayerState(game)!.color, index, mosquitoOnBoard.mosquito === undefined),
            eatAnimation && index === mosquitos.length - 1 && (game.mosquitos[eatAnimation.move.x][eatAnimation.move.y][index].mosquito === Mosquito.Golden || eatAnimation.move.mosquito === Mosquito.Golden)
            && eatGoldenAnimationTranslation(eatAnimation.duration, x, y, getActivePlayerState(game)!, index, mosquitoOnBoard.mosquito === undefined),
            eatAnimation && index === mosquitos.length - 1 && (game.mosquitos[eatAnimation.move.x][eatAnimation.move.y][index].mosquito !== Mosquito.Golden || eatAnimation.move.mosquito !== Mosquito.Golden)
            && eatNonGoldenAnimationTranslation(eatAnimation.duration, x, y, getActivePlayerState(game)!, index, mosquitoOnBoard.mosquito === undefined, getActivePlayerState(game)!.eatenMosquitos.length),
            revealMosquitoAnimation && index === mosquitos.length - 1
            && revealMosquitoAnimationTranslation(revealMosquitoAnimation.duration)]}
            onClick={onMosquitoTokenClick(mosquitos.length === index + 1, mosquitoOnBoard)}
          />
      )}
    </div>
  )
}

const revealMosquitoAnimationTranslation = (duration: number) => css`
  z-index:10;
  transition: transform ${duration}s ease-in-out;
  transform: transform: rotateY(180}deg);
`

const eatNonGoldenAnimationTranslation = (duration: number, x: number, y: number, playerState: PlayerState, index: number, hidden: boolean, currentPosition: number) => css`
  z-index: 10;
  animation: ${eatNonGoldenAnimationKeyframes(x, y, playerState, index, hidden, currentPosition)} ${duration}s ease-in-out;
  }
`

const eatNonGoldenAnimationKeyframes = (x: number, y: number, playerState: PlayerState, index: number, hidden: boolean, currentPosition: number) => keyframes`
from{
  transform: rotateY(${hidden ? 180 : 0}deg);
}
50%{
  transform: translate(${0 + (index * 0.4)}em, ${0 - (index * 0.4)}em) rotateY(${hidden ? 0 : 0}deg);
}
to{
  transform: translate(${(playerState.color === PlayerColor.Blue ? (1 + (playerboardTokenBoarderMargin + currentPosition * mosquitoTokenSize + currentPosition * playerboardTokenDelta)) : (playerBoardDelta + (1 + (playerboardTokenBoarderMargin + currentPosition * mosquitoTokenSize + currentPosition * playerboardTokenDelta)))) - (x * jungleSpaceDelta + 17) - playerboardSize - 1}em, ${eatenMosquitoPostionTop - (y * jungleSpaceDelta + 16.5) + (index * 0.4)}em) rotateY(${hidden ? 0 : 0}deg);
}
`

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
  transform: translate(${(playerState.color === PlayerColor.Blue ? 1 + (1 + ((playerState.goldenMosquitos + 1) * goldenMosquitoPositionLeft)) : 1 + (playerBoardDelta + 1 + ((playerState.goldenMosquitos + 1) * goldenMosquitoPositionLeft))) - (x * jungleSpaceDelta + 17) - playerboardSize - mosquitoTokenSize / 2}em, ${goldenMosquitoPositionTop - (y * jungleSpaceDelta + 16.5) + (index * 0.4)}em) rotateY(${hidden ? 0 : 0}deg);
}
`

const discardTokenFromBoardAnimationTranslation = (duration: number, x: number, y: number, player: PlayerColor, index: number, hidden: boolean) => css`
  animation: ${discardFromBoardAnimationKeyframes(x, y, player, index, hidden)} ${duration}s ease-in-out;
  &:before, &:after {
    animation: ${fadeOut75Keyframes} ${duration}s ease-in-out;
  }
`

const discardFromBoardAnimationKeyframes = (x: number, y: number, player: PlayerColor, index: number, hidden: boolean) => keyframes`
from{
  transform: translate(${0 + (index * 0.4)}em, ${0 - (index * 0.4)}em) rotateY(${hidden ? 180 : 0}deg);
}
to{
  transform: translate(${(player === Blue ? ((1 - playerboardSize / 2 - mosquitoTokenSize / 2) - (x * jungleSpaceDelta + 17)) : (((1 + (100 * 16 / 9 - boardSize) / 2 + boardSize) - playerboardSize / 2 - mosquitoTokenSize / 2) - (x * jungleSpaceDelta + 17)))}em, ${50 - (y * jungleSpaceDelta + 16.5)}em) rotateY(${hidden ? 180 : 0}deg);
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

const moveMosquitoTokenAnimationTranslation = (duration: number, origin: Coordinates, destination: Coordinates, hidden: boolean, indexDelta: number) => css`
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