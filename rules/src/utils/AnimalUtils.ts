import Animal from "../animals/Animal"
import Coordinates from "../fields/Coordinates"
import GameState from "../GameState"
import GameView from "../GameView"
import { Mosquito } from "../material/MosquitoEffect"
import PlayerState from "../PlayerState"
import { getActivePlayerState } from "./GameUtils"

const { Toucan, Chameleon } = Animal

export function getValidDestinations(game: GameState | GameView, animal: Animal): Coordinates[] {
    return getValidDestinationsOfPlayer(game,animal,getActivePlayerState(game))
  }
  export function getValidDestinationsOfPlayer(game: GameState | GameView, animal: Animal, player: PlayerState | undefined): Coordinates[] {
    if (!player) return []
    const origin = animal === Chameleon ? player.chameleon : player.toucan
    if (!origin || (!player.chameleonMustMove && player.selectedMosquito == Mosquito.Blue)) {
      const result: Coordinates[] = []
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          if (!getAnimalLocations(game).some(location => location.x === x && location.y === y)) {
            result.push({ x, y })
          }
        }
      }
      return result
    }
    const animalLocations = getAnimalLocations(game)
    if (animal === Animal.Chameleon) {
      if (!player.chameleonMustMove) return []
      return getValidChameleonDestinations(origin, animalLocations)
    } else {
      const result: Coordinates[] = []
      let x = origin.x
      let y = origin.y
      while (x > 0 && y > 0 && game.mosquitos[--x][--y].length && !animalLocations.some(animal => animal.x === x && animal.y === y)) {
        result.push({ x, y })
      }
      x = origin.x
      y = origin.y
      while (x < 3 && y > 0 && game.mosquitos[x++][--y].length && !animalLocations.some(animal => animal.x === x && animal.y === y)) {
        result.push({ x, y })
      }
      x = origin.x
      y = origin.y
      while (x > 0 && y < 3 && game.mosquitos[--x][y++].length && !animalLocations.some(animal => animal.x === x && animal.y === y)) {
        result.push({ x, y })
      }
      x = origin.x
      y = origin.y
      while (x < 3 && y < 3 && game.mosquitos[x++][y++].length && !animalLocations.some(animal => animal.x === x && animal.y === y)) {
        result.push({ x, y })
      }
      return result
    }
  }
  
  function getValidChameleonDestinations(origin: Coordinates, animalLocations: Coordinates[]) {
    const { x, y } = origin
    return [{ x: x + 1, y }, { x, y: y + 1 }, { x: x - 1, y }, { x, y: y - 1 }]
      .filter(({ x, y }) => x >= 0 && x <= 3 && y >= 0 && y <= 3 && !animalLocations.some(animal => animal.x === x && animal.y === y))
  }
  
  export function getAnimalLocations(game: GameState | GameView): Coordinates[] {
    return game.players.flatMap(p => {
      const locations: Coordinates[] = []
      if (p.toucan) locations.push(p.toucan)
      if (p.chameleon) locations.push(p.chameleon)
      return locations
    })
  }
  
  export function isValidDestination(game: GameState | GameView, animal: Animal, { x, y }: Coordinates) {
    const player = game.players.find(p => p.color === game.activePlayer)
    if (!player) return false
    const origin = animal === Chameleon ? player.chameleon : player.toucan
    if (!origin || (!player.chameleonMustMove && player.selectedMosquito == Mosquito.Blue)) {
      return !getAnimalLocations(game).some(location => location.x === x && location.y === y)
    }
    return getValidDestinations(game, animal).some(destination => destination.x === x && destination.y === y)
  }
  
  export function canMoveAnimal(game: GameState | GameView, animal: Animal) {
    return canMoveAnimalOfPlayer(game, animal, getActivePlayerState(game)!)
  }
  
  export function canMoveAnimalOfPlayer(game: GameState | GameView, animal: Animal, player: PlayerState) {
    const location = animal === Chameleon ? player.chameleon : player.toucan
    if (!location) {
      return true
    }
    if (player.chameleonMustMove) {
      return animal === Chameleon
    }
    if (animal === Chameleon && player.chameleon && (getPondsWithMosquitoAroundChameleonOfPlayer(game, player).length == 0 || getValidChameleonDestinations(player.chameleon, getAnimalLocations(game)).length == 0)) {
      return false
    }
    if (animal === Toucan && getValidDestinationsOfPlayer(game, Toucan, player).length == 0) {
      return false
    }
    return true
  }
  
  export function getPondsWithMosquitoAroundChameleon(game: GameState | GameView) {
    return getPondsWithMosquitoAroundChameleonOfPlayer(game, getActivePlayerState(game))
  }
  
  export function getPondsWithMosquitoAroundChameleonOfPlayer(game: GameState | GameView, player: PlayerState | undefined) {
    const location = player?.chameleon
    if (!location) return []
    const pondSpaces: Coordinates[] = []
    if (location.x > 0 && location.y > 0 && game.mosquitos[location.x - 1][location.y - 1].length > 0) {
      pondSpaces.push({ x: location.x - 1, y: location.y - 1 })
    }
    if (location.x > 0 && location.y < 3 && game.mosquitos[location.x - 1][location.y].length > 0) {
      pondSpaces.push({ x: location.x - 1, y: location.y })
    }
    if (location.x < 3 && location.y > 0 && game.mosquitos[location.x][location.y - 1].length > 0) {
      pondSpaces.push({ x: location.x, y: location.y - 1 })
    }
    if (location.x < 3 && location.y < 3 && game.mosquitos[location.x][location.y].length > 0) {
      pondSpaces.push({ x: location.x, y: location.y })
    }
    return pondSpaces
  }
  
  export function chameleonCanEat(game: GameState | GameView, x: number, y: number) {
    if (!game.mosquitos[x][y].length) return false
    const player = getActivePlayerState(game)
    if (!player || !player.chameleon || player.chameleonMustMove) return false
    return (player.chameleon.x === x || player.chameleon.x === x + 1) && (player.chameleon.y === y || player.chameleon.y === y + 1)
  
  }