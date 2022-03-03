import { ChangeActivePlayer, ChooseMosquitoEffect, Eat, MoveAnimal, MoveMosquitoToken, PlayRedMosquitoEffect, PlayWhiteMosquitoEffect, RevealMosquito, SelectAnimal, SelectMosquitoToken, SkipTurn } from './'
import { DiscardTokenFromPlayerBoard } from './DiscardTokenFromPlayerBoard'

export type Move = Eat | MoveAnimal | RevealMosquito | PlayWhiteMosquitoEffect | ChooseMosquitoEffect | SelectAnimal | SelectMosquitoToken | PlayRedMosquitoEffect | MoveMosquitoToken | SkipTurn | ChangeActivePlayer | DiscardTokenFromPlayerBoard