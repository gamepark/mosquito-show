import Effect from "../fields/Effect";
import MosquitoEffectField from "../fields/MosquitoEffectField";

const createEffectFields = ():MosquitoEffectField[] => {
      
    const effects: Effect[] = []
    var id = 1;
    
    // Golden : 17 total 5 hidden
    for(let i=0; i<12; i++){
      effects.push(
        {id: id++, front: 5, back: 2, revealed: false}
        )
      }
    for(let i=0; i<5; i++){
      effects.push(
        {id: id++, front: 5, back: 1, revealed: false}
        )
      }
    // Grey: 4 total 1 hidden
    for(let i=0; i<3; i++){
      effects.push(
        {id: id++, front: 1, back: 2, revealed: false}
        )
      }
    effects.push(
        {id: id++, front: 1, back: 1, revealed: false}
        )
    // Blue: 3 total 1 hidden
    for(let i=0; i<2; i++){
      effects.push(
        {id: id++, front: 2, back: 2, revealed: false}
        )
      }
    effects.push(
      {id: id++, front: 2, back: 1, revealed: false}
      )
    // Red: 2 total 1 hidden
    effects.push(
      {id: id++, front: 3, back: 1, revealed: false}
      )
    effects.push(
      {id: id++, front: 3, back: 2, revealed: false}
      )
    // White: 1 total 1 hidden
    effects.push(
      {id: id++, front: 4, back: 1, revealed: false}
      )
    
    shuffle(effects)

    var effectFields: MosquitoEffectField[] = []
    var effectFieldIds = [7,9,11,15,17,19,23,25,27]
    for(let i=0; i<effectFieldIds.length; i++){
      var effectsForField: Effect[] = []
      for(let j=0; j<3; j++){
        let currentEffect = effects.pop()
        if(currentEffect!= undefined){
          if(j===2){
            currentEffect.revealed = currentEffect.back === 2
          }
          effectsForField.push(currentEffect)
        }
      }
      effectFields.push({id: effectFieldIds[i], effects: effectsForField})
    }
    return effectFields;
}

function shuffle(array : Effect[]) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export {
  createEffectFields
};

