enum PlayerColor {
  Blue = 'Blue',
  Orange = 'Orange'
}

export function getColorFromAnimalId(animalId: number){
  // 1,3 Orange
  // 2,4 Blue
  if(animalId === 1 || animalId === 3){
    return PlayerColor.Orange;
  } else {
    return PlayerColor.Blue;
  }
}


export default PlayerColor