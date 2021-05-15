import ChooseAnimal from "./ChooseAnimal"
import ChooseMosquitoEffect from "./ChooseMosquitoEffect"
import Eat from "./Eat"
import MoveAnimal from "./MoveAnimal"
import MosquitoEffect from "./PlayMosquitoEffect"

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = ChooseAnimal | Eat | MoveAnimal | MosquitoEffect | ChooseMosquitoEffect

export default Move