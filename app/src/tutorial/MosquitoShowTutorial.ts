import GameState from "@gamepark/mosquito-show/GameState";
import { Move } from "@gamepark/mosquito-show/moves/Move";
import PlayerColor from "@gamepark/mosquito-show/PlayerColor";
import TutorialDescription from "@gamepark/react-client/dist/Tutorial/TutorialDescription";



const MosquitoShowTutorial: TutorialDescription<GameState, Move, PlayerColor> = {
    setupTutorial: function (): [GameState, PlayerColor[]] {
        throw new Error("Function not implemented.");
    },
    expectedMoves: function (): (Move | Move[])[] {
        throw new Error("Function not implemented.");
    }
}

export {
    MosquitoShowTutorial
};
