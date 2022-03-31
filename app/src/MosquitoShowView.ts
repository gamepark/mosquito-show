import GameView from '@gamepark/mosquito-show/GameView'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { changeActivePlayer, chooseMosquitoEffect, discardTokenFromBoardInView, discardTokenFromPlayerBoard, eatInView, Move, moveAnimal, moveMosquitoTokenInView, MoveType, selectOpponentAnimal, skipTurn } from '@gamepark/mosquito-show/moves'
import { MoveView } from '@gamepark/mosquito-show/moves/MoveView'
import { revealMosquitoInView } from '@gamepark/mosquito-show/moves/RevealMosquito'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { canUndo, endOfTurn, gameEndBlock, gameEndGolden, getActivePlayerState } from '@gamepark/mosquito-show/utils/GameUtils'
import { getSelectedMosquitoByIndex } from '@gamepark/mosquito-show/utils/PlayerBoardUtils'
import { Action, Game, Undo } from '@gamepark/rules-api'
import LocalGameView from './LocalGameView'
import { canSelect } from './util/GameUtils'

export default class MosquitoShowView implements Game<LocalGameView, Move>, Undo<LocalGameView, Move, PlayerColor> {
  state: LocalGameView

  constructor(state: GameView) {
    this.state = state
  }

  canUndo(action: Action<Move, PlayerColor>, consecutiveActions: Action<Move, PlayerColor>[]): boolean {
    return canUndo(this.state, action, consecutiveActions)
  }

  play(move: MoveView): void {
    switch (move.type) {
      case MoveType.SelectAnimal:
        if (canSelect(this.state)) {
          if (getActivePlayerState(this.state)?.animalForcedToMove) {
            this.state.selectedAnimal = getActivePlayerState(this.state)!.animalForcedToMove
          } else {
            this.state.selectedAnimal = move.animal
          }
        }
        return
      case MoveType.SelectMosquitoToken:
        this.state.selectedPondSpace = move.coordinates
        return
      case MoveType.MoveAnimal:
        moveAnimal(this.state, move)
        delete this.state.selectedAnimal
        break
      case MoveType.Eat:
        eatInView(this.state, move)
        break
      case MoveType.MoveMosquitoToken:
        moveMosquitoTokenInView(this.state, move)
        delete this.state.selectedPondSpace
        break
      case MoveType.DiscardTokenFromBoard:
        discardTokenFromBoardInView(this.state, move)
        break
      case MoveType.SelectOpponentAnimal:
        selectOpponentAnimal(this.state, move)
        break
      case MoveType.ChooseMosquitoEffect:
        chooseMosquitoEffect(this.state, move)
        if (getSelectedMosquitoByIndex(this.state, move.mosquitoIndex) == Mosquito.Blue) {
          this.state.selectedAnimal = undefined
        }
        return
      case MoveType.RevealMosquito:
        revealMosquitoInView(this.state, move)
        break
      case MoveType.SkipTurn:
        skipTurn(this.state, move)
        break
      case MoveType.ChangeActivePlayer:
        changeActivePlayer(this.state, move)
        gameEndBlock(this.state)
        return
      case MoveType.DiscardTokenFromPlayerBoard:
        discardTokenFromPlayerBoard(this.state, move)
        break
    }
    gameEndGolden(this.state)
    endOfTurn(this.state)
  }
}