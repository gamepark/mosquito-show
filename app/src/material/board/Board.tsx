import { FunctionComponent} from 'react';
import { css } from '@emotion/react';
import {
    boardWidth,
    boardHeight
} from '../../util/Styles';
import { Images } from '../Resources';

type BoardProps = {
    
}

// const toPositions = (pond: (Slab | Pick<Slab, 'back'>)[][]): Position[][] => pond.map((row, x) => row.map((_, y) => ({ x, y })));
// const rotate = (matrix: Position[][], times: number): Position[][]   => { 
//     for(let count = 0; count < times; count++) {
//         const n = matrix.length;
//         const x = Math.floor(n/ 2);
//         const y = n - 1;
//         for (let i = 0; i < x; i++) {
//            for (let j = i; j < y - i; j++) {
//               let k = matrix[i][j];
//               matrix[i][j] = matrix[y - j][i];
//               matrix[y - j][i] = matrix[y - i][y - j];
//               matrix[y - i][y - j] = matrix[j][y - i]
//               matrix[j][y - i] = k
//            }
//         }
//     }
//     return matrix;
//   }

const Board: FunctionComponent<BoardProps> = ({}) => {
    return (
        <div css={boardStyle}> 
        Pizza
        </div>
    );
}

const boardStyle = css`
    z-index: 10;
    position: relative;
    display: grid;
    height: ${ boardHeight}%;
    width: ${ boardWidth }%;
    background: url(${Images.BoardFront}) no repeat;
    background-size: 100%;
`;

export {
    Board
};