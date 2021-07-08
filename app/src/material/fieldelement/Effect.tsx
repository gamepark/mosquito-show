/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MosquitoEffectField from '@gamepark/mosquito-show/fields/MosquitoEffectField';
import GameView from '@gamepark/mosquito-show/GameView';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type EffectProps = {
    mosquitoEffectField : MosquitoEffectField
    state: GameView
}

const Effect: FunctionComponent<EffectProps> = ({ state, mosquitoEffectField }: EffectProps) => {
    // const play = usePlay()

    function possibleEffectFields() {
        var possibleEffectFields = state.possibleEffectFields
        if (possibleEffectFields != undefined) {
            for (var val of possibleEffectFields) {
                if (val == mosquitoEffectField.id) {
                    return <div css={highlightEffectPosition(mosquitoEffectField.id)} ></div>
                }
            }
        }
        if(mosquitoEffectField.effects.length>0){
            var effect = mosquitoEffectField.effects[0];
            if(effect.back == 1){
                return <div css={tokenPosition(mosquitoEffectField.id)} style={{ backgroundImage: `url(${Images.WaterlillyFlower})` }}></div>
            } else {
                var effectImageUrl
                switch (effect.front) {
                    case 1:
                        effectImageUrl = `url(${Images.GreyMosquito})`
                        break;
                    case 2:
                        effectImageUrl = `url(${Images.BlueMosquito})`
                        break;
                    case 3:
                        effectImageUrl = `url(${Images.RedMosquito})`
                        break;
                    case 4:
                        effectImageUrl = `url(${Images.WhiteMosquito})`
                        break;
                    case 5:
                        effectImageUrl = `url(${Images.GoldenMosquito})`
                        break;
                }
                return <div css={tokenPosition(mosquitoEffectField.id)} style={{ backgroundImage: effectImageUrl }}></div>
            }
        }
        return <div/>
    }
    return (
        possibleEffectFields()
    )
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
    height: 13%;
    width: 13%;
    position: absolute;
    left: ${5 + (((id - 1) % 4) * 25.5)}%;
    top: ${5 + ((Math.floor((id - 1) / 4)) * 25.5)}%; 
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