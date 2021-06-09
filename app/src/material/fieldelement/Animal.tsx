/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates';
import GameState from '@gamepark/mosquito-show/GameState';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type AnimalProp = {
    state: GameState | undefined;
}

const Animal: FunctionComponent<AnimalProp> = ({ state }: AnimalProp) => {


    return (
        <div css={animalPosition({x: 3,y: 1})} style={{ backgroundImage: `url(${Images.Tucan_Blue})`} }></div>
    )
}

export {
    Animal
};

const animalPosition = (coords: Coordinates) => css`
  height: 13%;
  width: 13%;
  position: absolute;
  left: ${5 + ((coords.x-1)*25.5)}%;
  top: ${5 + ((coords.y-1)*25.5)}%; 
  border-radius: 50%;
  border: none;
  background-position: center;
  background-size: cover;
`;

