import { MoveType } from "."
import GameState from "../GameState"
import GameView from "../GameView"
import { getActivePlayerState } from "../utils/GameUtils"

export type SkipTurn = {
    type: typeof MoveType.SkipTurn
}

export const skipTurnMove = (): SkipTurn => ({
    type: MoveType.SkipTurn
})

export const skipTurn = (game: GameState | GameView, move: SkipTurn): void => {
    getActivePlayerState(game)!.skippedTurn = true
}