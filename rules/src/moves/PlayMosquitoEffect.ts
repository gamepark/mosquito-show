import { getActivePlayerState } from "../GameState"
import GameView from "../GameView"
import PlayerColor from "../PlayerColor"
import PlayerState from "../PlayerState"
import MoveType from "./MoveType"

type PlayMosquitoEffect = {
  type: typeof MoveType.PlayMosquitoEffect
  selectedEffectIndex: number
}
 
export default PlayMosquitoEffect
 
export const playMosquitoEffectMove = (selectedEffectIndex: number): PlayMosquitoEffect => ({
    type: MoveType.PlayMosquitoEffect, selectedEffectIndex
})
 
export const playMosquitoEffect = (move: PlayMosquitoEffect, state:  GameView): void => {
  const activePlayerState = getActivePlayerState(state)
  if(activePlayerState !== undefined){
    const selectedEffect = activePlayerState.availableMosquitoEffects.splice(move.selectedEffectIndex)[0]

    switch (selectedEffect.front) {
      case 1:
          handleGreyMosquitoEffect()
          break
      case 2:
          handleBlueMosquitoEffect()
          break
      case 3:
          handleRedMosquitoEffect()
          break
      case 4:
          handleWhiteMosquitoEffect()
          break
      case 5:
          handleGoldenMosquitoEffect(activePlayerState)
          break
    }


    // Chameleon  
    if(state.selectedAnimalId == 3 || state.selectedAnimalId == 4){
      if(activePlayerState.chameleonMoved){
        activePlayerState.chameleonMoved = false
        switchPlayerColor()
      }
    }
    // Toucan
    if(state.selectedAnimalId == 1 || state.selectedAnimalId == 2){
      if(activePlayerState.availableMosquitoEffects.length == 0){
        switchPlayerColor()
      }
    }
  }
    
  function switchPlayerColor(){
    if(state.activePlayer === PlayerColor.Blue){
      state.activePlayer = PlayerColor.Orange 
    } else if(state.activePlayer === PlayerColor.Orange){
      state.activePlayer = PlayerColor.Blue 
    }
    state.selectedAnimalId = undefined
  }
  
  function handleGreyMosquitoEffect() {
    throw new Error("Function not implemented.")
  }
  
  
  function handleBlueMosquitoEffect() {
    throw new Error("Function not implemented.")
  }
  
  
  function handleRedMosquitoEffect() {
    throw new Error("Function not implemented.")
  }
  
  
  function handleWhiteMosquitoEffect() {
    throw new Error("Function not implemented.")
  }
  
  
  function handleGoldenMosquitoEffect(activePlayerState : PlayerState) {
    activePlayerState.ownedGoldenMosquitos++
  }
}