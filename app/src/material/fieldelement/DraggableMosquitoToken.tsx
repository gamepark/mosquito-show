/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { Mosquito, Waterlily } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { usePlay } from '@gamepark/react-client'
import { Draggable } from '@gamepark/react-components'
import { HTMLAttributes } from 'react'
import { mosquitoTokenSize } from '../../styles'
import MosquitoToken from './MosquitoToken'

type Props = {
    mosquito?: Mosquito
    waterlily?: Waterlily
    clickable: boolean
} & Coordinates & HTMLAttributes<HTMLDivElement>

export const MOSQUITO_TOKEN = 'MOSQUITO_TOKEN'
export type MosquitoTokenDragObject = Coordinates

export default function DraggableMosquitoToken({ mosquito, waterlily, clickable, x, y, ...props }: Props) {
    const play = usePlay()
    return <Draggable type={MOSQUITO_TOKEN} css={style} item={{ x, y }} drop={play} {...props}>
        <MosquitoToken mosquito={mosquito} waterlily={waterlily} clickable={clickable} />
    </Draggable>
}

const style = css`
  position: absolute;
  width: ${mosquitoTokenSize}em;
  height: ${mosquitoTokenSize}em;
  transform-style: preserve-3d;
`