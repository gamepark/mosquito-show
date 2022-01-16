import Animal from "../animals/Animal"
import GameState from "../GameState"
import GameView from "../GameView"
import PlayerColor from "../PlayerColor"
import { canMoveAnimal } from "./AnimalUtils"
import { mosquitoToReveal } from "./BoardUtils"

const { Orange, Blue } = PlayerColor
const { Toucan, Chameleon } = Animal

export function getActivePlayerState(state: GameState | GameView) {
  return getPlayerState(state, state.activePlayer)
}

export function getPlayerState(state: GameState | GameView, playercolor: PlayerColor | undefined) {
  return state.players.find(player => player.color === playercolor)
}

export function isPlacementPhase(game: GameState | GameView) {
  return game.players.some(player => !player.toucan || !player.chameleon)
}

export function endOfTurn(game: GameState | GameView) {
  if (getActivePlayerState(game)!.goldenMosquitos >= 9) {
    delete game.activePlayer
  } else if (!getActivePlayerState(game)!.chameleonMustMove && !getActivePlayerState(game)!.pendingToucanEat.length && !getActivePlayerState(game)!.eatenMosquitos.length && !mosquitoToReveal(game)) {
    if (!game.players.some(player => player.skippedTurn)) {
      game.activePlayer = getActivePlayerState(game)!.color === Blue ? Orange : Blue
    }
    if (!canMoveAnimal(game, Toucan) && !canMoveAnimal(game, Chameleon)) {
      delete game.activePlayer
    } else if (getActivePlayerState(game)?.animalForcedToMove) {
      if (!canMoveAnimal(game, getActivePlayerState(game)!.animalForcedToMove!)) {
        if (getActivePlayerState(game)?.skippedTurn) {
          delete getActivePlayerState(game)!.animalForcedToMove
          delete getActivePlayerState(game)!.skippedTurn
          game.activePlayer = getActivePlayerState(game)!.color === Blue ? Orange : Blue
        }
      }
    }
  }
}