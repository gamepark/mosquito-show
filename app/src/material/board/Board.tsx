/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AnimalClass from '@gamepark/mosquito-show/animals/Animal';
import AnimalType from '@gamepark/mosquito-show/animals/AnimalType';
import Position from '@gamepark/mosquito-show/common/Position';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import MoveType from '@gamepark/mosquito-show/moves/MoveType';
import PlayerColor from '@gamepark/mosquito-show/PlayerColor';
import { usePlay } from '@gamepark/react-client';
import { FunctionComponent, useState } from 'react';
import { Animal } from '../fieldelement/Animal';
import { Mosquito } from '../fieldelement/Mosquito';
import { Images } from '../Resources';

type BoardProps = {
    gameboard?: GameBoard | undefined;
}

const Board: FunctionComponent<BoardProps> = ({ gameboard }: BoardProps) => {
    const play = usePlay();

    const column = [0, 1, 2, 3, 4, 5, 6]

    const [isCamelonDrawn, setChamelonDraw] = useState({ column: 0, row: 0, selected: false })
    const [isTucanDrawn, setTucanDraw] = useState({ column: 6, row: 6, selected: false })



    // function drawChamelon(column: number, row: number) {
    //     if (isCamelonDrawn.column === column && isCamelonDrawn.row === row) {
    //         return <div onClick={() => {
    //             play({ type: MoveType.ChooseAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
    //             setChamelonDraw({ column, row, selected: !isCamelonDrawn.selected });
    //         }}>
    //             {!isCamelonDrawn.selected && <Animal figure={AnimalType.Chameleon} />}
    //             {isCamelonDrawn.selected && !isTucanDrawn.selected && <Animal figure={AnimalType.Toucan} />}</div>
    //     } else {
    //         return <div onClick={() => {
    //             if (isCamelonDrawn.selected) {
    //                 console.log(column, row)
    //                 play({ type: MoveType.MoveAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
    //                 setChamelonDraw({ column, row, selected: false })
    //             }
    //         }} />
    //     }
    // }

    // function drawTucan(column: number, row: number) {
    //     if (isTucanDrawn.column === column && isTucanDrawn.row === row) {
    //         return <div onClick={() => {
    //             play({ type: MoveType.ChooseAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
    //             setTucanDraw({ column, row, selected: !isCamelonDrawn.selected });
    //         }}>
    //             {!isTucanDrawn.selected && <Animal figure={AnimalType.Chameleon} />}
    //             {isTucanDrawn.selected && !isCamelonDrawn.selected && <Animal figure={AnimalType.Toucan} />}</div>
    //     } else {
    //         return <div onClick={() => {
    //             if (isTucanDrawn.selected) {
    //                 console.log(column, row)
    //                 play({ type: MoveType.MoveAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
    //                 setTucanDraw({ column, row, selected: false })
    //             }
    //         }} />
    //     }
    // }

    function createAnimalsAndMosquitoStack(column: number, row: number) {
        if (column % 2 == 1 || row % 2 == 1) {
            if (column % 2 == 1 && row % 2 == 1) {
                return <Mosquito column={column} row={row} />
            }
            return <div />
        } else {
            if (typeof gameboard !== "undefined" && gameboard !== null) {
                if (isCamelonDrawn.column === column && isCamelonDrawn.row === row) {
                    return <div onClick={() => {
                        play({ type: MoveType.ChooseAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
                        setChamelonDraw({ column, row, selected: !isCamelonDrawn.selected });
                    }}>
                        {!isCamelonDrawn.selected && <Animal figure={AnimalType.Chameleon} />}
                        {isCamelonDrawn.selected && !isTucanDrawn.selected && <Animal figure={AnimalType.Toucan} />}</div>
                } else if (isTucanDrawn.column === column && isTucanDrawn.row === row) {
                    return <div onClick={() => {
                        play({ type: MoveType.ChooseAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
                        setTucanDraw({ column, row, selected: !isCamelonDrawn.selected });
                    }}>
                        {!isTucanDrawn.selected && <Animal figure={AnimalType.Toucan} />}
                        {isTucanDrawn.selected && !isCamelonDrawn.selected && <Animal figure={AnimalType.Toucan} />}</div>
                } else {
                    return <div onClick={() => {
                        if (isTucanDrawn.selected) {
                            console.log(column, row)
                            play({ type: MoveType.MoveAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
                            setTucanDraw({ column, row, selected: false })
                        }
                        if (isCamelonDrawn.selected) {
                            console.log(column, row)
                            play({ type: MoveType.MoveAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
                            setChamelonDraw({ column, row, selected: false })
                        }
                    }} />
                }
            }
        }
        return <div />;
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


