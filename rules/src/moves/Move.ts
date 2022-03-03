import { ChangeActivePlayer, ChooseMosquitoEffect, DiscardTokenFromBoard, Eat, MoveAnimal, MoveMosquitoToken, RevealMosquito, SelectAnimal, SelectMosquitoToken, SelectOpponentAnimal, SkipTurn } from './'
import { DiscardTokenFromPlayerBoard } from './DiscardTokenFromPlayerBoard'

export type Move = Eat | MoveAnimal | RevealMosquito | DiscardTokenFromBoard | ChooseMosquitoEffect | SelectAnimal | SelectMosquitoToken | SelectOpponentAnimal | MoveMosquitoToken | SkipTurn | ChangeActivePlayer | DiscardTokenFromPlayerBoard