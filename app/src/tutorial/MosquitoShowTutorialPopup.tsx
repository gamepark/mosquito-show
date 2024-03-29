/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GameView from '@gamepark/mosquito-show/GameView'
import { Move } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { isOver } from '@gamepark/mosquito-show/utils/GameUtils'
import { animationPaused, Tutorial, useActions, useFailures } from '@gamepark/react-client'
import { Dialog, Picture } from '@gamepark/react-components'
import { TFunction } from 'i18next'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import Images from '../material/Images'
import Arrow from '../tutorial/tutorial-arrow-white.png'
import TutorialButton from './TutorialButton'

const TutorialPopup: FC<{ game: GameView, tutorial: Tutorial }> = ({ game, tutorial }) => {
  const { t } = useTranslation()
  const actions = useActions<Move, PlayerColor>()
  const actionsNumber = (actions || []).filter(action => !action.delayed).length;
  const previousActionNumber = useRef(actionsNumber)
  const [tutorialIndex, setTutorialIndex] = useState(0)
  const [tutorialDisplay, setTutorialDisplay] = useState(tutorialDescription.length > 0)
  const [failures] = useFailures()
  const dispatch = useDispatch()
  const [hideEndInfo, setHideEndInfo] = useState(false)
  const platformUri = process.env.REACT_APP_PLATFORM_URI ?? 'https://game-park.com'
  const discordUri = 'https://discord.gg/nMSDRag'

  const moveTutorial = (deltaMessage: number) => {
    let currentStep = actionsNumber;
    if (tutorialDescription[currentStep] && tutorialDescription[currentStep][tutorialIndex] && tutorialDescription[currentStep][tutorialDescription[currentStep].length - 1].opponentAction) {
      tutorial.playNextMoves(tutorialDescription[currentStep][tutorialIndex].opponentAction)
    }
    setTutorialIndex(tutorialIndex + deltaMessage)
    setTutorialDisplay(true)
    if (false && deltaMessage > 0) {
      if (currentMessage.resumeAnimations) {
        dispatch(animationPaused(false))
      }
    }
  }

  const resetTutorialDisplay = () => {
    if (isOver(game)) {
      setHideEndInfo(false)
    } else {
      setTutorialIndex(0)
      setTutorialDisplay(true)
    }
  }

  const tutorialMessage = (index: number) => {
    let currentStep = actionsNumber
    while (!tutorialDescription[currentStep]) {
      currentStep--
    }
    return tutorialDescription[currentStep][index]
  }

  useEffect(() => {
    setTutorialDisplay(true)
  }, [])

  useEffect(() => {
    if (actionsNumber === 0 || !tutorialDescription[actionsNumber - 1]) {
      return;
    }

    if (tutorialDescription[actionsNumber - 1][tutorialDescription[actionsNumber - 1].length - 1]?.opponentAction) {
      tutorial.playNextMoves(tutorialDescription[actionsNumber - 1][tutorialDescription[actionsNumber - 1].length - 1]?.opponentAction);
    }
  }, [game.activePlayer])

  useEffect(() => {
    if (actionsNumber >= tutorialDescription.length) {
      tutorial.setOpponentsPlayAutomatically(true)
    }
    if (previousActionNumber.current > actionsNumber) {
      setTutorialDisplay(false)
    } else if (tutorialDescription[actionsNumber]) {
      resetTutorialDisplay()
    }
    previousActionNumber.current = actionsNumber
  }, [actionsNumber])

  useEffect(() => {
    if (failures.length) {
      setTutorialIndex(tutorialDescription[actionsNumber].length - 1)
      setTutorialDisplay(true)
    }
  }, [failures])

  const currentMessage = tutorialMessage(tutorialIndex)

  const displayPopup = tutorialDisplay && currentMessage && !failures.length

  return (
    <>
      <Dialog css={[popupStyle, popupLightStyle, currentMessage ? popupPosition(currentMessage) : css`display: none;`]} backdropCss={backdropCss} open={displayPopup}
        onBackdropClick={() => setTutorialDisplay(false)}>
        <div css={closePopupStyle} onClick={() => setTutorialDisplay(false)}><FontAwesomeIcon icon={faTimes} /></div>
        {currentMessage?.title && <h2>{currentMessage.title(t)}</h2>}
        {currentMessage && <p>{currentMessage.text(t)}</p>}
        {tutorialIndex > 0 &&
          <TutorialButton css={buttonTutoStyle} onClick={() => moveTutorial(-1)}>{'<<'}</TutorialButton>}
        <TutorialButton css={buttonTutoStyle} onClick={() => moveTutorial(1)}>{t('OK')}</TutorialButton>
      </Dialog>

      {
        !displayPopup && actionsNumber < tutorialDescription.length &&
        <TutorialButton css={[buttonTutoStyle, resetStyle]} onClick={() => resetTutorialDisplay()}>{t('Show Tutorial')}</TutorialButton>
      }

      {
        currentMessage && currentMessage.arrow &&
        <Picture alt="Arrow pointing toward current tutorial interest" src={Arrow} draggable="false"
          css={[arrowStyle(currentMessage.arrow.angle), displayPopup ? showArrowStyle(currentMessage.arrow.top, currentMessage.arrow.left) : hideArrowStyle]} />
      }

      {
        isOver(game) && !hideEndInfo &&
        <Dialog css={[popupStyle, popupLightStyle, popupPosition(tutorialEndGame)]} backdropCss={backdropCss} open={!hideEndInfo} onBackdropClick={() => setHideEndInfo(true)}>
          <div css={closePopupStyle} onClick={() => setHideEndInfo(true)}><FontAwesomeIcon icon={faTimes} /></div>
          <h2 css={textEndStyle}>{tutorialEndGame.title(t)}</h2>
          <p css={textEndStyle}>{tutorialEndGame.text(t)}</p>
          <TutorialButton css={[buttonTutoStyle, endSize]} onClick={() => resetTutorial()}>{t('Restart the tutorial')}</TutorialButton>
          <TutorialButton css={[buttonTutoStyle, endSize]}
            onClick={() => window.location.href = platformUri}>{t('Play with friends')}</TutorialButton>
          <TutorialButton css={[buttonTutoStyle, endSize]}
            onClick={() => window.location.href = discordUri}>{t('Find players')}</TutorialButton>
        </Dialog>
      }

    </>
  )

}

export function resetTutorial() {
  localStorage.removeItem('MosquitoShow')
  window.location.reload()
}

type TutorialStepDescription = {
  title?: (t: TFunction) => string
  text: (t: TFunction) => string
  opponentAction?: number,
  boxTop: number
  boxLeft: number
  boxWidth: number
  arrow?: {
    angle: number
    top: number
    left: number
  }
  resumeAnimations?: boolean
}

const tutorialDescription: TutorialStepDescription[][] = [
  [
    {
      title: (t: TFunction) => t('tuto.title'),
      text: (t: TFunction) => t('tuto.player'),
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 50
    },
    {
      text: (t: TFunction) => t('tuto.wincondition'),
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 50
    },
    {
      title: (t: TFunction) => t('tuto.place.title'),
      text: (t: TFunction) => t('tuto.place.t'),
      opponentAction: 1,
      boxTop: 44,
      boxLeft: 59,
      boxWidth: 50,
      arrow: {
        angle: 315,
        top: 18,
        left: 29
      }
    }
  ],
  [],
  [
    {
      text: (t: TFunction) => t('tuto.place.opp.c'),
      boxTop: 47,
      boxLeft: 55,
      boxWidth: 40,
      arrow: {
        angle: 180,
        top: 46,
        left: 51
      }
    },
    {
      text: (t: TFunction) => t('tuto.place.c'),
      opponentAction: 1,
      boxTop: 60,
      boxLeft: 58.5,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 57,
        left: 33
      }
    }
  ],
  [],
  [
    {
      text: (t: TFunction) => t('tuto.place.opp.t'),
      boxTop: 36,
      boxLeft: 66,
      boxWidth: 40,
      arrow: {
        angle: 225,
        top: 50,
        left: 42
      }
    },
    {
      title: (t: TFunction) => t('tuto.move.title'),
      text: (t: TFunction) => t('tuto.move.rules'),
      boxTop: 40,
      boxLeft: 50,
      boxWidth: 40
    },
    {
      text: (t: TFunction) => t('tuto.move.rules2'),
      boxTop: 40,
      boxLeft: 50,
      boxWidth: 40
    },
    {
      text: (t: TFunction) => t('tuto.move.rules.c'),
      boxTop: 25,
      boxLeft: 61,
      boxWidth: 40,
      arrow: {
        angle: -135,
        top: 40,
        left: 37
      }
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.move.rule.c2'),
      boxTop: 32,
      boxLeft: 65.5,
      boxWidth: 54,
      arrow: {
        angle: -90,
        top: 36,
        left: 33
      }
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.move.rule.blue'),
      boxTop: 40,
      boxLeft: 32,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 33,
        left: 6
      }
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.move.effect.blue'),
      boxTop: 59,
      boxLeft: 55,
      boxWidth: 40,
      arrow: {
        angle: -135,
        top: 72,
        left: 31
      }
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.move.flip'),
      opponentAction: 1,
      boxTop: 78,
      boxLeft: 52,
      boxWidth: 40
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.move.effect.golden'),
      opponentAction: 1,
      boxTop: 34,
      boxLeft: 43,
      boxWidth: 40
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.move.noflip'),
      boxTop: 74,
      boxLeft: 37,
      boxWidth: 40
    },
    {
      text: (t: TFunction) => t('tuto.move.effect.red'),
      boxTop: 72,
      boxLeft: 66,
      boxWidth: 40
    }
  ],
  [],
  [
    {
      text: (t: TFunction) => t('tuto.move.rule.red'),
      boxTop: 55,
      boxLeft: 75,
      boxWidth: 40
    }
  ],
  [],
  [
    {
      text: (t: TFunction) => t('tuto.move.rules.t'),
      opponentAction: 1,
      boxTop: 55,
      boxLeft: 70,
      boxWidth: 50
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.move.effect.white'),
      opponentAction: 2,
      boxTop: 74,
      boxLeft: 67,
      boxWidth: 50
    }
  ],
  [],
  [
    {
      text: (t: TFunction) => t('tuto.move.block'),
      boxTop: 75,
      boxLeft: 75,
      boxWidth: 40
    }
  ],
  [],
  [
    {
      text: (t: TFunction) => t('tuto.move.effect.grey'),
      boxTop: 50,
      boxLeft: 48,
      boxWidth: 45
    },
    {
      text: (t: TFunction) => t('tuto.move.effect.grey2'),
      boxTop: 74,
      boxLeft: 51,
      boxWidth: 45
    }
  ],
  [],
  [
    {
      text: (t: TFunction) => t('tuto.move.block2'),
      opponentAction: 2,
      boxTop: 75,
      boxLeft: 72,
      boxWidth: 40
    }
  ],
  [],
  [
    {
      text: (t: TFunction) => t('tuto.move.effect.golden2'),
      boxTop: 75,
      boxLeft: 75,
      boxWidth: 40
    },
    {
      text: (t: TFunction) => t('tuto.move.over'),
      boxTop: 55,
      boxLeft: 48,
      boxWidth: 40
    },
    {
      title: (t: TFunction) => t('tuto.hint.title'),
      text: (t: TFunction) => t('tuto.hint'),
      boxTop: 55,
      boxLeft: 48,
      boxWidth: 40
    }
  ]
]

const tutorialEndGame = {
  title: (t: TFunction) => t('tuto.end.title'),
  text: (t: TFunction) => t('tuto.end'),
  boxTop: 50,
  boxLeft: 48,
  boxWidth: 50
}

export const popupStyle = css`
  position: absolute;
  text-align: center;
  max-height: 70%;
  z-index: 102;
  border-radius: 1em;
  box-sizing: border-box;
  align-self: center;
  padding: 2%;
  margin: 0 2%;
  outline: none;
  box-shadow: 1em 2em 2.5em -1.5em hsla(0, 0%, 0%, 0.2);
  border-radius: 40em 3em 40em 3em/3em 40em 3em 40em;

  & > h2 {
    font-size: 5em;
    margin: 0;
    letter-spacing: 0.04em;
  }

  & > p {
    font-size: 4em;
    margin: 2% 0;
  }

  & > button {
    font-size: 4em;
  }
`

export const popupLightStyle = css`
  background-color: #e9e9e9;
  background: url(${Images.BoardBack});
  color: rgba(255,255,255,0.8);
  border: solid 1em rgba(255,255,255,0.8);
`
const buttonTutoStyle = css`
  width: 3em;
  height: 1.2em;
  margin-right: 1em;
`

const endSize = css`
  width: auto;
  margin-top: 1em;
`

const textEndStyle = css`
  color: rgba(255,255,255,0.8);
`

const backdropCss = css`
  background-color: transparent;
  display: block;
  padding: 0 calc(50% - ${16 / 9 * 50}em);
  z-index: 1200;
`

const closePopupStyle = css`
  position: relative;
  float: right;
  text-align: center;
  margin-top: -2%;
  margin-right: -0%;
  font-size: 4em;
  color: rgba(255,255,255,0.8);

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

export const popupPosition = ({ boxWidth, boxTop, boxLeft, arrow }: TutorialStepDescription) => css`
  transition-property: width, top, left, transform;
  transition-duration: 0.7s;
  transition-timing-function: ease-in-out;
  width: ${boxWidth}%;
  top: ${boxTop}%;
  left: ${boxLeft}%;
  transform: translate(-50%, ${!arrow || arrow.angle % 180 !== 0 ? '-50%' : arrow.angle % 360 === 0 ? '0%' : '-100%'}) translateZ(30em);
`

const arrowStyle = (angle: number) => css`
  position: absolute;
  transform: rotate(${angle}deg) translateZ(30em);
  will-change: transform;
  z-index: 2000;
  transition-property: top, left, transform;
  transition-duration: 0.7s;
  transition-timing-function: ease-in-out;
`

const showArrowStyle = (top: number, left: number) => css`
  top: ${top}%;
  left: ${left}%;
  width: 10%;
  height: 10%;
`

const hideArrowStyle = css`
  display: none;
`

const resetStyle = css`
  position: absolute;
  text-align: center;
  top: 51%;
  right: 0;
  font-size: 4em;
  width: auto;
`
export default TutorialPopup