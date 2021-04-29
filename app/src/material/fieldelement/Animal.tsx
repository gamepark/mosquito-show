/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AnimalClass from '@gamepark/mosquito-show/animals/Animal';
import Position from '@gamepark/mosquito-show/common/Position';
import AnimalField from '@gamepark/mosquito-show/fields/AnimalField';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import Move from '@gamepark/mosquito-show/moves/Move';
import MoveType from '@gamepark/mosquito-show/moves/MoveType';
import PlayerColor from '@gamepark/mosquito-show/PlayerColor';
import { usePlay } from '@gamepark/react-client';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type AnimalProp = {
    animalFieldelement: AnimalField;
    gameboard: GameBoard
    row: number
    column: number
}

const Animal: FunctionComponent<AnimalProp> = ({ animalFieldelement, gameboard, row, column }: AnimalProp) => {
    const play = usePlay<Move>()

    function setAnimalOnField() {
        var animal = new AnimalClass(PlayerColor.Orange);
        play({ type: MoveType.ChooseAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: animal })
    }


    function drawAnimals() {
        console.log(animalFieldelement)
        if (animalFieldelement !== null && animalFieldelement.animalOnField !== null) {
            return <div css={boardStyle} style={{ backgroundImage: `url(${Images.Chamelon})` }}></div>
        } else {
            return <div onClick={setAnimalOnField}>
            </div>
        }

    }

    return (
        drawAnimals()
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