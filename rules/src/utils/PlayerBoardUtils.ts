import GameState from "../GameState";
import GameView from "../GameView";
import { Mosquito } from "../material/MosquitoEffect";
import PlayerState from "../PlayerState";
import { getActivePlayerState } from "./GameUtils";

export function getSelectedMosquito(state: GameState | GameView): Mosquito | undefined {
    const activePlayer = getActivePlayerState(state);
    return getSelectedMosquitoFromPlayer(activePlayer)
}

export function getSelectedMosquitoFromPlayer(player?: PlayerState): Mosquito | undefined {
    return player === undefined ? undefined : player.eatenMosquitos[player.selectedMosquitoIndex!]
}

export function getSelectedMosquitoByIndex(state: GameState | GameView, index?: number): Mosquito | undefined {
    const activePlayer = getActivePlayerState(state);
    return getSelectedMosquitoFromPlayerByIndex(activePlayer, index)
}

export function getSelectedMosquitoFromPlayerByIndex(player?: PlayerState, index?: number): Mosquito | undefined {
    return player === undefined || index === undefined ? undefined : player.eatenMosquitos[index]
}