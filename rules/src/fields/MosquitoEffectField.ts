import Coordinates from "./Coordinates"
import Effect from "./Effect"


type MosquitoEffectField = {
    id: number
    effect: Effect[]
  } & Coordinates

// class MosquitoEffectField implements FieldElement {
//     pile: MosquitoEffectToken[] = [];

//     isEmpty(): boolean {
//         return this.pile.length === 0;
//     }

// }

export default MosquitoEffectField