import AnimalType from "../animals/AnimalType"
import PlayerColor from "../PlayerColor"
import Coordinates from "./Coordinates"


type AnimalField = {
    id: number
    type: AnimalType
    color: PlayerColor
  } & Coordinates

// class AnimalField implements FieldElement {
//     animalOnField: Animal | null;
//     selected: boolean;

//     constructor(){
//         this.animalOnField = null;
//         this.selected = false;
//     }

//     isEmpty(): boolean {
//         return this.animalOnField === null;
//     }

//      setAnimalOnField(animalonfield : Animal){
//         this.animalOnField = animalonfield
//     }
    
// }

export default AnimalField