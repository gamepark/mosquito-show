import { MoveType } from "@gamepark/mosquito-show/moves";
import { MoveView } from "@gamepark/mosquito-show/moves/MoveView";
import PlayerColor from "@gamepark/mosquito-show/PlayerColor";
import { Animations } from "@gamepark/react-client";
import LocalGameView from "./LocalGameView";

const mosquitoShowAnimations: Animations<LocalGameView, MoveView, PlayerColor> = {
    getAnimationDuration(move: MoveView){
        if(move.type === MoveType.MoveAnimal){
            return 0.5
        }
        return 0
    }
}

export default mosquitoShowAnimations