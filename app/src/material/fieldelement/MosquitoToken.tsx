/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import {Mosquito, MosquitoOnBoard, Waterlily} from '@gamepark/mosquito-show/material/MosquitoEffect'
import {HTMLAttributes} from 'react'
import {mosquitoTokenSize} from '../../styles'
import Images from '../Images'

type Props = {
  mosquitoOnBoard: Partial<MosquitoOnBoard>
} & HTMLAttributes<HTMLDivElement>

export const MOSQUITO_TOKEN = 'MOSQUITO_TOKEN'
export type mosquitoTokenDragObject = { token: Animal }

export default function MosquitoToken({mosquitoOnBoard, ...props}: Props) {
  return <div css={[style,
    mosquitoOnBoard.mosquito ? frontFace(mosquitoOnBoard.mosquito) : flip,
    mosquitoOnBoard.waterlily && backFace(mosquitoOnBoard.waterlily),
    props.onClick && glow
  ]} {...props}/>
}

const style = css`
  position: absolute;
  width: ${mosquitoTokenSize}em;
  height: ${mosquitoTokenSize}em;
  transform-style: preserve-3d;
`

const mosquitoImage: { [key in Mosquito]: string } = {
  [Mosquito.Golden]: Images.goldenMosquito,
  [Mosquito.White]: Images.whiteMosquito,
  [Mosquito.Blue]: Images.blueMosquito,
  [Mosquito.Grey]: Images.greyMosquito,
  [Mosquito.Red]: Images.redMosquito
}

const waterlilyImage: { [key in Waterlily]: string } = {
  [Waterlily.WaterLily]: Images.waterlily,
  [Waterlily.Flower]: Images.waterlilyFlower
}

const frontFace = (mosquito: Mosquito) => css`
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    box-shadow: 0 0 0.5em black, 0 0 0.5em black, 0 0 0.5em black;
    background-image: url(${mosquitoImage[mosquito]});
    background-size: cover;
    backface-visibility: hidden;
  }
`

const backFace = (waterlily: Waterlily) => css`
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    box-shadow: 0 0 0.3em black, 0 0 0.3em black, 0 0 0.3em black;
    background-image: url(${waterlilyImage[waterlily]});
    background-size: cover;
    backface-visibility: hidden;
    transform: rotateY(180deg);
  }
`

const flip = css`
  transform: rotateY(180deg);
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
