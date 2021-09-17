import Effect from "../fields/Effect"
import { getActivePlayerState } from "../GameState"
import GameView from "../GameView"
import PlayerColor from "../PlayerColor"
import MoveType from "./MoveType"

type PlayMosquitoEffect = {
  type: typeof MoveType.PlayMosquitoEffect
  selectedEffect: Effect
}
 
export default PlayMosquitoEffect
 
export const playMosquitoEffectMove = (selectedEffect: Effect): PlayMosquitoEffect => ({
    type: MoveType.PlayMosquitoEffect, selectedEffect
})
 
export const playMosquitoEffect = (move: PlayMosquitoEffect, state:  GameView): void => {
    if(state.selectedAnimalId == 3 || state.selectedAnimalId == 4){
        const activePlayerState = getActivePlayerState(state)
        if(activePlayerState !== undefined && activePlayerState.chameleonMoved){
          activePlayerState.chameleonMoved = false;

          if(state.activePlayer === PlayerColor.Blue){
            state.activePlayer = PlayerColor.Orange 
            } else if(state.activePlayer === PlayerColor.Orange){
                state.activePlayer = PlayerColor.Blue 
            }
        state.selectedAnimalId = undefined
        // activePlayerState.availableMosquitoEffects = [];
        }
      }
    // if(state.activePlayer === PlayerColor.Blue){
    //     state.activePlayer = PlayerColor.Orange 
    // } else if(state.activePlayer === PlayerColor.Orange){
    //     state.activePlayer = PlayerColor.Blue 
    // }
    // state.selectedAnimalId = undefined
} 