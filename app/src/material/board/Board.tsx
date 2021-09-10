/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameView from '@gamepark/mosquito-show/GameView';
import { FunctionComponent } from 'react';
import { Animal } from '../fieldelement/Animal';
import { Effect } from '../fieldelement/Effect';
import { Images } from '../Images';

type BoardProps = {
    state: GameView
}

const Board: FunctionComponent<BoardProps> = ({ state }: BoardProps) => {
    // const play = usePlay();
    const animals = []
    const effects = []

    for (var id = 1; id <= 16; id++) {
        animals.push(
            <Animal id={id} state={state}></Animal>
        )      
    }
        
    for (var i = 0; i <state.board.mosquitoFields.length; i++) {
        effects.push(
            <Effect mosquitoEffectField={state.board.mosquitoFields[i]} state={state}></Effect>
        )
    }
    
    return (
        <div css={boardStyle} style={{ backgroundImage: `url(${Images.BoardFront})` }}>
            {animals}
            {effects}
        </div>
    )
}

export {
    Board
};

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