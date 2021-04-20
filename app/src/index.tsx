import {css, Global} from '@emotion/react'
import MosquitoShow from '@gamepark/mosquito-show/MosquitoShow'
import {MosquitoShowOptionsDescription} from '@gamepark/mosquito-show/MosquitoShowOptions'
import MosquitoShowView from '@gamepark/mosquito-show/MosquitoShowView'
import {GameProvider, setupTranslation} from '@gamepark/react-client'
import normalize from 'emotion-normalize'
import {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'
import { Images } from './material/Resources';

setupTranslation(translations)

const style = css`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: 'Oswald', "Roboto Light", serif;
    font-size: 1vh;
    @media (max-aspect-ratio: 16/9) {
      font-size: calc(9vw / 16);
    }
  }

  #root {
    position: absolute;
    height: 100vh;
    width: 100vw;
    user-select: none;
    overflow: hidden;
    background-color: white;
    background-size: cover;
    background-position: center;
    color: #eee;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }

    background-image: url(${Images.BoardFront});
  }
`

ReactDOM.render(
  <StrictMode>
    <GameProvider game="my-board-game" Rules={MosquitoShow} RulesView={MosquitoShowView} optionsDescription={MosquitoShowOptionsDescription}>
      <App/>
    </GameProvider>
    <Global styles={[normalize, style]}/>
  </StrictMode>,
  document.getElementById('root')
)
