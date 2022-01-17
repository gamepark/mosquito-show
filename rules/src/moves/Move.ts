import { ChooseMosquitoEffect, Eat, MoveAnimal, PlayBlueMosquitoEffect, PlayGreyMosquitoEffect, PlayRedMosquitoEffect, PlayWhiteMosquitoEffect, RevealMosquito, SelectAnimal, SelectMosquitoToken, SkipTurn } from './'
import { ChangeActivePlayer } from './ChangeActivePlayer'

export type Move = Eat | MoveAnimal | RevealMosquito | PlayWhiteMosquitoEffect | ChooseMosquitoEffect | SelectAnimal | SelectMosquitoToken | PlayRedMosquitoEffect| PlayBlueMosquitoEffect | PlayGreyMosquitoEffect | SkipTurn | ChangeActivePlayer