import {ChooseMosquitoEffect, Eat, MoveAnimal, PlayMosquitoEffect, SelectAnimal} from './'
import {RevealMosquito} from './RevealMosquito'

export type Move = Eat | MoveAnimal | RevealMosquito | PlayMosquitoEffect | ChooseMosquitoEffect | SelectAnimal