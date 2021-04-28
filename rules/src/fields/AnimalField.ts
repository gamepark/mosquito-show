
import Animal from "../animals/Animal";
import FieldElement from "./FieldElement";

class AnimalField implements FieldElement {
    animalOnField: Animal | null;

    constructor(){
        this.animalOnField = null;
    }

    isEmpty(): boolean {
        return this.animalOnField === null;
    }

     setAnimalOnField(animalonfield : Animal){
        this.animalOnField = animalonfield
    }
    
}

export default AnimalField