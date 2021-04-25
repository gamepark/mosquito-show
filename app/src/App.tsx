/** @jsxImportSource @emotion/react */
import { DndProvider } from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import ImagesLoader from './util/ImagesLoader'
import { Images} from './material/Resources';
import { useEffect, useState } from 'react'
import { LoadingScreen } from '@gamepark/react-components'
import { FullscreenDialog, Menu} from '@gamepark/react-client';
import MosquitoShowBox from './material/logo.png';
import { css } from '@emotion/react';
// import GameState from '@gamepark/mosquito-show/GameState';
import { GameDisplay } from './GameDisplay'


export default function App() {
  // const game = useGame<GameState>()

  const [isJustDisplayed, setJustDisplayed] = useState(true);
  const [isImagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])

  const loading = isImagesLoading || isJustDisplayed
  return (
    <DndProvider options={HTML5ToTouch}>
    <LoadingScreen display={loading} gameBox={ MosquitoShowBox } author={["Bruno Cathala", "Andrea Mainini"]} artist="Camille Chaussy" publisher="Origames" css={ css`font-weight:normal; letter-spacing: 0.15em;` }  />
    {!loading && <GameDisplay/>}
    <ImagesLoader images={Object.values(Images)} onImagesLoad={() => setImagesLoading(false)}/>
    <Menu/>
    <FullscreenDialog/>
    </DndProvider>
  )
}