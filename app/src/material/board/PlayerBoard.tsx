/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import { FunctionComponent, useState } from 'react';
import { Images } from '../Resources';

type PlayerBoardProps = {
    gameboard?: GameBoard | undefined;
}

const PlayerBoard: FunctionComponent<PlayerBoardProps> = ({ gameboard }: PlayerBoardProps) => {
    
    const [inHover, setHover] = useState(false);

    function getCss() {
        if(inHover){
            return marked;
        }
        return boardStyle;
    }

    return <div css={getCss()} onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)} style={{ backgroundImage: `url(${Images.Chamelon_Blue})` }} />
}

export {
    PlayerBoard
};

const marked = css`
    position: relative;
    display: inline-grid;
    height: 50%;
    width: 50%;
    background-size: contain;
    background-repeat: no-repeat;
`

const boardStyle = css`
    position: relative;
    display: inline-grid;
    height: 100%;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
`


