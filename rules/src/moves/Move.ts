import {ChooseMosquitoEffect, Eat, MoveAnimal, PlayWhiteMosquitoEffect, SelectAnimal} from './'
import {RevealMosquito} from './RevealMosquito'

export type Move = Eat | MoveAnimal | RevealMosquito | PlayWhiteMosquitoEffect | ChooseMosquitoEffect | SelectAnimal