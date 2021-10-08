import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import {Mosquito} from '../material/MosquitoEffect'
import {MoveType} from './MoveType'

export type Eat = {
  type: typeof MoveType.Eat
} & Coordinates

export type EatView = Eat & {
  mosquito?: Mosquito
}

export const eatMove = (x: number, y: number): Eat => ({type: MoveType.Eat, x, y})

export function eat(game: GameState, move: Eat) {
  const mosquito = game.mosquitos[move.x][move.y].pop()!.mosquito
  takeMosquito(game, mosquito)
}

export function eatInView(game: GameView, move: EatView) {
  const mosquito = game.mosquitos[move.x][move.y].pop()!.mosquito ?? move.mosquito!
  takeMosquito(game, mosquito)
}

export function takeMosquito(game: GameState | GameView, mosquito: Mosquito) {
  const player = game.players.find(p => p.color === game.activePlayer)!
  if (mosquito === Mosquito.Golden) {
    player.goldenMosquitos++
  } else {
    player.eatenMosquitos.push(mosquito)
  }
  if (player.pendingToucanEat.length) {
    player.pendingToucanEat.shift()
  } else {
    player.chameleonMustMove = true
  }
}