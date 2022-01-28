/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { Mosquito, MosquitoOnBoard } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { eatMove, playGreyMosquitoEffectMove, playWhiteMosquitoEffectMove, selectMosquitoTokenMove } from '@gamepark/mosquito-show/moves'
import { chameleonCanEat } from '@gamepark/mosquito-show/utils/AnimalUtils'
import { getActivePlayerState } from '@gamepark/mosquito-show/utils/GameUtils'
import { usePlay, usePlayerId } from '@gamepark/react-client'
import { useMemo } from 'react'
import LocalGameView from '../../LocalGameView'
import { jungleSpaceDelta, mosquitoTokenSize } from '../../styles'
import MosquitoToken from './MosquitoToken'

type Props = {
  game: LocalGameView
} & Coordinates

export default function PondSpace({ game, x, y }: Props) {
  const playerId = usePlayerId()
  const play = usePlay()
  const canEat = useMemo(() => playerId && chameleonCanEat(game, x, y), [game])
  const mosquitos = game.mosquitos[x][y]
  const isPondSpaceEmpty = getActivePlayerState(game)?.selectedMosquito == Mosquito.Grey && mosquitos.length == 0

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
    if(getActivePlayerState(game)?.selectedMosquito == Mosquito.Blue){
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
        <MosquitoToken key={index} mosquito={mosquitoOnBoard.mosquito} waterlily={mosquitoOnBoard.waterlily} css={tokenPosition(index)}
          onClick={onMosquitoTokenClick(mosquitos.length === index + 1, mosquitoOnBoard)}
        />
      )}
    </div>
  )
}

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