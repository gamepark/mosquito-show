/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type BoardProps = {
    gameboard: GameBoard | undefined;
}

const Board: FunctionComponent<BoardProps> = () => {
    return (
        <div css={boardStyle} style={{backgroundImage: `url(${Images.BoardFront})`}}/> 
    )
}
 
export {
    Board
};

const boardStyle = css`
    position: relative;
    display: grid;
    height: 100%;
    max-height: 67.5%;
    width: 100%;
    max-width: 38%;
    background-size: contain;
`

