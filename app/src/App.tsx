/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {FullscreenDialog, Menu, useGame} from '@gamepark/react-client'
import {Header, ImagesLoader, LoadingScreen} from '@gamepark/react-components'
import {useEffect, useState} from 'react'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import GameDisplay from './GameDisplay'
import HeaderText from './HeaderText'
import LocalGameView from './LocalGameView'
import Images from './material/Images'
import MosquitoShowBox from './material/logo.png'
//import ImagesLoader from './util/ImagesLoader';


export default function App() {
  const game = useGame<LocalGameView>()

  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])

  const loading = !game || isImagesLoading || isJustDisplayed
  return (
    <DndProvider options={HTML5ToTouch}>
      <LoadingScreen display={loading} gameBox={MosquitoShowBox} author={['Bruno Cathala', 'Andrea Mainini']} artist="Camille
    Chaussy" publisher="Origames" developer="smeepit" css={css`font-weight: normal;
        letter-spacing: 0.15em;`}/>
      <Header><HeaderText loading={loading} game={game}/></Header>
      {!loading && <GameDisplay game={game!}/>}
      <ImagesLoader images={Object.values(Images)} onImagesLoad={() => setImagesLoading(false)}/>
      <Menu/>
      <FullscreenDialog/>
    </DndProvider>
  )
}