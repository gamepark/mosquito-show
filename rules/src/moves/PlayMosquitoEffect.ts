import { getActivePlayerState } from "../GameState"
import GameView from "../GameView"
import PlayerColor, { getColorFromAnimalId } from "../PlayerColor"
import PlayerState from "../PlayerState"
import MoveType from "./MoveType"

type PlayMosquitoEffect = {
  type: typeof MoveType.PlayMosquitoEffect
  selectedEffectIndex: number
  startMosquitoEffectFieldId: number
  targetMosquitoEffectFieldId: number
}

export default PlayMosquitoEffect

export const playMosquitoEffectMove = (selectedEffectIndex: number, startMosquitoEffectFieldId: number, targetMosquitoEffectFieldId: number): PlayMosquitoEffect => ({
  type: MoveType.PlayMosquitoEffect, selectedEffectIndex, startMosquitoEffectFieldId, targetMosquitoEffectFieldId
})

export const playMosquitoEffect = (move: PlayMosquitoEffect, state: GameView): void => {
  const activePlayerState = getActivePlayerState(state)
  if (activePlayerState !== undefined) {
    if (move.selectedEffectIndex > -1) {
      const selectedEffect = activePlayerState.availableMosquitoEffects.splice(move.selectedEffectIndex, 1)[0]
      switch (selectedEffect.front) {
        case 1:
          state.mosquitoEffect = selectedEffect.front
          handleGreyMosquitoEffect(activePlayerState)
          break
        case 2:
          state.mosquitoEffect = selectedEffect.front
          handleBlueMosquitoEffect(activePlayerState)
          break
        case 3:
          state.mosquitoEffect = selectedEffect.front
          handleRedMosquitoEffect(activePlayerState)
          break
        case 4:
          state.mosquitoEffect = selectedEffect.front
          handleWhiteMosquitoEffect(activePlayerState)
          break
        case 5:
          handleGoldenMosquitoEffect(activePlayerState)
          break
      }
    } else {
      switch (state.mosquitoEffect) {
        case 1:
          handleGreyMosquitoEffect(activePlayerState)
          break
        case 2:
          handleBlueMosquitoEffect(activePlayerState)
          break
        case 3:
          handleRedMosquitoEffect(activePlayerState)
          break
        case 4:
          handleWhiteMosquitoEffect(activePlayerState)
          break
      }
    }
  }

  function switchPlayerColor() {
    if (state.activePlayer === PlayerColor.Blue) {
      state.activePlayer = PlayerColor.Orange
    } else if (state.activePlayer === PlayerColor.Orange) {
      state.activePlayer = PlayerColor.Blue
    }
    state.inMoveAnimalSwitchNotAllowed = true
    state.selectedAnimalId = undefined
  }

  function handleEffectEnd(activePlayerState: PlayerState) {
    // Chameleon  
    if (state.selectedAnimalId == 3 || state.selectedAnimalId == 4) {
      if (activePlayerState.chameleonMoved) {
        activePlayerState.chameleonMoved = false
      }
      switchPlayerColor()
    }
    // Toucan
    if (state.selectedAnimalId == 1 || state.selectedAnimalId == 2) {
      if (activePlayerState.availableMosquitoEffects.length == 0) {
        switchPlayerColor()
      }
    }
  }

  function handleGreyMosquitoEffect(activePlayerState: PlayerState) {
    if (move.startMosquitoEffectFieldId == -1) {
      state.possibleEffectFields = []
      for (let i = 0; i < state.board.mosquitoFields.length; i++) {
        const mosquitoEffectField = state.board.mosquitoFields[i];
        if (mosquitoEffectField.effects.length > 0) {
          state.possibleEffectFields.push(mosquitoEffectField.id)
        }
      }
    } else if (move.startMosquitoEffectFieldId > -1 && move.targetMosquitoEffectFieldId === -1) {
      state.mosquitoEffectStartFieldId = move.startMosquitoEffectFieldId
      state.possibleEffectFields = []
      for (let i = 0; i < state.board.mosquitoFields.length; i++) {
        const mosquitoEffectField = state.board.mosquitoFields[i];
        if (mosquitoEffectField.id !== move.startMosquitoEffectFieldId) {
          state.possibleEffectFields.push(mosquitoEffectField.id)
        }
      }
    } else if (move.startMosquitoEffectFieldId > -1 && move.targetMosquitoEffectFieldId > -1) {
      var startField = undefined
      var targetField = undefined
      for (let i = 0; i < state.board.mosquitoFields.length; i++) {
        const mosquitoEffectField = state.board.mosquitoFields[i];
        if (mosquitoEffectField.id === move.startMosquitoEffectFieldId) {
          startField = mosquitoEffectField
        }
        if (mosquitoEffectField.id === move.targetMosquitoEffectFieldId) {
          targetField = mosquitoEffectField
        }
      }
      if (startField !== undefined && targetField !== undefined) {
        var chosenEffect = startField.effects.pop()
        if (chosenEffect !== undefined) {
          targetField.effects.push(chosenEffect)
        }
      }
      state.possibleEffectFields = []
      state.mosquitoEffect = -1
      state.mosquitoEffectStartFieldId = -1
      handleEffectEnd(activePlayerState)
    }
  }

  function handleBlueMosquitoEffect(activePlayerState: PlayerState) {
    if (move.startMosquitoEffectFieldId == -1) {
      state.possibleAnimalFields = []
      for (let i = 0; i < state.board.animalFields.length; i++) {
        const animalField = state.board.animalFields[i];
        if (getColorFromAnimalId(animalField.animalId) == state.activePlayer) {
          state.possibleAnimalFields.push(animalField.fieldId)
        }
      }
    } else if (move.startMosquitoEffectFieldId > -1 && move.targetMosquitoEffectFieldId === -1) {
      state.mosquitoEffectStartFieldId = move.startMosquitoEffectFieldId
      state.possibleAnimalFields = []
      for (let i = 1; i <= 16; i++) {
        state.possibleAnimalFields.push(i)
      }
      for (let j = 0; j < state.board.animalFields.length; j++) {
        var deleteElement = state.board.animalFields[j].fieldId
        state.possibleAnimalFields.splice(state.possibleAnimalFields.indexOf(deleteElement), 1)
      }
    } else if (move.startMosquitoEffectFieldId > -1 && move.targetMosquitoEffectFieldId > -1) {
      var startField = undefined
      for (let i = 0; i < state.board.animalFields.length; i++) {
        const animalField = state.board.animalFields[i];
        if (animalField.fieldId === move.startMosquitoEffectFieldId) {
          startField = animalField
        }
      }
      if (startField !== undefined) {
        startField.fieldId = move.targetMosquitoEffectFieldId
      }
      state.possibleAnimalFields = []
      state.mosquitoEffect = -1
      state.mosquitoEffectStartFieldId = -1
      handleEffectEnd(activePlayerState)
    }
  }

  function handleRedMosquitoEffect(activePlayerState: PlayerState) {
    if (move.startMosquitoEffectFieldId == -1) {
      state.possibleAnimalFields = []
      for (let i = 0; i < state.board.animalFields.length; i++) {
        const animalField = state.board.animalFields[i];
        if (getColorFromAnimalId(animalField.animalId) !== state.activePlayer) {
          state.possibleAnimalFields.push(animalField.fieldId)
        }
      }
    } else if (move.startMosquitoEffectFieldId > -1 && move.targetMosquitoEffectFieldId === -1) {
      state.mosquitoEffectStartFieldId = move.startMosquitoEffectFieldId
      handleEffectEnd(activePlayerState)
    }
    // state.mosquitoEffect = -1
    // state.mosquitoEffectStartFieldId = -1
  }

  function handleWhiteMosquitoEffect(activePlayerState: PlayerState) {
    if (move.startMosquitoEffectFieldId == -1) {
      state.possibleEffectFields = []
      for (let i = 0; i < state.board.mosquitoFields.length; i++) {
        const mosquitoEffectField = state.board.mosquitoFields[i];
        if (mosquitoEffectField.effects.length > 0) {
          state.possibleEffectFields.push(mosquitoEffectField.id)
        }
      }
    } else {
      for (let i = 0; i < state.board.mosquitoFields.length; i++) {
        const mosquitoEffectField = state.board.mosquitoFields[i];
        if (mosquitoEffectField.id == move.startMosquitoEffectFieldId) {
          mosquitoEffectField.effects.pop()
          break
        }
        state.mosquitoEffect = -1
        state.possibleEffectFields = []
        handleEffectEnd(activePlayerState)
      }
    }
  }

  function handleGoldenMosquitoEffect(activePlayerState: PlayerState) {
    activePlayerState.ownedGoldenMosquitos++
    handleEffectEnd(activePlayerState)
  }
}