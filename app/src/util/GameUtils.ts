import { Mosquito } from "@gamepark/mosquito-show/material/MosquitoEffect"
import { getActivePlayerState } from "@gamepark/mosquito-show/utils/GameUtils"
import { getSelectedMosquito } from "@gamepark/mosquito-show/utils/PlayerBoardUtils"
import LocalGameView from "src/LocalGameView"

export function canSelect(state: LocalGameView): boolean {
  if (getActivePlayerState(state)?.chameleonMustMove) {
    return false
  } else if (getActivePlayerState(state) !== undefined && getActivePlayerState(state)!.eatenMosquitos.length > 0
    && (getActivePlayerState(state)!.selectedMosquitoIndex === undefined || !(getSelectedMosquito(state) === Mosquito.Blue || getSelectedMosquito(state) === Mosquito.Red))) {
    return false
  }
  return true
}