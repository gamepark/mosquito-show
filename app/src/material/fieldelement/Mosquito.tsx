/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { Images } from '../Resources';

type MosquitoProp = {
    column: number
    row: number
}

const Mosquito: FunctionComponent<MosquitoProp> = ({column, row}:MosquitoProp) => {
    
    function test() {
        if (column === 3 && row === 3 ) {
            return <div css={boardStyle}></div>
        } else {
            return <div />;
        }

    }
    return (
        test()  
    )
}
 
export {
    Mosquito
};

const boardStyle = css`
    position: relative;
    display: inline-grid;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 50%;
    border: none;
    background: url(${Images.BlueMosquito});
    background-position: center;
    background-size: cover;
`

