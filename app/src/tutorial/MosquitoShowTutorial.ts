import Animal from "@gamepark/mosquito-show/animals/Animal";
import GameState from "@gamepark/mosquito-show/GameState";
import { Mosquito, MosquitoOnBoard, Waterlily } from "@gamepark/mosquito-show/material/MosquitoEffect";
import { chooseMosquitoEffectMove, discardTokenFromBoardMove, eatMove, moveAnimalMove, moveMosquitoTokenMove, selectOpponentAnimalMove } from "@gamepark/mosquito-show/moves";
import { Move } from "@gamepark/mosquito-show/moves/Move";
import PlayerColor from "@gamepark/mosquito-show/PlayerColor";
import TutorialDescription from "@gamepark/react-client/dist/Tutorial/TutorialDescription";
import shuffle from 'lodash.shuffle';

const { Golden, Grey, Blue, Red, White } = Mosquito
const { WaterLily, Flower } = Waterlily
const { Toucan, Chameleon } = Animal

export const createMosquitos = (): MosquitoOnBoard[][][] => {

    const mosquitoWaterlilly: MosquitoOnBoard[] = []
    const mosquitoFlower: MosquitoOnBoard[] = []
    for (let i = 0; i < 6; i++) {
        mosquitoWaterlilly.push(
            { mosquito: Golden, waterlily: WaterLily, revealed: false }
        )
    }
    for (let i = 0; i < 3; i++) {
        mosquitoFlower.push(
            { mosquito: Golden, waterlily: Flower, revealed: false }
        )
    }
    for (let i = 0; i < 2; i++) {
        mosquitoWaterlilly.push(
            { mosquito: Grey, waterlily: WaterLily, revealed: false }
        )
    }
    mosquitoFlower.push(
        { mosquito: Grey, waterlily: Flower, revealed: false }
    )
    mosquitoWaterlilly.push(
        { mosquito: Blue, waterlily: WaterLily, revealed: false }
    )
    mosquitoFlower.push(
        { mosquito: Blue, waterlily: Flower, revealed: false }
    )
    mosquitoFlower.push(
        { mosquito: Red, waterlily: Flower, revealed: false }
    )

    const shuffledMosquitosWaterlilly = shuffle(mosquitoWaterlilly)
    const shuffledMosquitosFlower = shuffle(mosquitoFlower)

    const result: MosquitoOnBoard[][][] = []
    const column1: MosquitoOnBoard[][] = []
    column1.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosFlower.splice(0, 1)[0]])
    column1.push([{ mosquito: White, waterlily: Flower, revealed: false }, { mosquito: Red, waterlily: WaterLily, revealed: false }, { mosquito: Blue, waterlily: WaterLily, revealed: true }])
    column1.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], { mosquito: Golden, waterlily: Flower, revealed: false }, { mosquito: Golden, waterlily: WaterLily, revealed: true }])

    const column2: MosquitoOnBoard[][] = []
    column2.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosFlower.splice(0, 1)[0], { mosquito: Grey, waterlily: WaterLily, revealed: true }])
    column2.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosFlower.splice(0, 1)[0]])
    column2.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosWaterlilly.splice(0, 1)[0], { mosquito: Golden, waterlily: WaterLily, revealed: true }])

    const column3: MosquitoOnBoard[][] = []
    column3.push([{ mosquito: Golden, waterlily: Flower, revealed: false }, { mosquito: Golden, waterlily: WaterLily, revealed: false }, { mosquito: Golden, waterlily: WaterLily, revealed: true }])
    result.push(column1)
    column3.push([shuffledMosquitosFlower.splice(0, 1)[0], { mosquito: Golden, waterlily: WaterLily, revealed: false }, shuffledMosquitosFlower.splice(0, 1)[0]])
    result.push(column2)
    column3.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosFlower.splice(0, 1)[0], { mosquito: Golden, waterlily: WaterLily, revealed: true }])
    result.push(column3)
    return result
}


const MosquitoShowTutorial: TutorialDescription<GameState, Move, PlayerColor> = {
    setupTutorial: () => [{
        players: [PlayerColor.Blue, PlayerColor.Orange].map(color => ({ color, goldenMosquitos: 0, eatenMosquitos: [], pendingToucanEat: [], hasPlayerToMoveAnimal: undefined })),
        activePlayer: PlayerColor.Blue,
        mosquitos: createMosquitos(),
        turnOver: false,
        handleMosquitoEffectOver: false
    }, [PlayerColor.Blue, PlayerColor.Orange]],

    expectedMoves: () => [
        //Placement Phase
        moveAnimalMove(Toucan, { x: 0, y: 0 }),
        moveAnimalMove(Chameleon, { x: 2, y: 2 }),
        moveAnimalMove(Chameleon, { x: 0, y: 2 }),
        moveAnimalMove(Toucan, { x: 1, y: 2 }),
        // Player: Eat blue
        eatMove(false, 0, 1),
        moveAnimalMove(Chameleon, { x: 0, y: 1 }),
        chooseMosquitoEffectMove(0),
        moveAnimalMove(Toucan, { x: 0, y: 3 }),
        // Opponent: Eat Golden
        eatMove(false, 2, 2),
        moveAnimalMove(Chameleon, { x: 2, y: 1 }),
        // Player: Eat Red
        eatMove(false, 0, 1),
        moveAnimalMove(Chameleon, { x: 1, y: 1 }),
        chooseMosquitoEffectMove(0),
        selectOpponentAnimalMove(Toucan),
        // Opponent: Move Toucan, Eat Whita
        moveAnimalMove(Toucan, { x: 0, y: 1 }),
        chooseMosquitoEffectMove(0),
        discardTokenFromBoardMove(2, 1),
        // Player: Eat Grey
        eatMove(false, 1, 0),
        moveAnimalMove(Chameleon, { x: 1, y: 0 }),
        chooseMosquitoEffectMove(0),
        moveMosquitoTokenMove({ x: 2, y: 1 }, { x: 1, y: 1 }),
        // Opponent: Eat Golden
        eatMove(false, 2, 0),
        moveAnimalMove(Chameleon, { x: 3, y: 1 })
    ]
}

export {
    MosquitoShowTutorial
};
