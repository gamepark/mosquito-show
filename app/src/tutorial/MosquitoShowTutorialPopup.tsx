/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GameView from '@gamepark/mosquito-show/GameView'
import { Move } from '@gamepark/mosquito-show/moves'
import PlayerColor from '@gamepark/mosquito-show/PlayerColor'
import { isOver } from '@gamepark/mosquito-show/utils/GameUtils'
import { animationPaused, Tutorial, useActions, useFailures, usePlayerId } from '@gamepark/react-client'
import { Dialog, Picture } from '@gamepark/react-components'
import { TFunction } from 'i18next'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import Arrow from '../tutorial/tutorial-arrow-white.png'
import Button from '../util/Button'

const TutorialPopup: FC<{ game: GameView, tutorial: Tutorial }> = ({ game, tutorial }) => {
  const { t } = useTranslation()
  const playerId = usePlayerId<PlayerColor>()
  const actions = useActions<Move, PlayerColor>()
  const actionsNumber = actions !== undefined ? actions.filter(action => action.playerId === playerId).length : 0
  const previousActionNumber = useRef(actionsNumber)
  const [tutorialIndex, setTutorialIndex] = useState(0)
  const [tutorialDisplay, setTutorialDisplay] = useState(tutorialDescription.length > 0)
  const [failures] = useFailures()
  const dispatch = useDispatch()
  const [hideEndInfo, setHideEndInfo] = useState(false)
  const platformUri = process.env.REACT_APP_PLATFORM_URI ?? 'https://game-park.com'
  const discordUri = 'https://discord.gg/nMSDRag'

  const moveTutorial = (deltaMessage: number) => {
    setTutorialIndex(tutorialIndex + deltaMessage)
    setTutorialDisplay(true)
    if (deltaMessage > 0) {
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
    console.log(tutorialIndex)
  }, [])

  useEffect(() => {
    if (tutorialIndex === 1) {
      setTutorialDisplay(true)
    }
  }, [tutorialIndex])

  useEffect(() => {
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
  }, [actionsNumber, failures])

  useEffect(() => {
    tutorial.setOpponentsPlayAutomatically(true)
  }, [])

  const currentMessage = tutorialMessage(tutorialIndex)

  const displayPopup = tutorialDisplay

  return (
    <>
      <Dialog css={[dialogCss, currentMessage ? popupPosition(currentMessage) : css`display: none;`]} backdropCss={backdropCss} open={displayPopup}
        onBackdropClick={() => setTutorialDisplay(false)}>
        <div css={closePopupStyle} onClick={() => setTutorialDisplay(false)}><FontAwesomeIcon icon={faTimes} /></div>
        {currentMessage?.title && <h2>{currentMessage.title(t)}</h2>}
        {currentMessage && <p>{currentMessage.text(t)}</p>}
        {tutorialIndex > 0 && <Button css={buttonTutoStyle} playerColor={PlayerColor.Blue} onClick={() => moveTutorial(-1)}>{'<<'}</Button>}
        <Button css={buttonTutoStyle} playerColor={PlayerColor.Blue} onClick={() => moveTutorial(1)}>{t('OK')}</Button>
      </Dialog>

      {
        !displayPopup &&
        <Button css={[buttonTutoStyle, resetStyle]} playerColor={PlayerColor.Blue} onClick={() => resetTutorialDisplay()}>{t('Show Tutorial')}</Button>
      }

      {
        currentMessage && currentMessage.arrow &&
        <Picture alt="Arrow pointing toward current tutorial interest" src={Arrow} draggable="false"
          css={[arrowStyle(currentMessage.arrow.angle), displayPopup ? showArrowStyle(currentMessage.arrow.top, currentMessage.arrow.left) : hideArrowStyle]} />
      }

      {
        isOver(game) && !hideEndInfo &&
        <Dialog css={[dialogCss, popupPosition(tutorialEndGame)]} backdropCss={backdropCss} open={!hideEndInfo} onBackdropClick={() => setHideEndInfo(true)}>
          <div css={closePopupStyle} onClick={() => setHideEndInfo(true)}><FontAwesomeIcon icon={faTimes} /></div>
          <h2 css={textEndStyle}>{tutorialEndGame.title(t)}</h2>
          <p css={textEndStyle}>{tutorialEndGame.text(t)}</p>
          <Button css={[buttonTutoStyle, endSize]} playerColor={PlayerColor.Blue} onClick={() => resetTutorial()}>{t('Restart the tutorial')}</Button>
          <Button css={[buttonTutoStyle, endSize]} playerColor={PlayerColor.Blue}
            onClick={() => window.location.href = platformUri}>{t('Play with friends')}</Button>
          <Button css={[buttonTutoStyle, endSize]} playerColor={PlayerColor.Blue}
            onClick={() => window.location.href = discordUri}>{t('Find players')}</Button>
        </Dialog>
      }

    </>
  )

}

export function resetTutorial() {
  localStorage.removeItem('MosquitoShow')
  window.location.reload()
}

const buttonTutoStyle = css`
  width: 5em;
  height: 1.5em;
  margin-right: 1em;
`

const endSize = css`
  width: auto;
  margin-top: 1em;
`

const textEndStyle = css`
  color: black;
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
  color: black;

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
  width: 20%;
`

const hideArrowStyle = css`
  display: none;
`

const resetStyle = css`
  position: absolute;
  text-align: center;
  top: 44%;
  right: 0;
  font-size: 4em;
  width: auto;
`

type TutorialStepDescription = {
  title?: (t: TFunction) => string
  text: (t: TFunction) => string
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
  [ // 1
    {
      title: (t: TFunction) => t('tuto.welcome'),
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
      boxTop: 45,
      boxLeft: 65,
      boxWidth: 50,
      arrow: {
        angle: 315,
        top: 20,
        left: 25
      }
    }
  ],
  [ // 2
    {
      text: (t: TFunction) => t('tuto.place.opp.c'),
      boxTop: 35,
      boxLeft: 45,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 28,
        left: 11
      }
    },
    {
      text: (t: TFunction) => t('tuto.place.c'),
      boxTop: 35,
      boxLeft: 45,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 28,
        left: 11
      }
    }
  ],
  [ // 3
    {
      text: (t: TFunction) => t('tuto.place.opp.t'),
      boxTop: 47,
      boxLeft: 36,
      boxWidth: 40,
      arrow: {
        angle: 0,
        top: 34,
        left: 28
      }
    },
    {
      title: (t: TFunction) => t('tuto.move.title'),
      text: (t: TFunction) => t('tuto.place.t'),
      boxTop: 40,
      boxLeft: 53,
      boxWidth: 40,
      arrow: {
        angle: 0,
        top: 27,
        left: 46
      }
    },
    {
      text: (t: TFunction) => t('tuto.move.rules'),
      boxTop: 35,
      boxLeft: 45,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 28,
        left: 11
      }
    },
    {
      text: (t: TFunction) => t('tuto.move.rules2'),
      boxTop: 35,
      boxLeft: 45,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 28,
        left: 11
      }
    },
    {
      text: (t: TFunction) => t('tuto.move.rules.c'),
      boxTop: 35,
      boxLeft: 45,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 28,
        left: 11
      }
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.simultaneous'),
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 40
    },
    {
      text: (t: TFunction) => t('tuto.validate'),
      boxTop: 19,
      boxLeft: 55,
      boxWidth: 40,
      arrow: {
        angle: 0,
        top: 6,
        left: 47
      }
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.resolve'),
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 40
    },
    {
      text: (t: TFunction) => t('tuto.resolve.order'),
      boxTop: 74,
      boxLeft: 50,
      boxWidth: 50,
      arrow: {
        angle: -90,
        top: 68,
        left: 11
      }
    },
    {
      text: (t: TFunction) => t('tuto.townHall'),
      boxTop: 74,
      boxLeft: 50,
      boxWidth: 50,
      arrow: {
        angle: -90,
        top: 68,
        left: 11
      },
      resumeAnimations: true
    },
    {
      text: (t: TFunction) => t('tuto.patrol.palace'),
      boxTop: 54,
      boxLeft: 42,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 47,
        left: 8
      },
      resumeAnimations: true
    },
    {
      text: (t: TFunction) => t('tuto.token.both'),
      boxTop: 31,
      boxLeft: 48,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 25,
        left: 14
      }
    },
    {
      text: (t: TFunction) => t('tuto.action.wheel'),
      boxTop: 70,
      boxLeft: 35,
      boxWidth: 40,
      arrow: {
        angle: 90,
        top: 63,
        left: 49
      }
    },
    {
      text: (t: TFunction) => t('tuto.action.order'),
      boxTop: 70,
      boxLeft: 45,
      boxWidth: 40,
      arrow: {
        angle: 90,
        top: 63,
        left: 59
      }
    },
    {
      text: (t: TFunction) => t('tuto.action.choice'),
      boxTop: 77,
      boxLeft: 56,
      boxWidth: 40,
      arrow: {
        angle: 90,
        top: 71,
        left: 70
      }
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.red.choice'),
      boxTop: 40,
      boxLeft: 50,
      boxWidth: 40
    },
    {
      text: (t: TFunction) => t('tuto.actions.resolution'),
      boxTop: 40,
      boxLeft: 50,
      boxWidth: 40,
      resumeAnimations: true
    },
    {
      text: (t: TFunction) => t('tuto.district.after.actions'),
      boxTop: 15,
      boxLeft: 50,
      boxWidth: 40
    },
    {
      text: (t: TFunction) => t('tuto.tavern'),
      boxTop: 15,
      boxLeft: 50,
      boxWidth: 40
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.patrol'),
      boxTop: 56,
      boxLeft: 36,
      boxWidth: 40,
      arrow: {
        angle: 0,
        top: 43,
        left: 27
      },
      resumeAnimations: true
    },
    {
      text: (t: TFunction) => t('tuto.jail.patrol'),
      boxTop: 52,
      boxLeft: 60,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 46,
        left: 26
      },
      resumeAnimations: true
    },
    {
      text: (t: TFunction) => t('tuto.jail.choice'),
      boxTop: 20,
      boxLeft: 50,
      boxWidth: 40
    }
  ],
  [
    {
      text: (t: TFunction) => t('tuto.new.day'),
      boxTop: 81,
      boxLeft: 25,
      boxWidth: 40,
      arrow: {
        angle: -180,
        top: 81,
        left: 14
      },
      resumeAnimations: true
    },
    {
      text: (t: TFunction) => t('tuto.day.card'),
      boxTop: 81,
      boxLeft: 29,
      boxWidth: 40,
      arrow: {
        angle: -180,
        top: 81,
        left: 19
      },
      resumeAnimations: true
    },
    {
      text: (t: TFunction) => t('tuto.last.day.card'),
      boxTop: 61,
      boxLeft: 27,
      boxWidth: 40,
      arrow: {
        angle: -180,
        top: 61,
        left: 17
      }
    },
    {
      text: (t: TFunction) => t('tuto.district.effects'),
      boxTop: 23,
      boxLeft: 42,
      boxWidth: 40,
      arrow: {
        angle: -90,
        top: 17,
        left: 8
      }
    },
    {
      text: (t: TFunction) => t('tuto.prince.skills'),
      boxTop: 56,
      boxLeft: 60,
      boxWidth: 40,
      arrow: {
        angle: -180,
        top: 56,
        left: 51
      }
    },
    {
      text: (t: TFunction) => t('tuto.you.play'),
      boxTop: 40,
      boxLeft: 50,
      boxWidth: 40
    }
  ]
]

const tutorialEndGame = {
  title: (t: TFunction) => t('Congratulations'),
  text: (t: TFunction) => t('tuto.over'),
  boxTop: 50,
  boxLeft: 50,
  boxWidth: 120
}

export const dialogCss = css`
  position: relative;
  background-color: #d9cc58;
  text-align: center;
  padding: 5em;
  color: black;
  border-radius: 3em;
  box-shadow: 0 0 3em black, 0 0 0.5em black, 0 0 0.5em black;
  max-width: 100em;

  & > h2 {
    position: relative;
    font-size: 5em;
    margin: 0 1em 0.5em;
    text-align: center;
  }

  & > p {
    position: relative;
    text-align: left;
    white-space: break-spaces;
    font-size: 3em;
    margin: 0.8em auto;
  }

  & > button {
    font-size: 3.5em;
  }
`

export default TutorialPopup