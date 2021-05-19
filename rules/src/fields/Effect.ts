type Effect = {
    id: number
    front: number
    back: number
}

export default Effect

export enum MosquitoEffectBack {
    Grey = '1', Blue = '2', Red = '3', White = '4', Golden = '5'
}

export enum MosquitoEffectFront {
  WaterLilyFlower = '1', WaterLily = '2'
}