import Chameleon from "../animals/Chameleon";
import Toucan from "../animals/Toucan";
import FieldElement from "./FieldElement";

class AnimalField implements FieldElement {
    animalOnField: Chameleon | Toucan | null;

    constructor(){
        this.animalOnField = null;
    }

    isEmpty(): boolean {
        return this.animalOnField === null;
    }
    
}

export default AnimalField