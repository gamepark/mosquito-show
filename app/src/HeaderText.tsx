import { Animal } from '@gamepark/mosquito-show/animals/Animal'
import { canMoveAnimalOfPlayer, getActivePlayerState } from '@gamepark/mosquito-show/MosquitoShow'
import { getPlayerName } from '@gamepark/mosquito-show/MosquitoShowOptions'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { usePlayerId } from '@gamepark/react-client'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import LocalGameView from './LocalGameView'

type Props = {
  loading: boolean
  game?: LocalGameView
}

export default function HeaderText({ loading, game }: Props) {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const gameOver = game !== undefined && getActivePlayerState(game) === undefined

  if (!game || loading) return <>{t('Game loading...')}</>
  if (gameOver) return <>{getEndOfGameText(t, game, playerId)}</>
  return <>Your color: {getPlayerName(playerId, t)} - Active player: {getPlayerName(game.activePlayer!, t)}</>
}

function getEndOfGameText(t: TFunction, game: LocalGameView, playerId: PlayerColor) {
  let playerHas9Golden
  let playerIsBlocked
  for (const player of game.players) {
    if (player.goldenMosquitos >= 9) {
      playerHas9Golden = player
    } else if (!canMoveAnimalOfPlayer(game, Animal.Toucan, player) && !canMoveAnimalOfPlayer(game, Animal.Chameleon, player)) {
      console.log("GEBLOCKT!")
      playerIsBlocked = player
    }
  }

  console.log(playerHas9Golden)
  console.log(playerIsBlocked)
  console.log(playerId)

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
      return t('Game Over! You are blocked by your opponent')
    }
  }

  return t('Game Over')
}
