import shuffle from 'lodash.shuffle'
import {Mosquito, MosquitoOnBoard, Waterlily} from '../material/MosquitoEffect'

const createMosquitos = (): MosquitoOnBoard[][][] => {

  const mosquito: MosquitoOnBoard[] = []
  // Golden : 17 total 5 hidden
  for (let i = 0; i < 12; i++) {
    mosquito.push(
      {mosquito: Mosquito.Golden, waterlily: Waterlily.WaterLily, revealed: false}
    )
  }
  for (let i = 0; i < 5; i++) {
    mosquito.push(
      {mosquito: Mosquito.Golden, waterlily: Waterlily.Flower, revealed: false}
    )
  }
  // Grey: 4 total 1 hidden
  for (let i = 0; i < 3; i++) {
    mosquito.push(
      {mosquito: Mosquito.Grey, waterlily: Waterlily.WaterLily, revealed: false}
    )
  }
  mosquito.push(
    {mosquito: Mosquito.Grey, waterlily: Waterlily.Flower, revealed: false}
  )
  // Blue: 3 total 1 hidden
  for (let i = 0; i < 2; i++) {
    mosquito.push(
      {mosquito: Mosquito.Blue, waterlily: Waterlily.WaterLily, revealed: false}
    )
  }
  mosquito.push(
    {mosquito: Mosquito.Blue, waterlily: Waterlily.Flower, revealed: false}
  )
  // Red: 2 total 1 hidden
  mosquito.push(
    {mosquito: Mosquito.Red, waterlily: Waterlily.WaterLily, revealed: false}
  )
  mosquito.push(
    {mosquito: Mosquito.Red, waterlily: Waterlily.Flower, revealed: false}
  )
  // White: 1 total 1 hidden
  mosquito.push(
    {mosquito: Mosquito.White, waterlily: Waterlily.Flower, revealed: false}
  )

  const shuffledMosquitos = shuffle(mosquito)

  const result: MosquitoOnBoard[][][] = []
  for (let x = 0; x < 3; x++) {
    const row: MosquitoOnBoard[][] = []
    for (let y = 0; y < 3; y++) {
      const pile = shuffledMosquitos.splice(0, 3)
      row.push(pile)
      if (pile[2].waterlily === Waterlily.WaterLily) {
        pile[2].revealed = true
      }
    }
    result.push(row)
  }

  return result
}

export {
  createMosquitos
}

