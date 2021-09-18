import GameBoard from './GameBoard';
import PlayerColor from './PlayerColor';
import PlayerState from './PlayerState';

/**
 * In here, you describe what a GameState will look like at any time during a game.
 */
type GameState = {
  players: PlayerState[],
  activePlayer : PlayerColor,
  board: GameBoard,
  mosquitoEffect: number
}

export function getActivePlayerState(state : GameState) {
  for (let i = 0; i < state.players.length; i++) {
    const currentPlayerState = state.players[i];
    if(currentPlayerState.color == state.activePlayer)
    return currentPlayerState
  }
  return undefined
}

export function switchPlayer(state : GameState){
  if(state.activePlayer === PlayerColor.Blue){
      state.activePlayer = PlayerColor.Orange 
  } else if(state.activePlayer === PlayerColor.Orange){
      state.activePlayer = PlayerColor.Blue 
  }
}

export default GameState