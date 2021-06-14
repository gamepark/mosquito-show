import AnimalField from "./fields/AnimalField";
import MosquitoEffectField from "./fields/MosquitoEffectField";

type GameBoard = {
    animalfield: AnimalField[]
    mosquitoFields: MosquitoEffectField[][]
}

export default GameBoard 
    // field: FieldElement|null[][] = []

    // constructor() {
    //     var mosquitoEffectTokens: MosquitoEffectToken[] = this.shuffleArray(this.getMosquitoEffectTokens());
    //     for (var row: number = 0; row < 7; row++) {
    //         this.field[row] = [];
    //         for (var column: number = 0; column < 7; column++) {
    //             // 0 1 2 3 4 5 6
    //             // A N A N A N A 0
    //             // N M N M N M N 1
    //             // A N A N A N A 2 
    //             // N M N M N M N 3
    //             // A N A N A N A 4
    //             // N M N M N M N 5
    //             // A N A N A N A 6

    //             if (column % 2 === 0) {
    //                 if (row % 2 === 0) {
    //                     this.field[row][column] = new AnimalField();
    //                 } else {
    //                     this.field[row][column] = null; 
    //                 }
    //             } else {
    //                 if (row % 2 === 0) {
    //                     this.field[row][column] = null;
    //                 } else {
    //                      const mosquitoEffectField = this.field[row][column] = new MosquitoEffectField();
    //                      for (let index = 0; index < 3; index++) {
    //                          const currentToken = mosquitoEffectTokens.pop();
    //                          if(currentToken instanceof MosquitoEffectToken){
    //                             mosquitoEffectField.pile.push(currentToken);
    //                          }
    //                      }
    //                      if(mosquitoEffectField.pile[mosquitoEffectField.pile.length-1].front === MosquitoEffectFront.WaterLily){
    //                          //turn around
    //                      }                     
    //                 }
    //             }
    //         }
    //     }
    // }

    // getMosquitoEffectTokens(): MosquitoEffectToken[] {
    //     var tokens: MosquitoEffectToken[] = [];

    //     // Golden Mosquitoes
    //     for (let index = 0; index < 17; index++) {
    //         if(index < 5) {
    //             tokens.push(new MosquitoEffectToken(MosquitoEffectFront.WaterLilyFlower,MosquitoEffectBack.Golden));
    //         } else {
    //             tokens.push(new MosquitoEffectToken(MosquitoEffectFront.WaterLily,MosquitoEffectBack.Golden));
    //         }
    //     }

    //     // Grey Mosquitoes
    //     for (let index = 0; index < 4; index++) {
    //         if(index < 1) {
    //             tokens.push(new MosquitoEffectToken(MosquitoEffectFront.WaterLilyFlower,MosquitoEffectBack.Grey));
    //         } else {
    //             tokens.push(new MosquitoEffectToken(MosquitoEffectFront.WaterLily,MosquitoEffectBack.Grey));
    //         }
    //     }

    //     // Blue Mosquitoes
    //     for (let index = 0; index < 3; index++) {
    //         if(index < 1) {
    //             tokens.push(new MosquitoEffectToken(MosquitoEffectFront.WaterLilyFlower,MosquitoEffectBack.Blue));
    //         } else {
    //             tokens.push(new MosquitoEffectToken(MosquitoEffectFront.WaterLily,MosquitoEffectBack.Blue));
    //         }
    //     }

    //     // Red Mosquitoes
    //     for (let index = 0; index < 2; index++) {
    //         if(index < 1) {
    //             tokens.push(new MosquitoEffectToken(MosquitoEffectFront.WaterLilyFlower,MosquitoEffectBack.Red));
    //         } else {
    //             tokens.push(new MosquitoEffectToken(MosquitoEffectFront.WaterLily,MosquitoEffectBack.Red));
    //         }
    //     }

    //     // White Mosquitoes
    //     tokens.push(new MosquitoEffectToken(MosquitoEffectFront.WaterLilyFlower,MosquitoEffectBack.White));

    //     return tokens;
    // }

    // shuffleArray(array:MosquitoEffectToken[]): MosquitoEffectToken[] {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    //     return array;
    // }

    // getFieldElement(): FieldElement|null[][] {
    //     return this.field;
    // }
