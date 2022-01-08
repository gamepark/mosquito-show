export enum Mosquito {
  Grey = 1, Blue, Red, White, Golden
}

export enum Waterlily {
  WaterLily = 1, Flower
}

export type MosquitoOnBoard = {
  mosquito: Mosquito
  waterlily: Waterlily
  revealed: boolean
}