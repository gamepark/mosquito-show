/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import {moveAnimalMove} from '@gamepark/mosquito-show/moves'
import {HTMLAttributes} from 'react'
import {DropTargetMonitor, useDrop} from 'react-dnd'
import {jungleSpaceDelta} from '../../styles'
import {ANIMAL, AnimalDragObject} from '../fieldelement/AnimalMini'

type Props = Coordinates & {
  canMoveHere: (animal: Animal) => boolean
} & HTMLAttributes<HTMLDivElement>

export default function JungleSpace({x, y, canMoveHere, ...props}: Props) {
  const [{canDrop, isOver}, ref] = useDrop({
    accept: ANIMAL,
    collect: (monitor: DropTargetMonitor<AnimalDragObject>) => ({
      canDrop: monitor.getItem() && canMoveHere(monitor.getItem().animal),
      isOver: monitor.isOver()
    }),
    drop: ({animal}: AnimalDragObject) => moveAnimalMove(animal, {x, y})
  })
  return (
    <div ref={ref} css={[style(x, y), (props.onClick || canDrop) && !isOver && display, isOver && overStyle]} {...props}/>
  )
}

const style = (x: number, y: number) => css`
  position: absolute;
  left: ${x * jungleSpaceDelta + 2.5}em;
  top: ${y * jungleSpaceDelta + 2}em;
  width: 16em;
  height: 16em;
  border-radius: 50%;
  border: 0.5em solid white;
  opacity: 0;
`

const overStyle = css`
  border-color: green;
  opacity: 1;
`

const glow = keyframes`
  from {
    opacity: 0.1;
  }
  to {
    opacity: 0.3;
  }
`

const display = css`
  cursor: pointer;
  animation: ${glow} 2s alternate infinite ease-in-out;
`
