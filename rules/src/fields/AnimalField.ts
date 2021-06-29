import AnimalType from "../animals/AnimalType"
import PlayerColor from "../PlayerColor"
import Coordinates from "./Coordinates"


type AnimalField = {
    id: number
    type: AnimalType
    color: PlayerColor
  } & Coordinates



export default AnimalField