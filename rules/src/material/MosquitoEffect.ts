enum MosquitoEffectBack {
    Grey = 'Grey', Blue = 'Blue', Red = 'Red', White = 'White'
}

enum MosquitoEffectFront {
  WaterLilyFlower = 'WaterLilyFlower', WaterLily = 'WaterLily'
}

export default class MosquitoEffectToken {

  front: MosquitoEffectFront;
  back: MosquitoEffectBack;

  constructor(front: MosquitoEffectFront, back: MosquitoEffectBack){
    this.front = front;
    this.back = back;
  }

}