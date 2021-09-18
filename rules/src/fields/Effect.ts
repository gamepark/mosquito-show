type Effect = {
    id: number
    front: number
    back: number
    revealed: boolean
}

export default Effect

export enum MosquitoEffectFront {
    Grey = '1', Blue = '2', Red = '3', White = '4', Golden = '5'
}

export enum MosquitoEffectBack {
  WaterLilyFlower = '1', WaterLily = '2'
}