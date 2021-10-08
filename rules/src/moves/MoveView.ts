import {Eat, EatView, Move} from './'

export type MoveView = Exclude<Move, Eat> | EatView