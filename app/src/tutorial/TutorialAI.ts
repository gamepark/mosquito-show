import GameState from "@gamepark/mosquito-show/GameState";
import { Move } from "@gamepark/mosquito-show/moves";

export default class TutorialAI {
  // private readonly playerColor: PlayerColor;
  // private readonly dummy: Dummy<GameState, Move, PlayerColor>;

  // public constructor(playerColor: PlayerColor) {
  //   this.playerColor = playerColor
  //   this.dummy = new Dummy(Croa);
  // }

  play(game: GameState): Promise<Move[]> {
    
    return Promise.resolve([]);
  }

  // computeFrogMove(frogs: Array<FemaleFrog>, otherPlayers: Array<Player>, pond: Slab[][]): Array<Move> {
  //   const movableFrogs = frogs
  //     .filter(f => isMovableFrog(f, frogs.filter(frog => !!frog.position), pond));

  //   const goToOpponentMove = movableFrogs.map(f => {

  //     const allowedPosition = shuffle(getAllowedPositions(frogs.filter(frog => frog.id !== f.id), f, pond));
  //     const closeOpponent = this.getClosePositionWithOpponent(otherPlayers, allowedPosition);
  //     if (closeOpponent) {
  //       return moveFrogMove(f.id, f.color, closeOpponent);
  //     }

  //     return undefined;
  //   }).find(p => p !== undefined);

  //   if (goToOpponentMove) {
  //     return [goToOpponentMove];
  //   }

  //   const nonDangerousPositions: Array<MoveFrog> = movableFrogs.flatMap(f => {
  //     const allowedPosition = getAllowedPositions(frogs.filter(frog => frog.id !== f.id), f, pond);
  //     const nonDangerousTiles = this.getNonDangerousPositions(f, allowedPosition, pond);
  //     if (nonDangerousTiles && nonDangerousTiles.length) {
  //       return nonDangerousTiles;
  //     }

  //     return [];
  //   });


  //   if (nonDangerousPositions.length) {
  //     const bestOptions = nonDangerousPositions.filter(move => {
  //       const slab = pond[move.slabPosition.x][move.slabPosition.y];
  //       return slab && (!slab.displayed || SlabFrontType.Mud !== slab.front);
  //     })

  //     if (bestOptions.length > 0) {
  //       return [shuffle(bestOptions)[0]];
  //     }

  //     return [shuffle(nonDangerousPositions)[0]];
  //   }

  //   return [];
  // }

  // /**
  //  * Get allowed position for frog where there is an opponent
  //  * @param otherPlayers Other player
  //  * @param positions Allowed position
  //  */
  // getClosePositionWithOpponent(otherPlayers: Array<Player>, positions: Array<Position>): Position | undefined {
  //   return positions.find(position => otherPlayers.some(p => p.femaleFrogs.some(f => f.position && f.position.x === position.x && f.position.y === position.y)));
  // };

  // /**
  //  * Get non dangerous target tiles
  //  * @param frog the frog of positions
  //  * @param positions The frog allowed positions
  //  * @param pond THe pond
  //  */
  // getNonDangerousPositions(frog: FemaleFrog, positions: Array<Position>, pond: Slab[][]): Array<MoveFrog> {
  //   return positions
  //     .filter(position => {
  //       const slab = pond[position.x][position.y];
  //       return slab && ((slab.displayed && SlabFrontType.Pike !== slab.front) || (!slab.displayed && SlabBackType.Shallow === slab.back));
  //     })
  //     .map(position => moveFrogMove(frog.id, frog.color, position));
  // }
}