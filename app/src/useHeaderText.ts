import GameView from '@gamepark/mosquito-show/GameView'
import {useTranslation} from 'react-i18next'

export default function useHeaderText(game?: GameView, loading: boolean = false) {
  const {t} = useTranslation()
  return loading ? t('Game loading…') : `Loaded! Now what? Your player id is ${game?.players[0].color}`
}