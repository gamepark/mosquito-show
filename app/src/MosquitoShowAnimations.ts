import {MoveType} from '@gamepark/mosquito-show/moves'
import {MoveView} from '@gamepark/mosquito-show/moves/MoveView'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import {Animations} from '@gamepark/react-client'
import GameView from '@gamepark/mosquito-show/GameView'

export default class MosquitoShowAnimations extends Animations<GameView, MoveView, PlayerColor> {
    override getPreDuration(move: MoveView): number {
        if (move.type === MoveType.MoveAnimal) {
            return 0.5
        } else if (move.type === MoveType.MoveMosquitoToken) {
            return 0.5
        } else if (move.type === MoveType.DiscardTokenFromBoard) {
            return 1.5
        } else if (move.type === MoveType.Eat) {
            return 1.5
        } else if (move.type === MoveType.RevealMosquito) {
            return 0.5
        } else if (move.type === MoveType.DiscardTokenFromPlayerBoard) {
            return 0.5
        }
        return 0
    }
}
