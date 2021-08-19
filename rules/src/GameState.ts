import GameBoard from './GameBoard';
import PlayerColor from './PlayerColor';
import PlayerState from './PlayerState';

/**
 * In here, you describe what a GameState will look like at any time during a game.
 */
type GameState = {
  players: PlayerState[],
  activePlayer : PlayerColor,
  board: GameBoard
}

export function getActivePlayerState(state : GameState) {
  for (let i = 0; i < state.players.length; i++) {
    const currentPlayerState = state.players[i];
    if(currentPlayerState.color == state.activePlayer)
    return currentPlayerState
  }
  return undefined
}

export default GameState