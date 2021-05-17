/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import PlayerColor from '@gamepark/mosquito-show/PlayerColor';
import PlayerState from '@gamepark/mosquito-show/PlayerState';
import { FunctionComponent, useState } from 'react';
import { Images } from '../Resources';

type PlayerBoardProps = {
    gameboard?: GameBoard | undefined;
    playerstate?: PlayerState[] | undefined;
    color: PlayerColor;
}

const PlayerBoard: FunctionComponent<PlayerBoardProps> = ({ color , playerstate}: PlayerBoardProps) => {

    const [selectTucan, setTucanSelected] = useState(false);
    const [selectChamelon, setChamelonSelected] = useState(false);

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

    function play(tucan: boolean , chamelon: boolean){
        setTucanSelected(tucan); 
        setChamelonSelected(chamelon); 
    }

    return <div css={outbox}>
        <div css={animals}>
        </div>
        <div css={animals}>
            <div css={() => { return selectChamelon ? marked : boardStyle }} onClick={() => { play(false,!selectChamelon); }} style={{ backgroundImage: `url(${getImageChamelon()})` }} />
            <div css={() => { return selectTucan ? marked : boardStyle }} onClick={() => { play(!selectTucan,false)} } style={{ backgroundImage: `url(${getImageTucan()})` }} />
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


