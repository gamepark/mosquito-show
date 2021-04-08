import FieldElement from "./FieldElement"

export default class GameBoard {
    field: FieldElement[][] = []

    constructor() {
        for (var row: number = 0; row < 7; row++) {
            this.field[row] = [];
            for (var column: number = 0; column < 7; column++) {
                // this.things[row][column] = new Thing();
            }
        }
    }



    getFieldElement() : FieldElement[][]{
        return this.field;
    }
}