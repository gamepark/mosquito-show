import PlayerColor from "../PlayerColor";
import AnimalType from "./AnimalType";


export default class Animal {
  playerId: PlayerColor
  animalType: AnimalType

  constructor(playeColor: PlayerColor) {
    this.playerId = playeColor;
    this.animalType = AnimalType.Toucan
  }
}

