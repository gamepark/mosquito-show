import ChooseAnimal from "./ChooseAnimal"
import Eat from "./Eat"
import MoveAnimal from "./MoveAnimal"
import MosquitoEffect from "./PlayMosquitoEffect"

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = ChooseAnimal | Eat | MoveAnimal | MosquitoEffect


// Chamelon: Eat Mosquito, Move, Effect

export default Move