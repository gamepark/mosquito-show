import AnimalField from "./fields/AnimalField";
import FieldElement from "./fields/FieldElement"
import MosquitoEffectField from "./fields/MosquitoEffectField";

export default class GameBoard {
    field: FieldElement[][] = []

    constructor() {
        for (var row: number = 0; row < 7; row++) {
            this.field[row] = [];
            for (var column: number = 0; column < 7; column++) {
                // 0 1 2 3 4 5 6
                // A N A N A N A 0
                // N M N M N M N 1
                // A N A N A N A 2 
                // N M N M N M N 3
                // A N A N A N A 4
                // N M N M N M N 5
                // A N A N A N A 6
                if (column % 2 === 0) {
                    if (row % 2 === 0) {
                        this.field[row][column] = new AnimalField();
                    } else {
                        // this.field[row][column] = null; 
                    }
                } else {
                    if (row % 2 === 0) {
                        // this.field[row][column] = null;
                    } else {
                         this.field[row][column] = new MosquitoEffectField(); 
                    }
                }
            }
        }
    }



    getFieldElement(): FieldElement[][] {
        return this.field;
    }
}