import PlayerColor from "../PlayerColor";


export default class Animal {
  playerId: PlayerColor
  animalType: AnimalType

  constructor(playeColor: PlayerColor, animalType: AnimalType) {
    this.playerId = playeColor;
    this.animalType = animalType
  }
}

enum AnimalType {
  Toucan = 'Toucan', Chameleon = 'Chameleon'
}
