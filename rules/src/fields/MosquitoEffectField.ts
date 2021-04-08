import FieldElement from "./FieldElement";

class MosquitoEffectField implements FieldElement {
    pile: number = 3;

    isEmpty(): boolean {
        return this.pile === 0;
    }
    
}

export default MosquitoEffectField