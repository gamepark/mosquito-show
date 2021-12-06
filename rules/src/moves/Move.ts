import { ChooseMosquitoEffect, Eat, MoveAnimal, MoveMosquitoToken, PlayRedMosquitoEffect, PlayWhiteMosquitoEffect, RevealMosquito, SelectAnimal, SelectMosquitoToken } from './'

export type Move = Eat | MoveAnimal | RevealMosquito | PlayWhiteMosquitoEffect | ChooseMosquitoEffect | SelectAnimal | SelectMosquitoToken | MoveMosquitoToken| PlayRedMosquitoEffect