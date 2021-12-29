/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { Mosquito, MosquitoOnBoard } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { chameleonCanEat, getActivePlayerState } from '@gamepark/mosquito-show/MosquitoShow'
import { eatMove, playGreyMosquitoEffectMove, playWhiteMosquitoEffectMove, selectMosquitoTokenMove } from '@gamepark/mosquito-show/moves'
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

  const onMosquitoTokenClick = (mosquitoOnTop: boolean, mosquitoOnBoard: Partial<MosquitoOnBoard>) => {
    if (getActivePlayerState(game).selectedMosquito == Mosquito.White) {
      return () => play(playWhiteMosquitoEffectMove(x, y))
    }
    if (getActivePlayerState(game).selectedMosquito == Mosquito.Grey) {
      if (!game.selectedPondSpace) {
        return () => play(selectMosquitoTokenMove(x, y), { local: true })
      } else {
        return game.selectedPondSpace!.x != x || game.selectedPondSpace!.y != y ? () => play(playGreyMosquitoEffectMove(game.selectedPondSpace!, { x, y })) : undefined
      }
    }
    if (game.selectedAnimal === Animal.Chameleon && canEat && mosquitoOnTop) {
      return () => play(eatMove(x, y), { delayed: !mosquitoOnBoard.mosquito })
    }
    return undefined
  }

  const onPondSpaceClick = () => {
    if (getActivePlayerState(game).selectedMosquito == Mosquito.Grey && mosquitos.length == 0 && (game.selectedPondSpace!.x != x || game.selectedPondSpace!.y != y)) {
      play(playGreyMosquitoEffectMove(game.selectedPondSpace!, { x, y }))
    }
    return undefined
  }

  return (
    <div onClick={onPondSpaceClick} css={[style(x, y)]}>
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
