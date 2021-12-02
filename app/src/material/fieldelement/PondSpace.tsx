/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { Mosquito, MosquitoOnBoard } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { chameleonCanEat } from '@gamepark/mosquito-show/MosquitoShow'
import { eatMove, moveMosquitoTokenMove, playWhiteMosquitoEffectMove, selectMosquitoTokenMove } from '@gamepark/mosquito-show/moves'
import { usePlay, usePlayerId } from '@gamepark/react-client'
import { useMemo } from 'react'
import LocalGameView from '../../LocalGameView'
import { jungleSpaceDelta, mosquitoTokenSize } from '../../styles'
import MosquitoToken from './MosquitoToken'

type Props = {
  game: LocalGameView
} & Coordinates

export default function PondSpace({game, x, y}: Props) {
  const playerId = usePlayerId()
  const play = usePlay()
  const canEat = useMemo(() => playerId && chameleonCanEat(game, x, y), [game])
  const mosquitos = game.mosquitos[x][y]

  const onClick = (game:LocalGameView, canEat:boolean, mosquitoOnTop:boolean, x:number, y:number, mosquitoOnBoard:Partial<MosquitoOnBoard>) => {
    if(game.selectedMosquito == Mosquito.White){
      return () => play(playWhiteMosquitoEffectMove(x, y))
    }
    if(game.selectedMosquito == Mosquito.Grey){
      if(!game.selectedPondSpace){
        return () => play(selectMosquitoTokenMove(x, y))
      } else {
        return () => play(moveMosquitoTokenMove(game.selectedPondSpace!, {x,y}))
      }
    }
    if(game.selectedAnimal === Animal.Chameleon && canEat && mosquitoOnTop) {
      return () => play(eatMove(x, y), {delayed: !mosquitoOnBoard.mosquito})
    }
    return undefined
  }
  
  return (
    <div css={[style(x, y)]}>
      {mosquitos.map((mosquitoOnBoard, index) =>
        <MosquitoToken key={index} mosquito={mosquitoOnBoard.mosquito} waterlily={mosquitoOnBoard.waterlily} css={tokenPosition(index)}
                onClick={onClick(game, canEat, mosquitos.length === index + 1, x, y, mosquitoOnBoard)}
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
