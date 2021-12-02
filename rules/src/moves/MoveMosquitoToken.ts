import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { MoveType } from './MoveType'

export type MoveMosquitoToken = {
  type: typeof MoveType.MoveMosquitoToken
} & Coordinates

export const moveMosquitoTokenMove = (coordinates: Coordinates): MoveMosquitoToken => ({
  type: MoveType.MoveMosquitoToken, x: coordinates.x, y: coordinates.y
})

export const moveMosquitoToken = (game: GameState | GameView, move: MoveMosquitoToken): void => {
  // const player = game.players.find(p => p.color === game.activePlayer)!
  // if (move.animal === Animal.Chameleon) {
  //   player.chameleon = {x: move.x, y: move.y}
  //   delete player.chameleonMustMove
  // } else {
  //   const origin = player.toucan
  //   player.toucan = {x: move.x, y: move.y}
  //   if (origin) {
  //     player.pendingToucanEat.push(...getPondsBetween(origin, player.toucan))
  //   }
  // }
}

// function getPondsBetween(origin: Coordinates, destination: Coordinates) {
//   const result: Coordinates[] = []
//   if (origin.x < destination.x && origin.y < destination.y) {
//     for (let x = origin.x, y = origin.y; x < destination.x; x++, y++) {
//       result.push({x, y})
//     }
//   } else if (origin.x < destination.x && origin.y > destination.y) {
//     for (let x = origin.x, y = origin.y - 1; x < destination.x; x++, y--) {
//       result.push({x, y})
//     }
//   } else if (origin.x > destination.x && origin.y < destination.y) {
//     for (let x = origin.x - 1, y = origin.y; x >= destination.x; x--, y++) {
//       result.push({x, y})
//     }
//   } else if (origin.x > destination.x && origin.y > destination.y) {
//     for (let x = origin.x - 1, y = origin.y - 1; x >= destination.x; x--, y--) {
//       result.push({x, y})
//     }
//   }
//   return result
// }
