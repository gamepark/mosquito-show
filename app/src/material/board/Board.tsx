/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import { FunctionComponent } from 'react';
import { Animal } from '../fieldelement/Animal';
import { Mosquito } from '../fieldelement/Mosquito';
import { Images } from '../Resources';

type BoardProps = {
    gameboard?: GameBoard | undefined;
}

const Board: FunctionComponent<BoardProps> = ({ gameboard }: BoardProps) => {
    const column = [0, 1, 2, 3, 4, 5, 6]
    // const row = [0, 1, 2, 3, 4, 5, 6]

    function createAnimalsAndMosquitoStack(column: number, row: number) {
        if (column % 2 == 1) {
            return <Mosquito column={column} row={row} />
        } else {
            if (typeof gameboard !== "undefined" && gameboard !== null) {
                console.log(gameboard.field[column][row])
                return <Animal animalFieldelement={gameboard.field[column][row]} gameboard={gameboard} row={row} column={column}/>
            }
            return "";
        }
    }

    return (
        <div css={boardStyle} style={{ backgroundImage: `url(${Images.BoardFront})` }}>
            <div css={boardGrid}>
                {column.map((column) => createAnimalsAndMosquitoStack(column, 0))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 1))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 2))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 3))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 4))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 5))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 6))}
            </div>
        </div>
    )
}

export {
    Board
};

const boardGrid = css`
    display: grid;
    grid-template-columns: 21% 6% 20% 6% 20% 6% 21%;
    grid-template-rows: 21% 6% 20% 6% 20% 6% 21%;
`

const boardStyle = css`
    position: relative;
    display: grid;
    height: 100%;
    max-height: 67.5%;
    width: 100%;
    max-width: 38%;
    background-size: contain;
`

