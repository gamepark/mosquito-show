import { getActivePlayerState } from '@gamepark/mosquito-show/MosquitoShow'
import { getPlayerName } from '@gamepark/mosquito-show/MosquitoShowOptions'
import { usePlayerId } from '@gamepark/react-client'
import { useTranslation } from 'react-i18next'
import LocalGameView from './LocalGameView'

type Props = {
  loading: boolean
  game?: LocalGameView
}

export default function HeaderText({loading, game}: Props) {
  const {t} = useTranslation()
  const playerId = usePlayerId()
  const gameOver = game !== undefined && getActivePlayerState(game) === undefined
  
  if (!game || loading) return <>{t('Game loading...')}</>
  if(gameOver) return <>{t('Game is over')}</>
  return <>Your color: {getPlayerName(playerId, t)} - Active player: {getPlayerName(game.activePlayer!, t)}</>
}
