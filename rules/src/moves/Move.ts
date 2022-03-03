import { ChangeActivePlayer, ChooseMosquitoEffect, Eat, MoveAnimal, MoveMosquitoToken, PlayRedMosquitoEffect, DiscardTokenFromBoard, RevealMosquito, SelectAnimal, SelectMosquitoToken, SkipTurn } from './'
import { DiscardTokenFromPlayerBoard } from './DiscardTokenFromPlayerBoard'

export type Move = Eat | MoveAnimal | RevealMosquito | DiscardTokenFromBoard | ChooseMosquitoEffect | SelectAnimal | SelectMosquitoToken | PlayRedMosquitoEffect | MoveMosquitoToken | SkipTurn | ChangeActivePlayer | DiscardTokenFromPlayerBoard