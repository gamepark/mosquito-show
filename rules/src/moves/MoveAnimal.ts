import Animal from '../animals/Animal'
import Coordinates from '../fields/Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import {isPlacementPhase} from '../MosquitoShow'
import PlayerColor from '../PlayerColor'
import {MoveType} from './MoveType'

const {Orange, Blue} = PlayerColor

export type MoveAnimal = {
  type: typeof MoveType.MoveAnimal
  animal: Animal
} & Coordinates

export const moveAnimalMove = (animal: Animal, coordinates: Coordinates): MoveAnimal => ({
  type: MoveType.MoveAnimal, animal, x: coordinates.x, y: coordinates.y
})

export const moveAnimal = (game: GameState | GameView, move: MoveAnimal): void => {
  const placementPhase = isPlacementPhase(game)
  const player = game.players.find(p => p.color === game.activePlayer)!
  if (move.animal === Animal.Chameleon) {
    player.chameleon = {x: move.x, y: move.y}
  } else {
    player.toucan = {x: move.x, y: move.y}
  }
  if (placementPhase) {
    game.activePlayer = game.activePlayer === Orange ? Blue : Orange
  }
  /*const animalId = move.animalId
  state.selectedAnimalId = move.animalId
  state.inMoveAnimalSwitchNotAllowed = false
  let field = {animalId: animalId, fieldId: move.fieldId}
  let animalFields = state.board.animalLocations
  let fieldSet = false
  if (animalFields != undefined) {
    for (let i = 0; i < animalFields.length; i++) {
      if (animalFields[i].animalId == animalId) {
        animalFields[i] = field
        fieldSet = true
        break
      }
    }
  }

  if (state.selectedAnimalId == 3 || state.selectedAnimalId == 4) {
    // Chameleon Move
    state.players
      .filter(p => p.color == state.activePlayer)
      .forEach(p => {
        p.chameleonMoved = true
      })
  }
  if (!fieldSet) {
    state.board.animalLocations.push(field)
    var activePlayerState = getActivePlayerState(state)
    if (state.selectedAnimalId == 1 || state.selectedAnimalId == 2) {
      if (activePlayerState !== undefined && activePlayerState.toucanStartPosition == -1) {
        // Initial Toucan Move from PlayerBoard
        state.players
          .filter(p => p.color == state.activePlayer)
          .forEach(p => {
            p.toucanStartPosition = move.fieldId
          })
      }
    } else if (state.selectedAnimalId == 3 || state.selectedAnimalId == 4) {
      // Initial Chameleon Move from PlayerBoard
      if (activePlayerState !== undefined) {
        activePlayerState.chameleonMoved = false
      }
      state.inMoveAnimalSwitchNotAllowed = true
    }
    if (state.activePlayer === PlayerColor.Blue) {
      state.activePlayer = PlayerColor.Orange
    } else if (state.activePlayer === PlayerColor.Orange) {
      state.activePlayer = PlayerColor.Blue
    }
    state.selectedAnimalId = undefined
  }*/

  // state.possibleAnimalFields = []
  // if(state.activePlayer === PlayerColor.Blue){
  //     state.activePlayer = PlayerColor.Orange
  // } else if(state.activePlayer === PlayerColor.Orange){
  //     state.activePlayer = PlayerColor.Blue
  // }
}