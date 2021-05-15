/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type PlayerBoardProps = {
    gameboard?: GameBoard | undefined;
}

const PlayerBoard: FunctionComponent<PlayerBoardProps> = ({ gameboard }: PlayerBoardProps) => {
  
    return <div css={boardStyle} style={{ backgroundImage: `url(${Images.Chamelon_Blue})` }} />
}

export {
    PlayerBoard
};

const boardStyle = css`
    position: relative;
    display: inline-grid;
    height: 100%;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
`


