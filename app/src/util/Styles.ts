import { css } from '@emotion/react';

export const screenRatio = 16 / 9;

export const boardGap = 1;
export const boardHeight = 90;
export const boardWidthReduction = 1.06;
export const boardWidth = boardHeight / screenRatio * boardWidthReduction;

export const playerWidth = (100 - 90 / screenRatio) / 2 - 5.5;

export const playerBoardWidth = playerWidth * 100 / boardWidth;
export const playerBoardHeight = 22 * 100 / boardHeight;

export const playerBoardRatio = playerBoardWidth / playerBoardHeight;

export const playerColorBlue = '#3e7ad4'
export const playerColorOrange = '#eb6d41'

export const popupBackgroundStyle = css`
  position: fixed;
  top: -100%;
  bottom: -100%;
  left: -100%;
  right: -100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`

export const popupFixedBackgroundStyle = css`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`

export const popupOverlayStyle = css`
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transition: all .5s ease;
`
export const showPopupOverlayStyle = css`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`
export const hidePopupOverlayStyle = (boxTop: number, boxLeft: number) => css`
  top: ${boxTop}%;
  left: ${boxLeft}%;
  width: 0;
  height: 0;
  overflow: hidden;
`

export const popupStyle = css`
  position: absolute;
  text-align: center;
  max-height: 70%;
  z-index: 102;
  border-radius: 1em;
  box-sizing: border-box;
  align-self: center;
  padding: 2%;
  margin: 0 2%;
  outline: none;
  box-shadow: 1em 2em 2.5em -1.5em hsla(0, 0%, 0%, 0.2);
  border-radius: 40em 3em 40em 3em/3em 40em 3em 40em;

  &:hover {
    box-shadow: 2em 4em 5em -3em hsla(0, 0%, 0%, .5);
  }

  & > h2 {
    font-size: 5em;
    margin: 0;
    letter-spacing: 0.04em;
  }

  & > p {
    font-size: 4em;
    margin: 2% 0;
  }

  & > button {
    font-size: 4em;
  }
`

export const popupPosition = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const popupLightStyle = css`
  background-color: #e9e9e9;
  color: #082b2b;
  border: solid 1em #082b2b;
`

export const popupDarkStyle = css`
  background-color: #082b2b;
  color: #d4f7f7;
  border: solid 1em #d4f7f7;
`
export const closePopupStyle = css`
  position: relative;
  float: right;
  text-align: center;
  margin-top: -2%;
  margin-right: -0%;
  font-size: 4em;

  &:hover {
    cursor: pointer;
    color: #26d9d9;
  }
`