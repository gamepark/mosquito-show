import MosquitoEffectToken from "../material/MosquitoEffect";
import FieldElement from "./FieldElement";

class MosquitoEffectField implements FieldElement {
    pile: MosquitoEffectToken[] = [];

    isEmpty(): boolean {
        return this.pile.length === 0;
    }


    // pop(): MosquitoEffect | null { 
    //     if (this.pile.length > 0) {
    //         let index = this.pile.length - 1;
    //         return this.pile[index];
    //     }
    //     return null;
    // }

    // push(effect: MosquitoEffect): void {
    //     if(this.pile.length < 3){
    //         let index = this.pile.length - 1;
    //         this.pile[index] = effect;
    //     }
    //     // Do nothing when full.
    // }

}

export default MosquitoEffectField