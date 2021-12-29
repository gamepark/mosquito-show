import { Mosquito } from "@gamepark/mosquito-show/material/MosquitoEffect"
import { getActivePlayerState } from "@gamepark/mosquito-show/MosquitoShow"
import LocalGameView from "src/LocalGameView"

export function canSelect(state: LocalGameView): boolean {
  if (getActivePlayerState(state)?.chameleonMustMove) {
    return false
  } else if (getActivePlayerState(state) !== undefined && getActivePlayerState(state)!.eatenMosquitos.length > 0 
    && (getActivePlayerState(state)!.selectedMosquito == undefined || !(getActivePlayerState(state)!.selectedMosquito == Mosquito.Blue || getActivePlayerState(state)!.selectedMosquito == Mosquito.Red))) {
    return false
  }
  return true
}