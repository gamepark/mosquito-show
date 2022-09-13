import { css } from "@emotion/react"
import { getPlayerName } from "@gamepark/mosquito-show/MosquitoShowOptions"
import PlayerColor from "@gamepark/mosquito-show/PlayerColor"
import PlayerState from "@gamepark/mosquito-show/PlayerState"
import { Avatar, PlayerTimer, SpeechBubbleDirection } from "@gamepark/react-client"
import { Picture } from "@gamepark/react-components"
import { FC, HTMLAttributes } from "react"
import { useTranslation } from "react-i18next"
import Images from "../Images"

type MosquitoAvatarProps = {
    player?: PlayerState,
    playerInfo?: any,
    color?: PlayerColor
} & Omit<HTMLAttributes<HTMLElement>, 'color'>

const MosquitoAvatar: FC<MosquitoAvatarProps> = ({ player, playerInfo, color, ...props }) => {
    const { t } = useTranslation()
    if (playerInfo?.avatar) {
        return (
            <div>
                <Avatar playerId={player!.color} speechBubbleProps={{ direction: SpeechBubbleDirection.TOP_RIGHT }} {...props} />
                <h2 css={nameStyle}>{playerInfo?.name === undefined ? getPlayerName(player!.color, t) : playerInfo?.name}</h2>
                <PlayerTimer playerId={player!.color} css={timerStyle} />
            </div>
        )
    } else {
        return (
            <div>
                <Picture alt={'Player board'} src={playerDefaultImages.get(color || player!.color)} {...props} css={avatarSize} />
                <h2 css={nameStyle}>{playerInfo?.name === undefined ? getPlayerName(player!.color, t) : playerInfo?.name}</h2>
                <PlayerTimer playerId={player!.color} css={timerStyle} />
            </div>
        )
    }
}

const avatarSize = css`
    height: 10em;
`

const timerStyle = css`
  position: absolute;
  top: 5em;
  left: 5em;
  font-size: 2.5em;
  padding-top: 0.2em;
`

const nameStyle = css`
  position: absolute;
  top: 0.3em;
  left: 3.1em;
  max-width: 7.3em;
  font-size: 2.4em;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: 'Mulish', sans-serif;
`

export {
    MosquitoAvatar
}


const playerDefaultImages = new Map<PlayerColor, any>();
playerDefaultImages.set(PlayerColor.Blue, Images.blueToucan);
playerDefaultImages.set(PlayerColor.Orange, Images.orangeToucan);