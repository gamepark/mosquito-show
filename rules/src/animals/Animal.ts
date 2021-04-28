import PlayerColor from "../PlayerColor";


export default class Animal {
  playerId: PlayerColor
  animalType: AnimalType

  constructor(playeColor: PlayerColor) {
    this.playerId = playeColor;
    this.animalType = AnimalType.Toucan
  }
}

 enum AnimalType {
  Toucan = 'Toucan', Chameleon = 'Chameleon'
}
