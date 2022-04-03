import { css } from "@emotion/react"
import PlayerColor from "@gamepark/mosquito-show/PlayerColor"
import PlayerState from "@gamepark/mosquito-show/PlayerState"
import { Avatar, SpeechBubbleDirection } from "@gamepark/react-client"
import { Picture } from "@gamepark/react-components"
import { FC, HTMLAttributes } from "react"
import Images from "../Images"

type MosquitoAvatarProps = {
    player?: PlayerState,
    playerInfo?: any,
    color?: PlayerColor
} & Omit<HTMLAttributes<HTMLElement>, 'color'>

const MosquitoAvatar: FC<MosquitoAvatarProps> = ({player, playerInfo, color,  ...props}) => {
    if (playerInfo?.avatar) {
        return <Avatar playerId={player!.color} speechBubbleProps={{direction: SpeechBubbleDirection.TOP_LEFT}} {...props}/>
    } else {
        return <Picture alt={'Player board'} src={playerDefaultImages.get(color || player!.color)} {...props} css={autoHeight}/>
    }
}

const autoHeight = css`
    height: auto !important;
`

export {
    MosquitoAvatar
}
//direction: speechBubbleDirection}

const playerDefaultImages = new Map<PlayerColor, any>();
playerDefaultImages.set(PlayerColor.Blue, Images.blueToucan);
playerDefaultImages.set(PlayerColor.Orange, Images.orangeToucan);