import {Eat, EatView, Move} from './'
import {RevealMosquito, RevealMosquitoView} from './RevealMosquito'

export type MoveView = Exclude<Move, Eat | RevealMosquito> | EatView | RevealMosquitoView