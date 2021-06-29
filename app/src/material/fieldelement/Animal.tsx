/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameView from '@gamepark/mosquito-show/GameView';
import MoveType from '@gamepark/mosquito-show/moves/MoveType';
import { usePlay } from '@gamepark/react-client';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type AnimalProp = {
    id: number;
    state: GameView | undefined;
}

const Animal: FunctionComponent<AnimalProp> = ({ state, id }: AnimalProp) => {
    const play = usePlay();

    // function yeah() {
    //     play({ type: MoveType.ChooseAnimal });
    // }
    function moveTo(id: number) {
        play({ type: MoveType.MoveAnimal, fieldId: id, animalId: state?.selectedAnimalId })
    }

    function possibleFields() {
        // if(state == undefined){
        //     return <div />
        // }
        if (state != undefined) {
            var possibleFields = state.possibleFields;
            if (possibleFields != undefined) {
                for (var val of possibleFields) {

                    if (val == id) {
                        return <div css={highlightPosition(id)} onClick={() => { moveTo(id) }} ></div>
                    }
                }
            }
            if (state.board.animalfield != undefined) {
                let animals = state.board.animalfield
                for (let i = 0; i < animals.length; i++) {
                    if (id == animals[i].fieldId) {
                        return <div css={animalPosition(animals[i].fieldId)} style={{ backgroundImage: `url(${Images.Tucan_Blue})` }} />
                    }
                }
            }
        }

        return <div></div>

    }
    return (
        possibleFields()
    )

}

export {
    Animal
};

const animalPosition = (id: number) => css`
height: 13%;
width: 13%;
position: absolute;
left: ${5 + (((id - 1) % 4) * 25.5)}%;
top: ${5 + ((Math.floor((id - 1) / 4)) * 25.5)}%; 
border-radius: 50%;
border: none;
background-position: center;
background-size: cover;
`;

const highlightPosition = (id: number) => css`
    height: 13%;
    width: 13%;
    position: absolute;
    left: ${5 + (((id - 1) % 4) * 25.5)}%;
    top: ${5 + ((Math.floor((id - 1) / 4)) * 25.5)}%; 
    border-radius: 50%;
    border: 5px solid red; 
    background-position: center;
    background-size: cover;
    `;



