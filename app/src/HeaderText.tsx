import { Animal } from '@gamepark/mosquito-show/animals/Animal'
import { Mosquito } from '@gamepark/mosquito-show/material/MosquitoEffect'
import { getPlayerName } from '@gamepark/mosquito-show/MosquitoShowOptions'
import { Move, skipTurnMove } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { canMoveAnimal, canMoveAnimalOfPlayer } from '@gamepark/mosquito-show/utils/AnimalUtils'
import { getActivePlayerState, isPlacementPhase } from '@gamepark/mosquito-show/utils/GameUtils'
import { usePlay, usePlayerId } from '@gamepark/react-client'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import LocalGameView from './LocalGameView'
import Button from './material/util/Button'

const { Blue, Grey, Red, White } = Mosquito
const { Toucan, Chameleon } = Animal

type Props = {
  loading: boolean
  game?: LocalGameView
}

export default function HeaderText({ loading, game }: Props) {
  const { t } = useTranslation()
  const play = usePlay()
  const playerId = usePlayerId()
  const gameOver = game !== undefined && getActivePlayerState(game) === undefined

  if (!game || loading) return <>{t('Game loading...')}</>
  if (gameOver) return <>{getEndOfGameText(t, game, playerId)}</>
  return <>{getText(t, play, game, playerId)}</>
}

function getText(t: TFunction, play: (move: Move) => void, game: LocalGameView, playerId: PlayerColor) {
  if (isPlacementPhase(game)) {
    if (game.activePlayer === playerId) {
      return t('You ({player}) have to place an animal on an empty jungle space', { player: getPlayerName(playerId, t) })
    } else {
      return t('{player} has to place an animal on an empty jungle space', { player: getPlayerName(game.activePlayer!, t) })
    }
  } else if (game.selectedAnimal) {
    if (game.selectedAnimal === Chameleon) {
      if (getActivePlayerState(game)!.selectedMosquito === Blue) {
        if (game.activePlayer === playerId) {
          return t('Choose an empty jungle space on the board')
        } else {
          return t('{player} has to choose an empty jungle space on the board', { player: getPlayerName(game.activePlayer!, t) })
        }
      } else if (getActivePlayerState(game)?.chameleonMustMove) {
        if (game.activePlayer === playerId) {
          return t('Move your chameleon to an empty orthogonal jungle space')
        } else {
          return t('{player} has to move the chameleon to an empty orthogonal jungle space', { player: getPlayerName(game.activePlayer!, t) })
        }
      } else {
        if (game.activePlayer === playerId) {
          return t('Eat a mosquito from an adjacent pond')
        } else {
          return t('{player} has to eat a mosquito from an adjacent pond', { player: getPlayerName(game.activePlayer!, t) })
        }
      }
    } else {
      if (getActivePlayerState(game)!.selectedMosquito === Blue) {
        if (game.activePlayer === playerId) {
          return t('Choose an empty jungle space on the board')
        } else {
          return t('{player} has to choose an empty jungle space on the board', { player: getPlayerName(game.activePlayer!, t) })
        }
      } else {
        if (game.activePlayer === playerId) {
          return t('Select a diagonally destination you want your toucan to move to')
        } else {
          return t('{player} has to select a diagonally destination for the toucan', { player: getPlayerName(game.activePlayer!, t) })
        }
      }
    }
  } else if (game.players.some(player => player.eatenMosquitos.length > 0) && !game.players.some(player => player.selectedMosquito !== undefined)) {
    if (game.activePlayer === playerId) {
      return t('Choose an eaten mosquito to apply his effect')
    } else {
      return t('{player} has to choose an eaten mosquito to apply his effect', { player: getPlayerName(game.activePlayer!, t) })
    }
  } else if (game.players.some(player => player.selectedMosquito !== undefined)) {
    const selectedMoquito = getActivePlayerState(game)!.selectedMosquito
    if (selectedMoquito === Blue) {
      if (game.activePlayer === playerId) {
        return t('Choose an animal to move it to any other empty jungle space on the board')
      } else {
        return t('{player} has to choose an animal to move it to any other empty jungle space on the board', { player: getPlayerName(game.activePlayer!, t) })
      }
    } else if (selectedMoquito === Grey) {
      if (game.selectedPondSpace) {
        if (game.activePlayer === playerId) {
          return t('Choose another or an empty pond')
        } else {
          return t('{player} has to choose another or an empty pond', { player: getPlayerName(game.activePlayer!, t) })
        }
      } else {
        if (game.activePlayer === playerId) {
          return t('Choose a mosquito to move it on the top of another or empty pond')
        } else {
          return t('{player} has to choose a mosquito to move it on the top of another or empty pond', { player: getPlayerName(game.activePlayer!, t) })
        }
      }
    } else if (selectedMoquito === Red) {
      if (game.activePlayer === playerId) {
        return t('Choose an opponent animal. Your opponent must move this animal on their next move')
      } else {
        return t('{player} has to choose one of your animals. You must move this animal on your next move', { player: getPlayerName(game.activePlayer!, t) })
      }
    } else if (selectedMoquito === White) {
      if (game.activePlayer === playerId) {
        return t('Choose a mosquito to discard it')
      } else {
        return t('{player} has to choose a mosquito to discard it', { player: getPlayerName(game.activePlayer!, t) })
      }
    }
  } else if (game.players.some(player => player.animalForcedToMove !== undefined)) {
    const forcedAnimal = getActivePlayerState(game)!.animalForcedToMove!
    if (!canMoveAnimal(game, forcedAnimal)) {
      if (!getActivePlayerState(game)?.skippedTurn) {
        if (game.activePlayer === playerId) {
          return <Trans defaults='<0>skip your turn</0> because you cannot move the forced {forcedAnimalString}!'
            components={[<Button onClick={() => play(skipTurnMove())} />]}
            values={{ forcedAnimalString: (forcedAnimal === Chameleon ? 'chameleon' : 'toucan') }} />
        } else {
          return t('{player} has to skip the turn because the ' + (forcedAnimal === Chameleon ? 'chameleon' : 'toucan') + ' cannot move!', { player: getPlayerName(game.activePlayer!, t) })
        }
      }
    } else {
      if (game.activePlayer === playerId) {
        return t('Your opponent forced you to select the ' + (forcedAnimal === Chameleon ? 'chameleon' : 'toucan') + '!')
      } else {
        return t('{player} has to select the ' + (forcedAnimal === Chameleon ? 'chameleon' : 'toucan') + '!', { player: getPlayerName(game.activePlayer!, t) })
      }
    }
  }
  //TODO SelectableAnimals?
  return game.activePlayer === playerId ? t('Select an animal') : t('{player} has to select an animal', { player: getPlayerName(game.activePlayer!, t) })
}

function getEndOfGameText(t: TFunction, game: LocalGameView, playerId: PlayerColor) {
  let playerHas9Golden
  let playerIsBlocked
  for (const player of game.players) {
    if (player.goldenMosquitos >= 9) {
      playerHas9Golden = player
    } else if (!canMoveAnimalOfPlayer(game, Toucan, player) && !canMoveAnimalOfPlayer(game, Chameleon, player)) {
      playerIsBlocked = player
    }
  }

  if (playerHas9Golden) {
    if (playerHas9Golden.color === playerId) {
      return t('Victory! You win the game with {score} golden mosquitos', { score: playerHas9Golden.goldenMosquitos })
    } else {
      return t('Game Over! {player} wins the game with {score} golden mosquitos', { player: getPlayerName(playerHas9Golden.color, t), score: playerHas9Golden.goldenMosquitos })
    }
  } else if (playerIsBlocked) {
    if (playerIsBlocked.color !== playerId) {
      return t('Victory! You blocked your opponent!')
    } else {
      return t('Game Over! You are blocked by your opponent!')
    }
  }

  return t('Game Over')
}
