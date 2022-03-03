import GameState from "../GameState"
import GameView from "../GameView"
import { removeMosquitoFromPlayer } from "../utils/BoardUtils"
import { getActivePlayerState } from "../utils/GameUtils"
import { MoveType } from "./MoveType"
import { MoveView } from "./MoveView"

export type DiscardTokenFromPlayerBoard = {
    type: typeof MoveType.DiscardTokenFromPlayerBoard
}

export function isDiscardTokenFromPlayerBoardMove(move: MoveView): move is DiscardTokenFromPlayerBoard {
    return move.type === MoveType.DiscardTokenFromPlayerBoard
}

export const discardTokenFromPlayerBoardMove = (): DiscardTokenFromPlayerBoard => ({
    type: MoveType.DiscardTokenFromPlayerBoard
})

export const discardTokenFromPlayerBoard = (game: GameState | GameView, move: DiscardTokenFromPlayerBoard): void => {
    removeMosquitoFromPlayer(game, getActivePlayerState(game)!.selectedMosquitoIndex)
    game.handleMosquitoEffectOver = false
    delete getActivePlayerState(game)?.selectedMosquitoIndex
}