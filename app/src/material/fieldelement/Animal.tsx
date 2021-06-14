/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates';
import GameView from '@gamepark/mosquito-show/GameView';
import MoveType from '@gamepark/mosquito-show/moves/MoveType';
import { usePlay } from '@gamepark/react-client';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type AnimalProp = {
    xc: number;
    yc: number;
    state: GameView | undefined;
}

const Animal: FunctionComponent<AnimalProp> = ({ state, xc, yc }: AnimalProp) => {
    const play = usePlay();
    
    function yeah(){
        play({type: MoveType.ChooseAnimal});
    }
    
    function test() {
        if(state == undefined){
            return <div />
        }
        var possibleFields = state.possibleFields;
        if (possibleFields != undefined) {
            for (var val of possibleFields) {
                if(val.x == xc && val.y == yc){
                    return <div css={animalPosition({ x: xc, y: yc })} style={{ backgroundImage: `url(${Images.Tucan_Orange})` }}></div>
                } else {
                    var animalFields = state.board.animalfield;
                    for (var animal of animalFields) {
                        if(animal.x == xc && animal.y == yc){
                            return <div css={animalPosition({ x: xc, y: yc })} style={{ backgroundImage: `url(${Images.Tucan_Blue})` }}></div>
                        }
                        return <div onClick={yeah}/>
                    }
                }
            }
        }
        return <div onClick={yeah}/>


    }
    return (
        test()
    )

}

export {
    Animal
};

const animalPosition = (coords: Coordinates) => css`
  height: 13%;
  width: 13%;
  position: absolute;
  left: ${5 + ((coords.x - 1) * 25.5)}%;
  top: ${5 + ((coords.y - 1) * 25.5)}%; 
  border-radius: 50%;
  border: none;
  background-position: center;
  background-size: cover;
`;

