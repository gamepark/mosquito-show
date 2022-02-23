import { ChooseMosquitoEffect, Eat, MoveAnimal, PlayGreyMosquitoEffect, PlayRedMosquitoEffect, PlayWhiteMosquitoEffect, RevealMosquito, SelectAnimal, SelectMosquitoToken, SkipTurn } from './'
import { ChangeActivePlayer } from './ChangeActivePlayer'

export type Move = Eat | MoveAnimal | RevealMosquito | PlayWhiteMosquitoEffect | ChooseMosquitoEffect | SelectAnimal | SelectMosquitoToken | PlayRedMosquitoEffect | PlayGreyMosquitoEffect | SkipTurn | ChangeActivePlayer