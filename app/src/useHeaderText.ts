import { useTranslation } from 'react-i18next'

export default function useHeaderText(loading: boolean = false) {
  const {t} = useTranslation()
  return loading ? t('Game loading…') : `Loaded! Now what? Your player id is 1`
}