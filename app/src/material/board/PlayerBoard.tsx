/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameBoard from '@gamepark/mosquito-show/GameBoard';
import MoveType from '@gamepark/mosquito-show/moves/MoveType';
import PlayerColor from '@gamepark/mosquito-show/PlayerColor';
import PlayerState from '@gamepark/mosquito-show/PlayerState';
import { usePlay } from '@gamepark/react-client';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Images } from '../Images';
import { Token } from '../token/Token';

type PlayerBoardProps = {
    gameboard?: GameBoard | undefined
    playerstate?: PlayerState | undefined
    activePlayer: PlayerColor
}  & HTMLAttributes<HTMLDivElement>

const PlayerBoard: FunctionComponent<PlayerBoardProps> = ({ gameboard, playerstate, activePlayer,...props }: PlayerBoardProps) => {
    const play = usePlay()
    const [selectTucan, setTucanSelected] = useState(false)
    const [selectChamelon, setChamelonSelected] = useState(false)
    const token = []
    var color = playerstate?.color

    function getImageChamelon(): String {
        if (color !== undefined) {
            switch (color) {
                case PlayerColor.Blue:
                    return Images.Chamelon_Blue;
                case PlayerColor.Orange:
                    return Images.Chamelon_Orange;
            }
        }
        return "undefinedChameleon"
    }

    function getImageTucan(): String {
        if (color !== undefined) {
            switch (color) {
                case PlayerColor.Blue:
                    return Images.Tucan_Blue;
                case PlayerColor.Orange:
                    return Images.Tucan_Orange;
            }
        }
        return "undefinedTucan"
    }

    function playMove(tucan: boolean, chamelon: boolean) {
        if (color === activePlayer) {
            setTucanSelected(tucan);
            setChamelonSelected(chamelon);

            if (tucan) {
                let id = color === PlayerColor.Orange ? 1 : 2;
                play({ type: MoveType.ChooseAnimal, selectAnimalId: id, color: PlayerColor });
            } else if (chamelon) {
                let id = color === PlayerColor.Orange ? 3 : 4;
                play({ type: MoveType.ChooseAnimal, selectAnimalId: id, color: PlayerColor });
            }
        }

    }

    function chamelonVisible() {
        if (gameboard !== undefined && gameboard.animalFields !== undefined) {
            for (let i = 0; i < gameboard.animalFields.length; i++) {
                let field = gameboard.animalFields[i]
                if ((field.animalId === 4 && color === PlayerColor.Blue) || (field.animalId === 3 && color === PlayerColor.Orange)) {
                    return false;
                }
            }
        }
        return true;
    }

    function tucanVisible() {
        if (gameboard !== undefined && gameboard.animalFields !== undefined) {
            for (let i = 0; i < gameboard.animalFields.length; i++) {
                let field = gameboard.animalFields[i]
                if ((field.animalId === 2 && color === PlayerColor.Blue) || (field.animalId === 1 && color === PlayerColor.Orange)) {
                    return false;
                }
            }
        }
        return true;
    }

    if(playerstate !== undefined){
        for (var i = 0; i < playerstate.availableMosquitoEffects.length; i++) {
            token.push(
                <Token effect={playerstate.availableMosquitoEffects[i]} effectIndex={i}></Token>
                )      
            }
    }

    return <div css={outbox} {...props}>
        <div css={victorypointsRow}>
            <div css={tokenStyle} style={{ backgroundImage: `url(${Images.GoldenMosquito})` }}></div>
            <div css={victorypoints}> x </div>
            <div css={victorypoints}> {playerstate?.ownedGoldenMosquitos}</div>
        </div>
        <div css={tokens}>
            {token}
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

const tokenStyle = css`
    position: relative;
    display: inline-grid;
    height: 50%;
    width: 50%;
    background-size: contain;
    background-repeat: no-repeat;
`

const animals = css`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
`
const tokens = css`
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 100%;
`

const victorypointsRow = css`
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 100%;
`
const victorypoints = css`
    font-size: 70px;
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
