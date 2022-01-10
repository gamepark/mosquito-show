/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { ButtonHTMLAttributes } from 'react'

export default function Button({children, color, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button css={style(color!)} {...props}><span/><span/><span/><span/>{children}</button>
}

const animateTop = keyframes`
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
`

const animateRight = keyframes`
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
`

const animateBottom = keyframes`
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
`

const animateLeft = keyframes`
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
`

const style = (color: string) => css`
  background-color: rgba(0, 0, 0, 0);
  padding: 0.1em 0.2em;
  margin: 0;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  cursor: pointer;
  overflow: hidden;
  color: ${color};
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  outline: 0;
  border-style: none;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${color};
    opacity: 0.15;
    -webkit-transition: .2s opacity ease-in-out;
    transition: .2s opacity ease-in-out;
  }

  &:hover:before {
    opacity: 0.3;
  }

  & > span {
    position: absolute;
  }

  & > span:nth-of-type(1) {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: -webkit-gradient(linear, right top, left top, from(rgba(8, 43, 43, 0)), to(${color}));
    background: linear-gradient(to left, rgba(8, 43, 43, 0), ${color});
    -webkit-animation: 2s ${animateTop} linear infinite;
    animation: 2s ${animateTop} linear infinite;
  }

  & > span:nth-of-type(2) {
    top: 0;
    right: 0;
    height: 100%;
    width: 2px;
    background: -webkit-gradient(linear, left bottom, left top, from(rgba(8, 43, 43, 0)), to(${color}));
    background: linear-gradient(to top, rgba(8, 43, 43, 0), ${color});
    -webkit-animation: 2s ${animateRight} linear -1s infinite;
    animation: 2s ${animateRight} linear -1s infinite;
  }

  & > span:nth-of-type(3) {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: -webkit-gradient(linear, left top, right top, from(rgba(8, 43, 43, 0)), to(${color}));
    background: linear-gradient(to right, rgba(8, 43, 43, 0), ${color});
    -webkit-animation: 2s ${animateBottom} linear infinite;
    animation: 2s ${animateBottom} linear infinite;
  }

  & > span:nth-of-type(4) {
    top: 0;
    left: 0;
    height: 100%;
    width: 2px;
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(8, 43, 43, 0)), to(${color}));
    background: linear-gradient(to bottom, rgba(8, 43, 43, 0), ${color});
    -webkit-animation: 2s ${animateLeft} linear -1s infinite;
    animation: 2s ${animateLeft} linear -1s infinite;
  }
`