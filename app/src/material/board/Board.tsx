/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';



const Board: FunctionComponent<any> = () => {
    return (
        <div css={boardStyle} style={{backgroundImage: `url(${Images.BoardFront})`}}/> 
    )
}
 
export {
    Board
};

const boardStyle = css`
    z-index: 10;
    position: relative;
    display: grid;
    height: 100%;
    width: 100%;
    image-rendering: -webkit-optimize-contrast;
    background-size: 100%;
`

