/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import EffectType from '@gamepark/mosquito-show/fields/Effect';
import MosquitoEffectField from '@gamepark/mosquito-show/fields/MosquitoEffectField';
import GameView from '@gamepark/mosquito-show/GameView';
import MoveType from '@gamepark/mosquito-show/moves/MoveType';
import { usePlay } from '@gamepark/react-client';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type EffectProps = {
    mosquitoEffectField : MosquitoEffectField
    state: GameView
}

const Effect: FunctionComponent<EffectProps> = ({ state, mosquitoEffectField }: EffectProps) => {
    const play = usePlay()
    
    function chooseEffect(id: number) {
        play({ type: MoveType.Eat, mosquitoEffectFieldId: id })
    }

    function possibleEffectFields() {
        var possibleEffectFields = state.possibleEffectFields
        if (possibleEffectFields !== undefined) {
            for (var possibleEffectFieldId of possibleEffectFields) {
                if ( possibleEffectFieldId === mosquitoEffectField.id) {
                    if(mosquitoEffectField.effects.length>0){
                        return <div>
                                <div css={tokenPosition(mosquitoEffectField.id)} style={{ backgroundImage: getEffectImageUrl(mosquitoEffectField.effects[mosquitoEffectField.effects.length-1]) }}></div>
                                <div css={highlightEffectPosition(mosquitoEffectField.id)} onClick={() => { chooseEffect(mosquitoEffectField.id) }}></div>
                            </div>
                    }
                }
            }
        }
        if(mosquitoEffectField.effects.length>0){
            return <div css={tokenPosition(mosquitoEffectField.id)} style={{ backgroundImage: getEffectImageUrl(mosquitoEffectField.effects[mosquitoEffectField.effects.length-1]) }}></div>
        }
        return <div/>
    }
    return (
        possibleEffectFields()
    )

    function getEffectImageUrl(effect : EffectType){
        if(effect.back === 1){
            return `url(${Images.WaterlillyFlower})`
        } else {
            if(effect.revealed){
                switch (effect.front) {
                    case 1:
                        return `url(${Images.GreyMosquito})`
                    case 2:
                        return `url(${Images.BlueMosquito})`
                    case 3:
                        return `url(${Images.RedMosquito})`
                    case 4:
                        return `url(${Images.WhiteMosquito})`
                    case 5:
                        return `url(${Images.GoldenMosquito})`
                }
                return undefined
            } else{
                return `url(${Images.Waterlilly})`
            }
        }
    }

    // function revealWaterlilly(){
    //     if(mosquitoEffectField.effects.length>0 && !mosquitoEffectField.effects[mosquitoEffectField.effects.length-1].revealed){
    //         mosquitoEffectField.effects[mosquitoEffectField.effects.length-1].revealed = mosquitoEffectField.effects[mosquitoEffectField.effects.length-1].back === 2
    //     }
    // }
}

export {
    Effect
};

// const boardStyle = css`
//     position: relative;
//     display: inline-grid;
//     background-size: contain;
//     background-repeat: no-repeat;
//     border-radius: 50%;
//     border: none;
//     background: url(${Images.BlueMosquito});
//     background-position: center;
//     background-size: cover;
// `
const highlightEffectPosition = (id: number) => css`
height: 11%;
width: 11%;
position: absolute;
left: ${31.5 + (((id % 7) - (Math.floor(id / 7))) * 13)}%;
top: ${-7.5 + ((Math.floor(id / 7)) * 25.5)}%; 
border-radius: 50%;
border: 5px solid red; 
background-position: center;
background-size: cover;
`
const tokenPosition = (id: number) => css`
height: 10%;
width: 10%;
position: absolute;
left: ${32 + (((id % 7) - (Math.floor(id / 7))) * 13)}%;
top: ${-7 + ((Math.floor(id / 7)) * 25.5)}%; 
border-radius: 50%;
border: none;
background-position: center;
background-size: cover;
`
//   left: ${5 + (((id - 1) % 4) * 25.5)}%;
//   top: ${5 + ((Math.floor((id - 1) / 4)) * 25.5)}%; 