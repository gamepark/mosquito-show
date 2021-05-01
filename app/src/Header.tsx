import { css } from '@emotion/react';



export default function Header() {


  return (
    <header css={style}>
      <h1 css={titleStyle}>{"Just a text"}</h1>
    </header>
  )
}


const style = css`
  position: absolute;
  display: flex;
  width: 100%;
  height: 7em;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 1s ease-in;
`

const titleStyle = css`
  flex-grow: 1;
  flex-shrink: 0;
  transition: color 1s ease-in;
  padding: 0.25em;
  margin: 0;
  line-height: 1.25;
  font-size: 4em;
  letter-spacing: 0.03em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: normal;
  display: flex;
  justify-content: center;
`