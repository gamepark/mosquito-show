
import Animal from "../animals/Animal";
import PlayerColor from "../PlayerColor";
import FieldElement from "./FieldElement";

class AnimalField implements FieldElement {
    animalOnField: Animal | null;

    constructor(){
        this.animalOnField = new Animal(PlayerColor.Orange);
    }

    isEmpty(): boolean {
        return this.animalOnField === null;
    }
    
}

export default AnimalField