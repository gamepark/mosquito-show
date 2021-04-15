/** @jsxImportSource @emotion/react */
import { DndProvider } from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'


export default function App() {
  
  return (
    <DndProvider options={HTML5ToTouch}>
      
    </DndProvider>
  )
}