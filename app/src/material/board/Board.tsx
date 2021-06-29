/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Coordinates from '@gamepark/mosquito-show/fields/Coordinates';
import GameView from '@gamepark/mosquito-show/GameView';
import { FunctionComponent } from 'react';
import { Animal } from '../fieldelement/Animal';
import { Images } from '../Resources';

type BoardProps = {
    state: GameView | undefined;
}

const Board: FunctionComponent<BoardProps> = ({ state }: BoardProps) => {
    // const play = usePlay();


    const animals = []

    for (var id = 1; id <= 16; id++) {
            animals.push(
                <Animal id={id} state={state}></Animal>
            )      
    }


    return (
        <div css={boardStyle} style={{ backgroundImage: `url(${Images.BoardFront})` }}>
            {animals}
            {/* <div css={animalPosition({ x: 1, y: 1 })} style={{ backgroundImage: `url(${Images.Tucan_Blue})` }}></div>
            <div css={animalPosition({ x: 2, y: 1 })} style={{ backgroundImage: `url(${Images.Tucan_Blue})` }}></div>
            
            */}
            {/* <div css={animalPosition({x: 4,y: 1})}  style={{ backgroundImage: `url(${Images.Chamelon_Orange})`} }></div>
            <div css={animalPosition({x: 1,y: 2})}  style={{ backgroundImage: `url(${Images.Chamelon_Orange})`} }></div>
            <div css={animalPosition({x: 2,y: 2})}  style={{ backgroundImage: `url(${Images.Chamelon_Orange})`} }></div>
            <div css={animalPosition({x: 3,y: 2})}  style={{ backgroundImage: `url(${Images.Chamelon_Orange})`} }></div>
            <div css={animalPosition({x: 4,y: 2})}  style={{ backgroundImage: `url(${Images.Chamelon_Orange})`} }></div>
            <div css={animalPosition({x: 1,y: 3})}  style={{ backgroundImage: `url(${Images.Chamelon_Blue})`} }></div>
            <div css={animalPosition({x: 2,y: 3})}  style={{ backgroundImage: `url(${Images.Chamelon_Blue})`} }></div>
            <div css={animalPosition({x: 3,y: 3})}  style={{ backgroundImage: `url(${Images.Chamelon_Blue})`} }></div>
            <div css={animalPosition({x: 4,y: 3})}  style={{ backgroundImage: `url(${Images.Chamelon_Blue})`} }></div>
            <div css={animalPosition({x: 1,y: 4})}  style={{ backgroundImage: `url(${Images.Tucan_Orange})`} }></div>
            <div css={animalPosition({x: 2,y: 4})}  style={{ backgroundImage: `url(${Images.Tucan_Orange})`} }></div>
            <div css={animalPosition({x: 3,y: 4})}  style={{ backgroundImage: `url(${Images.Tucan_Orange})`} }></div>
            <div css={animalPosition({x: 4,y: 4})}  style={{ backgroundImage: `url(${Images.Tucan_Orange})`} }></div> */}


            <div css={tokenPosition({ x: 1, y: 1 })} style={{ backgroundImage: `url(${Images.BlueMosquito})` }}></div>
            <div css={tokenPosition({ x: 2, y: 1 })} style={{ backgroundImage: `url(${Images.GoldenMosquito})` }}></div>
            <div css={tokenPosition({ x: 3, y: 1 })} style={{ backgroundImage: `url(${Images.GreyMosquito})` }}></div>
            <div css={tokenPosition({ x: 1, y: 2 })} style={{ backgroundImage: `url(${Images.BlueMosquito})` }}></div>
            <div css={tokenPosition({ x: 2, y: 2 })} style={{ backgroundImage: `url(${Images.GoldenMosquito})` }}></div>
            <div css={tokenPosition({ x: 3, y: 2 })} style={{ backgroundImage: `url(${Images.GreyMosquito})` }}></div>
            <div css={tokenPosition({ x: 1, y: 3 })} style={{ backgroundImage: `url(${Images.BlueMosquito})` }}></div>
            <div css={tokenPosition({ x: 2, y: 3 })} style={{ backgroundImage: `url(${Images.GoldenMosquito})` }}></div>
            <div css={tokenPosition({ x: 3, y: 3 })} style={{ backgroundImage: `url(${Images.GreyMosquito})` }}></div>
        </div>
    )
}

export {
    Board
};

// const boardGrid = css`
//     display: grid;
//     grid-template-columns: 21% 6% 20% 6% 20% 6% 21%;
//     grid-template-rows: 21% 6% 20% 6% 20% 6% 21%;
// `

// const boardGrid = css`
//     display: grid;
//     grid-template-columns: 20% 8% 18% 8% 18% 8% 20%;
//     grid-template-rows: 20% 8% 18% 8% 18% 8% 20%;
// `

// const boardStyle = css`
//     position: relative;
//     display: grid;
//     height: 100%;
//     max-height: 100%;
//     width: 100%;
//     max-width: 100%;
//     background-size: contain;
//     background-repeat: no-repeat;
// `

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



const tokenPosition = (coords: Coordinates) => css`
  height: 10%;
  width: 10%;
  position: absolute;
  left: ${19 + ((coords.x - 1) * 25.7)}%;
  top: ${19 + ((coords.y - 1) * 25.5)}%; 
  border-radius: 50%;
  border: none;
  background-position: center;
  background-size: cover;
`;