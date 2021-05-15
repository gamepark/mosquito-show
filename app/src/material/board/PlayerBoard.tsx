/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import PlayerColor from '@gamepark/mosquito-show/PlayerColor';
import { FunctionComponent, useState } from 'react';
import { Images } from '../Resources';

type PlayerBoardProps = {
    gameboard?: GameBoard | undefined;
    color: PlayerColor;
}

const PlayerBoard: FunctionComponent<PlayerBoardProps> = ({  color }: PlayerBoardProps) => {

    const [inHover, setHover] = useState(false);


    function getImageChamelon(): String {
        switch (color) {
            case PlayerColor.Blue:
                return Images.Chamelon_Blue;
            case PlayerColor.Orange:
                return Images.Chamelon_Orange;
        }
    }

    function getImageTucan(): String {
        switch (color) {
            case PlayerColor.Blue:
                return Images.Tucan_Blue;
            case PlayerColor.Orange:
                return Images.Tucan_Orange;
        }
    }

    return <div css={outbox}>
        <div css={animals}>
        </div>
        <div css={animals}>
            <div css={() => { return inHover ? marked : boardStyle }} onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)} style={{ backgroundImage: `url(${getImageChamelon()})` }} />
            <div css={() => { return inHover ? marked : boardStyle }} onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)} style={{ backgroundImage: `url(${getImageTucan()})` }} />
        </div>
    </div>
}

export {
    PlayerBoard
};


const animals = css`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
`
const outbox = css`
    position: absolute;
    display: inline-grid;
    height: 100%;
    width: 100%;
  
`

const marked = css`
    position: relative;
    display: inline-grid;
    height: 50%;
    width: 50%;
    filter: invert(100%); 
    background-size: contain;
    background-repeat: no-repeat;
`

const boardStyle = css`
    position: relative;
    display: inline-grid;
    height: 50%;
    width: 50%;
    background-size: contain;
    background-repeat: no-repeat;
`


