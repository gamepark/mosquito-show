import shuffle from 'lodash.shuffle'
import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import { Mosquito, MosquitoOnBoard, Waterlily } from '../material/MosquitoEffect'

const { Golden, Grey, Blue, Red, White } = Mosquito
const { WaterLily, Flower} = Waterlily

export const createMosquitos = (): MosquitoOnBoard[][][] => {

  const mosquito: MosquitoOnBoard[] = []
  // Golden : 17 total 5 hidden
  for (let i = 0; i < 12; i++) {
    mosquito.push(
      { mosquito: Golden, waterlily: WaterLily, revealed: false }
    )
  }
  for (let i = 0; i < 5; i++) {
    mosquito.push(
      { mosquito: Golden, waterlily: Flower, revealed: false }
    )
  }
  // Grey: 4 total 1 hidden
  for (let i = 0; i < 3; i++) {
    mosquito.push(
      { mosquito: Grey, waterlily: WaterLily, revealed: false }
    )
  }
  mosquito.push(
    { mosquito: Grey, waterlily: Flower, revealed: false }
  )
  // Blue: 3 total 1 hidden
  for (let i = 0; i < 2; i++) {
    mosquito.push(
      { mosquito: Blue, waterlily: WaterLily, revealed: false }
    )
  }
  mosquito.push(
    { mosquito: Blue, waterlily: Flower, revealed: false }
  )
  // Red: 2 total 1 hidden
  mosquito.push(
    { mosquito: Red, waterlily: WaterLily, revealed: false }
  )
  mosquito.push(
    { mosquito: Red, waterlily: Flower, revealed: false }
  )
  // White: 1 total 1 hidden
  mosquito.push(
    { mosquito: White, waterlily: Flower, revealed: false }
  )

  // for (let i = 0; i < 27; i++) {
  //   mosquito.push({mosquito: Mosquito.Red, waterlily: Waterlily.WaterLily, revealed: false})
  // }

  const shuffledMosquitos = shuffle(mosquito)

  const result: MosquitoOnBoard[][][] = []
  for (let x = 0; x < 3; x++) {
    const row: MosquitoOnBoard[][] = []
    for (let y = 0; y < 3; y++) {
      const pile = shuffledMosquitos.splice(0, 3)
      row.push(pile)
      if (pile[2].waterlily === WaterLily) {
        pile[2].revealed = true
      }
    }
    result.push(row)
  }

  return result
}

export function removeMosquitoFromPlayer(game: GameState | GameView, mosquito: Mosquito) {
  const player = game.players.find(p => p.color === game.activePlayer)!
  const mosquitoIndex = player.eatenMosquitos.findIndex(m => m == mosquito)
  if (mosquitoIndex > -1) {
    player.eatenMosquitos.splice(mosquitoIndex, 1)
  }
}

export function mosquitoToReveal(game: GameState | GameView) {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      const pile = game.mosquitos[x][y]
      if (!pile.length) continue
      const mosquito = pile[pile.length - 1]
      if (mosquito.waterlily === WaterLily && !mosquito.revealed) {
        return { x, y }
      }
    }
  }
  return
}

export function tokenForcedToReveal(game: GameState, x: number, y: number) {
  return !game.mosquitos[x][y][game.mosquitos[x][y].length - 1].revealed
}

export function getPondsBetween(origin: Coordinates, destination: Coordinates) {
  const result: Coordinates[] = []
  if (origin.x < destination.x && origin.y < destination.y) {
    for (let x = origin.x, y = origin.y; x < destination.x; x++, y++) {
      result.push({x, y})
    }
  } else if (origin.x < destination.x && origin.y > destination.y) {
    for (let x = origin.x, y = origin.y - 1; x < destination.x; x++, y--) {
      result.push({x, y})
    }
  } else if (origin.x > destination.x && origin.y < destination.y) {
    for (let x = origin.x - 1, y = origin.y; x >= destination.x; x--, y++) {
      result.push({x, y})
    }
  } else if (origin.x > destination.x && origin.y > destination.y) {
    for (let x = origin.x - 1, y = origin.y - 1; x >= destination.x; x--, y--) {
      result.push({x, y})
    }
  }
  return result
}