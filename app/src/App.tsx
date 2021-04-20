/** @jsxImportSource @emotion/react */
import { DndProvider } from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import ImagesLoader from './util/ImagesLoader'
import { Images} from './material/Resources';
import { useState } from 'react'
import { LoadingScreen } from '@gamepark/react-components'
import { FullscreenDialog, Menu } from '@gamepark/react-client';
import MosquitoShowBox from './material/logo.png';
import { css } from '@emotion/react';


export default function App() {
  const [isImagesLoading, setImagesLoading] = useState(true);
  const loading = isImagesLoading
  return (
    <DndProvider options={HTML5ToTouch}>
    <LoadingScreen display={loading} gameBox={ MosquitoShowBox } author="Igor Polouchine" artist={["Claire Wendling", "David Cochard"]} publisher="Origames" css={ css`font-weight:normal; letter-spacing: 0.15em;` }  />
    {!loading}
    <ImagesLoader images={Object.values(Images)} onImagesLoad={() => setImagesLoading(false)}/>
    <Menu/>
    <FullscreenDialog/>
    </DndProvider>
  )
}