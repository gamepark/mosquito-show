import Animal from "@gamepark/mosquito-show/animals/Animal";
import GameState from "@gamepark/mosquito-show/GameState";
import { Mosquito, MosquitoOnBoard, Waterlily } from "@gamepark/mosquito-show/material/MosquitoEffect";
import { moveAnimalMove } from "@gamepark/mosquito-show/moves";
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
    const row1: MosquitoOnBoard[][] = []
    row1.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosFlower.splice(0, 1)[0]])
    row1.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosFlower.splice(0, 1)[0], { mosquito: Grey, waterlily: WaterLily, revealed: true }])
    row1.push([{ mosquito: Golden, waterlily: Flower, revealed: false }, { mosquito: Golden, waterlily: WaterLily, revealed: false }, { mosquito: Golden, waterlily: WaterLily, revealed: true }])
    result.push(row1)
    const row2: MosquitoOnBoard[][] = []
    row2.push([{ mosquito: White, waterlily: Flower, revealed: false }, { mosquito: Red, waterlily: WaterLily, revealed: false }, { mosquito: Blue, waterlily: WaterLily, revealed: true }])
    row2.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosFlower.splice(0, 1)[0]])
    row2.push([shuffledMosquitosFlower.splice(0, 1)[0], { mosquito: Golden, waterlily: WaterLily, revealed: false }, shuffledMosquitosFlower.splice(0, 1)[0]])
    result.push(row2)
    const row3: MosquitoOnBoard[][] = []
    row3.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], { mosquito: Golden, waterlily: Flower, revealed: false }, { mosquito: Golden, waterlily: WaterLily, revealed: true }])
    row3.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosWaterlilly.splice(0, 1)[0], { mosquito: Golden, waterlily: WaterLily, revealed: true }])
    row3.push([shuffledMosquitosWaterlilly.splice(0, 1)[0], shuffledMosquitosFlower.splice(0, 1)[0], { mosquito: Golden, waterlily: WaterLily, revealed: true }])
    result.push(row3)
    return result
}


const MosquitoShowTutorial: TutorialDescription<GameState, Move, PlayerColor> = {
    setupTutorial: () => [{
        players: [PlayerColor.Blue, PlayerColor.Orange].map(color => ({ color, goldenMosquitos: 0, eatenMosquitos: [], pendingToucanEat: [], hasPlayerToMoveAnimal: undefined })),
        activePlayer: PlayerColor.Blue,
        mosquitos: createMosquitos(),
        turnOver: false,
        handleMosquitoEffectOver: false
    }, [PlayerColor.Blue]],

    expectedMoves: () => [
        moveAnimalMove(Toucan, { x: 0, y: 0 }),
        moveAnimalMove(Chameleon, { x: 2, y: 2 }),
        moveAnimalMove(Chameleon, { x: 0, y: 2 }),
        moveAnimalMove(Toucan, { x: 1, y: 2 })
    ]
}

export {
    MosquitoShowTutorial
};
