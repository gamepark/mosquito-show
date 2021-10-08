import {OptionsSpec} from '@gamepark/rules-api'
import {TFunction} from 'i18next'
import GameState from './GameState'
import PlayerColor from './PlayerColor'

/**
 * This is the options for each players in the game.
 */
type MosquitoShowPlayerOptions = { id: PlayerColor }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type MosquitoShowOptions = { players: MosquitoShowPlayerOptions[] }

/**
 * Typeguard to help Typescript distinguish between a GameState and new game's options, for you main class constructor.
 * @param arg GameState or Game options
 * @return true if arg is a Game options
 */
export function isGameOptions(arg: GameState | MosquitoShowOptions): arg is MosquitoShowOptions {
  return (arg as GameState).mosquitos === undefined // TODO: implement Typeguard to identify ne game (like typeof (arg as GameState).deck === 'undefined')
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const MosquitoShowOptionsSpec: OptionsSpec<MosquitoShowOptions> = {
  players: {
    id: {
      label: t => t('Colour'),
      values: [PlayerColor.Blue, PlayerColor.Orange],
      valueSpec: color => ({label: t => getPlayerName(color, t)})
    }
  }
}

export function getPlayerName(playerId: PlayerColor, t: TFunction) {
  switch (playerId) {
    case PlayerColor.Blue:
      return t('Blue')
    case PlayerColor.Orange:
      return t('Orange')
  }
}
