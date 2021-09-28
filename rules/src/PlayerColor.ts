enum PlayerColor {
  Blue = 1,
  Orange = 2
}

export function getColorFromAnimalId(animalId: number){
  // 1,3 Orange
  // 2,4 Blue
  if(animalId === 1 || animalId === 3){
    return PlayerColor.Orange
  } else {
    return PlayerColor.Blue
  }
}

export function getAnimalIdsFromColor(color: PlayerColor) : number[] {
  if(color === PlayerColor.Orange){
    return [1,3]
  } else {
    return [2,4]
  }
}


export default PlayerColor