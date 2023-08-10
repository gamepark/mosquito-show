/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ButtonHTMLAttributes, FC } from 'react'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return <button css={style} {...props}><span
    css={spanBorder}> {children}</span></button>
}

const style = css`
  background-color: rgba(255,255,255,0.8);
  padding: 0.2em 0.4em;
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
  color: rgba(0,0,0,1);
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: 0 0 0.1em rgba(255,255,255,0.8) inset, 0em 0.2em 0.1em rgba(0, 0, 0, 1);
  outline: 0;
  border-style: none;
  border-radius: 0.5em;
  margin-top: 0.8em;

  &:active {
    box-shadow: 0 0 0.1em rgba(255,255,255,1) inset;
    margin-top: 0.8em;
  }

  &:disabled {
    filter: grayscale();
    cursor: auto;
  }

`

const spanBorder = css`
  color: rgba(0,0,0,1);
  margin: 0 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10%;
`

export default Button