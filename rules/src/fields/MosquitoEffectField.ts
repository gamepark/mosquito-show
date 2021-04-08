import MosquitoEffectToken from "../material/MosquitoEffect";
import FieldElement from "./FieldElement";

class MosquitoEffectField implements FieldElement {
    pile: MosquitoEffectToken[] = [];

    isEmpty(): boolean {
        return this.pile.length === 0;
    }

}

export default MosquitoEffectField