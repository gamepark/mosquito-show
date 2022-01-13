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
import { playerColorBlue, playerColorOrange } from './styles'

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
      return t('placement')
    } else {
      return t('placement.other', { player: getPlayerName(game.activePlayer!, t) })
    }
  } else if (game.selectedAnimal) {
    if (game.selectedAnimal === Chameleon) {
      if (getActivePlayerState(game)!.selectedMosquito === Blue) {
        if (game.activePlayer === playerId) {
          return t('effect.blue.step2')
        } else {
          return t('effect.blue.step2.other', { player: getPlayerName(game.activePlayer!, t) })
        }
      } else if (getActivePlayerState(game)?.chameleonMustMove) {
        if (game.activePlayer === playerId) {
          return t('chameleon.move')
        } else {
          return t('chameleon.move.other', { player: getPlayerName(game.activePlayer!, t) })
        }
      } else {
        if (game.activePlayer === playerId) {
          return t('chameleon.eat')
        } else {
          return t('chameleo.eat.other', { player: getPlayerName(game.activePlayer!, t) })
        }
      }
    } else {
      if (getActivePlayerState(game)!.selectedMosquito === Blue) {
        if (game.activePlayer === playerId) {
          return t('effect.blue.step2')
        } else {
          return t('effect.blue.step2.other', { player: getPlayerName(game.activePlayer!, t) })
        }
      } else {
        if (game.activePlayer === playerId) {
          return t('toucan.move')
        } else {
          return t('toucan.move.other', { player: getPlayerName(game.activePlayer!, t) })
        }
      }
    }
  } else if (game.players.some(player => player.eatenMosquitos.length > 0) && !game.players.some(player => player.selectedMosquito !== undefined)) {
    if (game.activePlayer === playerId) {
      return t('effect.choose')
    } else {
      return t('effect.choose.other', { player: getPlayerName(game.activePlayer!, t) })
    }
  } else if (game.players.some(player => player.selectedMosquito !== undefined)) {
    const selectedMoquito = getActivePlayerState(game)!.selectedMosquito
    if (selectedMoquito === Blue) {
      if (game.activePlayer === playerId) {
        return t('effect.blue.step1')
      } else {
        return t('effect.blue.step1.other', { player: getPlayerName(game.activePlayer!, t) })
      }
    } else if (selectedMoquito === Grey) {
      if (game.selectedPondSpace) {
        if (game.activePlayer === playerId) {
          return t('effect.grey.step2')
        } else {
          return t('effect.grey.step2.other', { player: getPlayerName(game.activePlayer!, t) })
        }
      } else {
        if (game.activePlayer === playerId) {
          return t('effect.grey.step1')
        } else {
          return t('effect.grey.step1.other', { player: getPlayerName(game.activePlayer!, t) })
        }
      }
    } else if (selectedMoquito === Red) {
      if (game.activePlayer === playerId) {
        return t('effect.red')
      } else {
        return t('effect.red.other', { player: getPlayerName(game.activePlayer!, t) })
      }
    } else if (selectedMoquito === White) {
      if (game.activePlayer === playerId) {
        return t('effect.white')
      } else {
        return t('effect.white.other', { player: getPlayerName(game.activePlayer!, t) })
      }
    }
  } else if (game.players.some(player => player.animalForcedToMove !== undefined)) {
    const forcedAnimal = getActivePlayerState(game)!.animalForcedToMove!
    if (!canMoveAnimal(game, forcedAnimal)) {
      if (!getActivePlayerState(game)?.skippedTurn) {
        if (game.activePlayer === playerId) {
          return <Trans defaults='skip.turn'
            components={[<Button color={playerId === PlayerColor.Blue ? playerColorBlue : playerColorOrange} onClick={() => play(skipTurnMove())} />]}
            values={{ animal: forcedAnimal }} />
        } else {
          return t('skip.turn.other', { player: getPlayerName(game.activePlayer!, t), animal: forcedAnimal })
        }
      }
    } else {
      if (game.activePlayer === playerId) {
        return t('animal.select.forced', {animal: forcedAnimal})
      } else {
        return t('animal.select.forced.other', { player: getPlayerName(game.activePlayer!, t), animal: forcedAnimal })
      }
    }
  }

  let selectableAnimals = []
  let blockedAnimals = []
  canMoveAnimal(game, Chameleon)?selectableAnimals.push(Chameleon):blockedAnimals.push(Chameleon)
  canMoveAnimal(game, Toucan)?selectableAnimals.push(Toucan):blockedAnimals.push(Toucan)
  
  if(selectableAnimals.length === 2){
    if (game.activePlayer === playerId) {
      return t('animal.select')
    } else {
      return t('animal.select.other', { player: getPlayerName(game.activePlayer!, t)})
    }
  } else {
    if (game.activePlayer === playerId) {
      return t('animal.select.specific', {animal: selectableAnimals[0], blocked: blockedAnimals[0]})
    } else {
      return t('animal.select.specific.other', { player: getPlayerName(game.activePlayer!, t) , animal: selectableAnimals[0], blocked: blockedAnimals[0]})
    }
  }
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
      return t('game.end.golden')
    } else {
      return t('game.end.golden.other', { player: getPlayerName(playerHas9Golden.color, t) })
    }
  } else if (playerIsBlocked) {
    if (playerIsBlocked.color === playerId) {
      return t('game.end.block')
    } else {
      return t('game.end.block.other', { player: getPlayerName(playerIsBlocked.color, t) })
    }
  }

  return t('Game Over')
}
