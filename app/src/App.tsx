/** @jsxImportSource @emotion/react */
import GameView from '@gamepark/mosquito-show/GameView'
import {Menu, useGame} from '@gamepark/react-client'
import {Header} from '@gamepark/react-components'
import {useEffect, useState} from 'react'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import GameDisplay from './GameDisplay'
import useHeaderText from './useHeaderText'

export default function App() {
  const game = useGame<GameView>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed
  const headerText = useHeaderText(game, loading)
  return (
    <DndProvider options={HTML5ToTouch}>
      {game && <GameDisplay game={game}/>}
      <Header text={headerText}/>
      <Menu/>
    </DndProvider>
  )
}