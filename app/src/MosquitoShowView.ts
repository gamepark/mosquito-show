import Animal from '@gamepark/mosquito-show/animals/Animal'
import GameView from '@gamepark/mosquito-show/GameView'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { changeActivePlayer, chooseMosquitoEffect, eatInView, Move, moveAnimal, MoveType, playBlueMosquitoEffect, playGreyMosquitoEffectInView, playMosquitoEffectInView, playRedMosquitoEffect, skipTurn } from '@gamepark/mosquito-show/moves'
import { MoveView } from '@gamepark/mosquito-show/moves/MoveView'
import { revealMosquitoInView } from '@gamepark/mosquito-show/moves/RevealMosquito'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { canMoveAnimal } from '@gamepark/mosquito-show/utils/AnimalUtils'
import { canUndo, endOfTurn, getActivePlayerState } from '@gamepark/mosquito-show/utils/GameUtils'
import { Action, Game, Undo } from '@gamepark/rules-api'
import LocalGameView from './LocalGameView'
import { canSelect } from './util/GameUtils'

const { Toucan, Chameleon } = Animal

export default class MosquitoShowView implements Game<LocalGameView, Move>, Undo<LocalGameView, Move, PlayerColor> {
  state: LocalGameView

  constructor(state: GameView) {
    this.state = state
  }
  
  canUndo(action: Action<Move, PlayerColor>, consecutiveActions: Action<Move, PlayerColor>[]): boolean {
    return canUndo(action, consecutiveActions)
  }
  
  play(move: MoveView): void {
    switch (move.type) {
      case MoveType.SelectAnimal:
        if(canSelect(this.state)){
          if(getActivePlayerState(this.state)?.animalForcedToMove){
            this.state.selectedAnimal = getActivePlayerState(this.state)!.animalForcedToMove
          } else {
            this.state.selectedAnimal = move.animal
          }
        }
        return
      case MoveType.SelectMosquitoToken:
        this.state.selectedPondSpace = { x: move.x, y: move.y }
        return
      case MoveType.MoveAnimal:
        moveAnimal(this.state, move)
        delete this.state.selectedAnimal
        break
      case MoveType.Eat:
        eatInView(this.state, move)
        break
      case MoveType.PlayGreyMosquitoEffect:
        playGreyMosquitoEffectInView(this.state, move)
        delete this.state.selectedPondSpace
        break
      case MoveType.PlayWhiteMosquitoEffect:
        playMosquitoEffectInView(this.state, move)
        break
      case MoveType.PlayRedMosquitoEffect:
        playRedMosquitoEffect(this.state, move)
        break
      case MoveType.PlayBlueMosquitoEffect:
        playBlueMosquitoEffect(this.state, move)
        delete this.state.selectedAnimal
        break
      case MoveType.ChooseMosquitoEffect:
        chooseMosquitoEffect(this.state, move)
        if (move.mosquito == Mosquito.Blue) {
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
        if (!canMoveAnimal(this.state, Toucan) && !canMoveAnimal(this.state, Chameleon)) {
          delete this.state.activePlayer
        }
        return
    }
    endOfTurn(this.state)
  }
}