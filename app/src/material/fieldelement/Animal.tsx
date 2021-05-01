/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AnimalType from '@gamepark/mosquito-show/animals/AnimalType';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type AnimalProp = {
    figure: AnimalType
}

const Animal: FunctionComponent<AnimalProp> = ({ figure }: AnimalProp) => {

    function getAnimal() {
        if (figure === AnimalType.Chameleon) {
            return <div css={boardStyle} style={{ backgroundImage: `url(${Images.Chamelon})` }} />
        } else if (figure === AnimalType.Toucan) {
            return <div css={boardStyle} style={{ backgroundImage: `url(${Images.blueMosquito})` }} />
        }
        return <div/>
    }

    return (
        getAnimal()
    )
}

export {
    Animal
};

const boardStyle = css`
    position: relative;
    display: inline-grid;
    height: 100%;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
`

