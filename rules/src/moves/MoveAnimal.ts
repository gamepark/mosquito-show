import Animal from '../animals/Animal'
import GameState from '../GameState'
import GameView from '../GameView'
import {MoveType} from './MoveType'

export type MoveAnimal = {
  type: typeof MoveType.MoveAnimal
  animal: Animal
  fieldId: number
}

export const moveAnimalMove = (animal: Animal, fieldId: number): MoveAnimal => ({
  type: MoveType.MoveAnimal, animal, fieldId
})

export const moveAnimal = (state: GameState | GameView, move: MoveAnimal): void => {
  const location = state.board.animalLocations.find(location => location.player === state.activePlayer && location.animal === move.animal)
  if (!location) {
    state.board.animalLocations.push({player: state.activePlayer, animal: move.animal, fieldId: move.fieldId})
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