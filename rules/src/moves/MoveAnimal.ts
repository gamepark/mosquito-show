import Animal from '../animals/Animal'
import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { getPondsBetween, removeMosquitoFromPlayer } from '../utils/BoardUtils'
import { getActivePlayerState } from '../utils/GameUtils'
import { MoveType } from './MoveType'
import { MoveView } from './MoveView'

export type MoveAnimal = {
  type: typeof MoveType.MoveAnimal
  animal: Animal
} & Coordinates

export const moveAnimalMove = (animal: Animal, coordinates: Coordinates): MoveAnimal => ({
  type: MoveType.MoveAnimal, animal, x: coordinates.x, y: coordinates.y
})

export const moveAnimal = (game: GameState | GameView, move: MoveAnimal): void => {
  const player = game.players.find(p => p.color === game.activePlayer)!
  if (move.animal === Animal.Chameleon) {
    player.chameleon = { x: move.x, y: move.y }
    if (player.selectedMosquitoIndex === undefined) {
      delete player.chameleonMustMove
    }
  } else {
    const origin = player.toucan
    player.toucan = { x: move.x, y: move.y }
    if (origin && player.selectedMosquitoIndex === undefined) {
      player.pendingToucanEat.push(...getPondsBetween(origin, player.toucan))
    }
  }
  if (player.selectedMosquitoIndex === undefined) {
    delete getActivePlayerState(game)?.animalForcedToMove
  } else {
    removeMosquitoFromPlayer(game, player.selectedMosquitoIndex)
    delete getActivePlayerState(game)?.selectedMosquitoIndex
  }
}

export function isMoveAnimalMove(move: MoveView): move is MoveAnimal {
  return move.type === MoveType.MoveAnimal
}