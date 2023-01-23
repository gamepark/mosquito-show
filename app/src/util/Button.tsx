/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { ButtonHTMLAttributes, FC } from 'react'
import { playerColorBlue, playerColorOrange } from '../styles'

type Props = {
  playerColor: PlayerColor
}

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({ children, playerColor, ...props }) => {
  return <button css={style(playerColor == PlayerColor.Blue ? playerColorBlue : playerColorOrange)} {...props}><span
    css={spanBorder(playerColor || PlayerColor.Blue)}> {children}</span></button>
}

const style = (color: string) => css`
  background-color: ${color === '#FFFFFF' ? '#f0c89b' : color === '#49cf00' ? '#61a420' : color};
  padding: 0.2em 0.4em;
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
  color: black;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: ${color === '#FFFFFF' ? '0 0 0.1em rgba(0,0,0,0.8) inset, 0em 0.2em 0.1em rgba(0, 0, 0, 1)' : '0 0 0.1em rgba(255,255,255,0.8) inset, 0em 0.2em 0.1em rgba(0, 0, 0, 1)'};
  outline: 0;
  border-style: none;
  border-radius: 0.5em;

  &:active {
    box-shadow: 0 0 0.1em white inset;
    margin-top: 0.15em;
  }

  &:disabled {
    filter: grayscale();
    cursor: auto;
  }

`

const spanBorder = (color: PlayerColor) => css`
  color: black;
  margin: 0 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10%;
`

export default Button