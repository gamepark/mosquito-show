/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameView from '@gamepark/mosquito-show/GameView';
import { FunctionComponent } from 'react';

type AnimalProp = {
    id: number;
    state: GameView | undefined;
}

const Animal: FunctionComponent<AnimalProp> = ({ state, id }: AnimalProp) => {
    //  const play = usePlay();

    // function yeah() {
    //     play({ type: MoveType.ChooseAnimal });
    // }
     function moveTo( id : number){
        console.log(state?.selectedAnimalId)
     }

    function test() {
        // if(state == undefined){
        //     return <div />
        // }
        if (state != undefined) {
            var possibleFields = state.possibleFields;
            if (possibleFields != undefined) {
                for (var val of possibleFields) {
                    
                    if(val == id) {
                        return <div css={highlightPosition(id)} onClick={() => {moveTo(id)}} ></div>
                   }
                }
            }
        }

        return <div></div>
        // return <div onClick={yeah} css={animalPosition({ x: xc, y: yc })} style={{ backgroundImage: `url(${Images.Tucan_Blue})` }}></div>

        // if (possibleFields != undefined) {
        //     for (var val of possibleFields) {
        //         if(val.x == xc && val.y == yc){
        //             return <div css={animalPosition({ x: xc, y: yc })} style={{ backgroundImage: `url(${Images.Tucan_Orange})` }}></div>
        //         } else {
        //             var animalFields = state.board.animalfield;
        //             for (var animal of animalFields) {
        //                 if(animal.x == xc && animal.y == yc){
        //                     return <div css={animalPosition({ x: xc, y: yc })} style={{ backgroundImage: `url(${Images.Tucan_Blue})` }}></div>
        //                 }
        //                 return <div onClick={yeah} style={{ backgroundImage: `url(${Images.Tucan_Blue})` }}/>
        //             }
        //         }
        //     }
        // }
        // return <div onClick={yeah} style={{ backgroundImage: `url(${Images.Tucan_Blue})` }}/>


    }
    return (
        test()
    )

}

export {
    Animal
};

    // const animalPosition = (coords: Coordinates) => css`
    // height: 13%;
    // width: 13%;
    // position: absolute;
    // left: ${5 + ((coords.x - 1) * 25.5)}%;
    // top: ${5 + ((coords.y - 1) * 25.5)}%; 
    // border-radius: 50%;
    // border: none;
    // background-position: center;
    // background-size: cover;
    // `;

const highlightPosition = (id: number) => css`
    height: 13%;
    width: 13%;
    position: absolute;
    left: ${5 + (((id-1) % 4) * 25.5)}%;
    top: ${5 + ((Math.floor((id-1) / 4)) * 25.5)}%; 
    border-radius: 50%;
    border: 5px solid red; 
    background-position: center;
    background-size: cover;
    `;



