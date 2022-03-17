import { Action } from "@gamepark/rules-api"
import Animal from "../animals/Animal"
import GameState from "../GameState"
import GameView from "../GameView"
import { Move, MoveType } from "../moves"
import PlayerColor from "../PlayerColor"
import { canMoveAnimal } from "./AnimalUtils"
import { mosquitoToReveal } from "./BoardUtils"

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

export function gameEndGolden(game: GameState | GameView) {
  if (getActivePlayerState(game)!.goldenMosquitos >= 9) {
    delete game.activePlayer
  }
}

export function gameEndBlock(game: GameState | GameView) {
  if (!canMoveAnimal(game, Toucan) && !canMoveAnimal(game, Chameleon)) {
    delete game.activePlayer
  }
}

export function endOfTurn(game: GameState | GameView) {
  if (game.activePlayer) {
    if (!getActivePlayerState(game)!.chameleonMustMove && !getActivePlayerState(game)!.pendingToucanEat.length && !getActivePlayerState(game)!.eatenMosquitos.length && !mosquitoToReveal(game)) {
      if (!game.players.some(player => player.skippedTurn)) {
        game.turnOver = true
      }
      if (getActivePlayerState(game)?.animalForcedToMove) {
        if (!canMoveAnimal(game, getActivePlayerState(game)!.animalForcedToMove!)) {
          if (getActivePlayerState(game)?.skippedTurn) {
            delete getActivePlayerState(game)!.animalForcedToMove
            delete getActivePlayerState(game)!.skippedTurn
            game.turnOver = true
          }
        }
      }
    }
  }
}

export function isOver(state: GameState | GameView): boolean {
  return state.activePlayer === undefined
}

export function canUndo(state: GameState | GameView, action: Action<Move, PlayerColor>, consecutiveActions: Action<Move, PlayerColor>[]): boolean {
  if (isOver(state)) return false
  if (consecutiveActions.length) {
    return false
  }
  switch (action.move.type) {
    case MoveType.Eat:
      if (action.move.revealToken) {
        return false
      }
      break
  }
  if (action.consequences.find(consequence => consequence.type === MoveType.Eat && consequence.revealToken)) {
    return false
  }
  if (action.consequences.find(consequence => consequence.type === MoveType.ChangeActivePlayer)) {
    return false
  }
  return true
}
