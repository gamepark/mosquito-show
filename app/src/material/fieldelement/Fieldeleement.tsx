/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';



const Fieldelement: FunctionComponent<any> = () => {
    return (
        <div css={boardStyle} style={{backgroundImage: `url(${Images.BoardFront})`}}/> 
    )
}
 
export {
    Fieldelement
};

const boardStyle = css`
    position: relative;
    display: grid;
    height: 100%;
    max-height: 67.5%;
    width: 100%;
    max-width: 38%;
    background-size: contain;
`

