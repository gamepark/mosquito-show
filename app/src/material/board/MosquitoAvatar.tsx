/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { getPlayerName } from "@gamepark/mosquito-show/MosquitoShowOptions"
import PlayerColor from "@gamepark/mosquito-show/PlayerColor"
import PlayerState from "@gamepark/mosquito-show/PlayerState"
import { Avatar, PlayerTimer, SpeechBubbleDirection } from "@gamepark/react-client"
import { Picture } from "@gamepark/react-components"
import { FC, HTMLAttributes } from "react"
import { useTranslation } from "react-i18next"
import { playerboardSize, playerColorBlue, playerColorOrange } from "../../styles"
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
            <div css={userInfoBoard(player!.color)}>
                <div css={nameStyle}>{playerInfo?.name === undefined ? getPlayerName(player!.color, t) : playerInfo?.name}</div>
                <Avatar playerId={player!.color} speechBubbleProps={{ direction: SpeechBubbleDirection.TOP_RIGHT }} css={avatarSize} {...props} />
                <PlayerTimer playerId={player!.color} css={timerStyle} />
            </div>
        )
    } else {
        return (
            <div css={userInfoBoard(player!.color)}>
                <div css={nameStyle}>{playerInfo?.name === undefined ? getPlayerName(player!.color, t) : playerInfo?.name} </div>
                <Picture alt={'Player board'} src={playerDefaultImages.get(color || player!.color)} {...props} css={avatarSize} />
                <PlayerTimer playerId={player!.color} css={timerStyle} />
            </div>
        )
    }
}

const userInfoBoard = (color: PlayerColor) => css`
   height: 5em;
   width: ${playerboardSize - 0.5}em;
   background-color: ${color === PlayerColor.Blue ? playerColorBlue : playerColorOrange} 
`

const avatarSize = css`
   position: absolute;
   left: ${playerboardSize - 6}em;
   height: 4.5em;
   width: 4.5em;
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
  top: 0.5em;
  height: 3em;
  font-size: 2em;
`

export {
    MosquitoAvatar
}


const playerDefaultImages = new Map<PlayerColor, any>();
playerDefaultImages.set(PlayerColor.Blue, Images.blueToucan);
playerDefaultImages.set(PlayerColor.Orange, Images.orangeToucan);