/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import Animal from '@gamepark/mosquito-show/animals/Animal'
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates'
import { moveAnimalMove } from '@gamepark/mosquito-show/moves'
import { HTMLAttributes } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import LocalGameView from 'src/LocalGameView'
import { highlightColorGreen, highlightColorWhite, jungleSpaceDelta } from '../../styles'
import { ANIMAL, AnimalDragObject } from '../fieldelement/AnimalMini'

type Props = Coordinates & {
  game: LocalGameView
  canMoveHere: (animal: Animal) => boolean
} & HTMLAttributes<HTMLDivElement>

export default function JungleSpace({ x, y, game, canMoveHere, ...props }: Props) {
  const [{ canDrop, isOver }, ref] = useDrop({
    accept: ANIMAL,
    canDrop: (item: AnimalDragObject) => canMoveHere(item.animal),
    collect: (monitor: DropTargetMonitor<AnimalDragObject>) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    }),
    drop: ({ animal }: AnimalDragObject) => moveAnimalMove(animal, { x, y })
  })
  return (
    <div ref={ref} css={[style(x, y), (props.onClick || canDrop) && !isOver && display, canDrop && isOver && overStyle]} {...props} />
  )
}

const style = (x: number, y: number) => css`
  position: absolute;
  left: ${x * jungleSpaceDelta + 2.5}em;
  top: ${y * jungleSpaceDelta + 2}em;
  width: 16em;
  height: 16em;
  border-radius: 50%;
  border: 0.5em solid rgba(${highlightColorWhite}, 0);
`

const overStyle = css`
  border-color: rgba(${highlightColorGreen}, 1);
`

const glow = keyframes`
  from {
    border-color: rgba(${highlightColorWhite}, .3);
  }
  to {
    border-color: rgba(${highlightColorWhite}, .6);
  }
`

const display = css`
  cursor: pointer;
  animation: ${glow} 2s alternate infinite ease-in-out;
  &:hover {
    border-color: rgba(${highlightColorGreen}, 1);
    animation: none;
  }
`
