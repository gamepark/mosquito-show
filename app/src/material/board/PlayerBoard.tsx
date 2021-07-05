/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import MoveType from '@gamepark/mosquito-show/moves/MoveType';
import PlayerColor from '@gamepark/mosquito-show/PlayerColor';
import PlayerState from '@gamepark/mosquito-show/PlayerState';
import { usePlay } from '@gamepark/react-client';
import { FunctionComponent, useState } from 'react';
import { Images } from '../Resources';

type PlayerBoardProps = {
    gameboard?: GameBoard | undefined;
    playerstate?: PlayerState[] | undefined;
    color: PlayerColor;
}

const PlayerBoard: FunctionComponent<PlayerBoardProps> = ({ color, gameboard, playerstate }: PlayerBoardProps) => {
    const play = usePlay();
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

    function playMove(tucan: boolean, chamelon: boolean) {

        setTucanSelected(tucan);
        setChamelonSelected(chamelon);

        if (tucan) {
            let id = color == PlayerColor.Orange ? 1 : 2;
            play({ type: MoveType.ChooseAnimal, selectAnimalId: id, color: PlayerColor });
        } else if (chamelon) {
            let id = color == PlayerColor.Orange ? 3 : 4;
            play({ type: MoveType.ChooseAnimal, selectAnimalId: id, color: PlayerColor });
        }
        // playerstate?.filter[color].

    }

    function chamelonVisible() {
        if (gameboard != undefined && gameboard.animalfield != undefined) {
            for (let i = 0; i < gameboard.animalfield.length; i++) {
                let field = gameboard.animalfield[i]
                if((field.animalId == 4 && color == PlayerColor.Blue)|| (field.animalId == 3 && color == PlayerColor.Orange)){
                    return false;
                }
            }
        }
        return true;
    }

    function tucanVisible() {
        if (gameboard != undefined && gameboard.animalfield != undefined) {
            for (let i = 0; i < gameboard.animalfield.length; i++) {
                let field = gameboard.animalfield[i]
                if((field.animalId == 2 && color == PlayerColor.Blue)|| (field.animalId == 1 && color == PlayerColor.Orange)){
                    return false;
                }
            }
        }
        return true;
    }

    return <div css={outbox}>
        <div css={animals}>
        </div>
        <div css={animals}>
            {chamelonVisible() && <div css={() => { return selectChamelon ? marked : boardStyle }} onClick={() => { playMove(false, !selectChamelon); }} style={{ backgroundImage: `url(${getImageChamelon()})` }} />}
            {tucanVisible() && <div css={() => { return selectTucan ? marked : boardStyle }} onClick={() => { playMove(!selectTucan, false) }} style={{ backgroundImage: `url(${getImageTucan()})` }} />}
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


