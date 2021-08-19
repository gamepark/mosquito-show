import { GameOptions, OptionsDescription, OptionType } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
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
export type MosquitoShowOptions = GameOptions<{}, MosquitoShowPlayerOptions>

/**
 * Typeguard to help Typescript distinguish between a GameState and new game's options, for you main class constructor.
 * @param arg GameState or Game options
 * @return true if arg is a Game options
 */
export function isGameOptions(arg: GameState | MosquitoShowOptions): arg is MosquitoShowOptions {
  return (arg as GameState).board === undefined // TODO: implement Typeguard to identify ne game (like typeof (arg as GameState).deck === 'undefined')
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const MosquitoShowOptionsDescription: OptionsDescription<{}, MosquitoShowPlayerOptions> = {
  players: {
    id: {
      type: OptionType.LIST,
      getLabel: (t: TFunction) => t('Empire'),
      values: Object.values(PlayerColor),
      getValueLabel: (player: PlayerColor, t: TFunction) => {
        switch (player) {
          case PlayerColor.Blue:
            return t('Blue')
          case PlayerColor.Orange:
            return t('Orange')
        }
      }
    }
  }
}
