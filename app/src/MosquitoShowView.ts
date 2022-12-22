import {Mosquito} from '@gamepark/mosquito-show/material/MosquitoEffect'
import {Move, MoveType} from '@gamepark/mosquito-show/moves'
import {MoveView} from '@gamepark/mosquito-show/moves/MoveView'
import {getActivePlayerState} from '@gamepark/mosquito-show/utils/GameUtils'
import {getSelectedMosquitoByIndex} from '@gamepark/mosquito-show/utils/PlayerBoardUtils'
import {canSelect} from './util/GameUtils'
import MosquitoShow from '@gamepark/mosquito-show/MosquitoShow'
import LocalGameView from './LocalGameView'

export default class MosquitoShowView extends MosquitoShow {

  play(move: Move | MoveView): (Move | MoveView)[] {
    const game = this.game as LocalGameView
    switch (move.type) {
      case MoveType.SelectAnimal:
        if (canSelect(game, move.animal)) {
          if (getActivePlayerState(game)?.animalForcedToMove) {
            game.selectedAnimal = getActivePlayerState(game)!.animalForcedToMove
          } else {
            game.selectedAnimal = move.animal
          }
        }
        break
      case MoveType.SelectMosquitoToken:
        game.selectedPondSpace = move.coordinates
        break
      case MoveType.MoveAnimal:
        super.play(move)
        delete game.selectedAnimal
        break
      case MoveType.MoveMosquitoToken:
        super.play(move)
        delete game.selectedPondSpace
        break
      case MoveType.ChooseMosquitoEffect:
        super.play(move)
        if (getSelectedMosquitoByIndex(game, move.mosquitoIndex) === Mosquito.Blue) {
          game.selectedAnimal = undefined
        }
        break
      default:
        super.play(move)
    }
    return []
  }

  getAutomaticMoves(): MoveView[] {
    return this.keepPredictableMoves(super.getAutomaticMoves())
  }

  keepPredictableMoves(moves: Move[]): (Move & MoveView)[] {
    return moves.slice(0, moves.findIndex(move => !this.isPredictableMove(move))) as (Move & MoveView)[]
  }

  isPredictableMove(move: Move): move is Move & MoveView {
    return move.type !== MoveType.Eat && move.type !== MoveType.RevealMosquito
  }
}