/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AnimalOnField from '@gamepark/mosquito-show/animals/Animal';
import AnimalField from '@gamepark/mosquito-show/fields/AnimalField';
import PlayerColor from '@gamepark/mosquito-show/PlayerColor';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type AnimalProp = {
    animalFieldelement: AnimalField;
}

const Animal: FunctionComponent<AnimalProp> = ({ animalFieldelement}: AnimalProp) => {
    function setAnimalOnField(){
        animalFieldelement.animalOnField = new AnimalOnField(PlayerColor.Blue);
    }

    
    function test() {
        if (!animalFieldelement.isEmpty) {
            return <div css={boardStyle} style={{ backgroundImage: `url(${Images.Chamelon})` }}></div>
        } else {
            return  <div onClick={setAnimalOnField}>
          </div>
        }

    }

    return (
       
        test()

    )
}

export {
    Animal
};

const boardStyle = css`
    position: relative;
    display: inline-grid;
    height: 100%;
    width: 100%;
    background-size: contain;
`

