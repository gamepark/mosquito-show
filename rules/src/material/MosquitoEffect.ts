export enum MosquitoEffectBack {
    Grey = 'Grey', Blue = 'Blue', Red = 'Red', White = 'White', Golden = 'Golden'
}

export enum MosquitoEffectFront {
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