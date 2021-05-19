/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type BoardProps = {
    gameboard?: GameBoard | undefined;
}

const Board: FunctionComponent<BoardProps> = ({ gameboard }: BoardProps) => {
    // const play = usePlay();

    // const column = [0, 1, 2, 3, 4, 5, 6]

    // const [isCamelonDrawn, setChamelonDraw] = useState({ column: -1, row: -1, selected: false })
    // const [isTucanDrawn, setTucanDraw] = useState({ column: -1, row: -1, selected: false })


    // function createAnimalsAndMosquitoStack(column: number, row: number) {
    //     if (column % 2 === 1 || row % 2 === 1) {
    //         if (column % 2 === 1 && row % 2 === 1) {
    //             return <Mosquito column={column} row={row} />
    //         }
    //         return <div />
    //     } else {
    //         if (typeof gameboard !== "undefined" && gameboard !== null) {
    //             if (isCamelonDrawn.column === column && isCamelonDrawn.row === row) {
    //                 return <div onClick={() => {
    //                     play({ type: MoveType.ChooseAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
    //                     setChamelonDraw({ column, row, selected: !isCamelonDrawn.selected });
    //                 }}>
    //                     {!isCamelonDrawn.selected && <Animal figure={AnimalType.Chameleon} />}
    //                     {isCamelonDrawn.selected && !isTucanDrawn.selected && <Animal figure={AnimalType.Toucan} />}</div>
    //             } else if (isTucanDrawn.column === column && isTucanDrawn.row === row) {
    //                 return <div onClick={() => {
    //                     play({ type: MoveType.ChooseAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
    //                     setTucanDraw({ column, row, selected: !isCamelonDrawn.selected });
    //                 }}>
    //                     {!isTucanDrawn.selected && <Animal figure={AnimalType.Toucan} />}
    //                     {isTucanDrawn.selected && !isCamelonDrawn.selected && <Animal figure={AnimalType.Toucan} />}</div>
    //             } else {
    //                 return <div onClick={() => {
    //                     console.log(gameboard)
    //                     if (isTucanDrawn.selected) {
    //                         play({ type: MoveType.MoveAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
    //                         setTucanDraw({ column, row, selected: false })
    //                     }
    //                     if (isCamelonDrawn.selected) {
    //                         play({ type: MoveType.MoveAnimal, playerId: PlayerColor.Orange, position: new Position(column, row), animal: new AnimalClass(PlayerColor.Orange) })
    //                         setChamelonDraw({ column, row, selected: false })
    //                     }
    //                 }} />
    //             }
    //         }
    //     }
    //     return <div />;
    // }

    return (
        <div css={boardStyle} style={{ backgroundImage: `url(${Images.BoardFront})` }}>
            <div css={tokenPosition({x: 1,y: 1})}  style={{ backgroundImage: `url(${Images.BlueMosquito})`} }></div>
            <div css={tokenPosition({x: 2,y: 1})}  style={{ backgroundImage: `url(${Images.GoldenMosquito})`} }></div>
            <div css={tokenPosition({x: 3,y: 1})}  style={{ backgroundImage: `url(${Images.GreyMosquito})`} }></div>
            <div css={tokenPosition({x: 1,y: 2})}  style={{ backgroundImage: `url(${Images.BlueMosquito})`} }></div>
            <div css={tokenPosition({x: 2,y: 2})}  style={{ backgroundImage: `url(${Images.GoldenMosquito})`} }></div>
            <div css={tokenPosition({x: 3,y: 2})}  style={{ backgroundImage: `url(${Images.GreyMosquito})`} }></div>
            <div css={tokenPosition({x: 1,y: 3})}  style={{ backgroundImage: `url(${Images.BlueMosquito})`} }></div>
            <div css={tokenPosition({x: 2,y: 3})}  style={{ backgroundImage: `url(${Images.GoldenMosquito})`} }></div>
            <div css={tokenPosition({x: 3,y: 3})}  style={{ backgroundImage: `url(${Images.GreyMosquito})`} }></div>
            {/* <div css={boardGrid}>
                {column.map((column) => createAnimalsAndMosquitoStack(column, 0))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 1))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 2))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 3))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 4))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 5))}
                {column.map((column) => createAnimalsAndMosquitoStack(column, 6))}
            </div> */}
        </div>
    )
}

export {
    Board
};

// const boardGrid = css`
//     display: grid;
//     grid-template-columns: 21% 6% 20% 6% 20% 6% 21%;
//     grid-template-rows: 21% 6% 20% 6% 20% 6% 21%;
// `

// const boardGrid = css`
//     display: grid;
//     grid-template-columns: 20% 8% 18% 8% 18% 8% 20%;
//     grid-template-rows: 20% 8% 18% 8% 18% 8% 20%;
// `

// const boardStyle = css`
//     position: relative;
//     display: grid;
//     height: 100%;
//     max-height: 100%;
//     width: 100%;
//     max-width: 100%;
//     background-size: contain;
//     background-repeat: no-repeat;
// `

const boardStyle = css`
transform: translate(...%, ...%)
top: 2%
left: 2%
    position: relative;
    display: grid;
    height: 100%;
    max-height: 100%;
    width: 100%;
    max-width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
`


// const pasturePosition = (coords: Coordinates) => css`
//   height: ${PASTURE_SIZE}%;
//   width: ${9 / 16 * PASTURE_SIZE}%;
//   position: absolute;
//   left: ${10 + coords.x * 9 / 16 * PASTURE_SIZE}%;
//   top: ${10 + coords.y * PASTURE_SIZE}%;
// `;

const tokenPosition = (coords: Coordinates) => css`
  height: 12%;
  width: 12%;
  position: absolute;
  left: ${15 + coords.x * 3* (coords.x* coords.x)}%;
  top: ${8 + coords.y * 10*coords.y}%;
  border-radius: 50%;
  border: none;
  background-position: center;
  background-size: cover;
`;