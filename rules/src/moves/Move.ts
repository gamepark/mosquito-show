import Eat from "./Eat"
import MosquitoEffect from "./PlayMosquitoEffect"
import MoveAnimal from "./MoveAnimal"

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = Eat | MoveAnimal | MosquitoEffect  // | DoOtherStuff | ChooseCard | MovePawn...

// Chamelon: Eat Mosquito, Move, Effect

export default Move