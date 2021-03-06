/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { default as Effect, default as EffectType } from '@gamepark/mosquito-show/fields/Effect';
import MoveType from '@gamepark/mosquito-show/moves/MoveType';
import { usePlay } from '@gamepark/react-client';
import { FunctionComponent } from 'react';
import { Images } from '../Images';

type TokenProps = {
    effect: Effect
    effectIndex: number
}

const Token: FunctionComponent<TokenProps> = ({ effect, effectIndex }: TokenProps) => {
    const play = usePlay();

    function playEffect() {
        play({ type: MoveType.PlayMosquitoEffect, selectedEffectIndex: effectIndex, startMosquitoEffectFieldId: -1, targetMosquitoEffectFieldId: -1 });
    }

    return (
        <div css={tokenStyle} style={{ backgroundImage: getEffectImageUrl(effect) }} onClick={() => playEffect()}></div>
    )

    function getEffectImageUrl(effect: EffectType) {
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
    }
}

export {
    Token
};

const tokenStyle = css`
    position: relative;
    display: inline-grid;
    height: 50%;
    width: 50%;
    background-size: contain;
    background-repeat: no-repeat;
`