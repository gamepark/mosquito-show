import Effect from "../fields/Effect";
import MosquitoEffectField from "../fields/MosquitoEffectField";

const createEffectFields = ():MosquitoEffectField[] => {
      
    const effects: Effect[] = []
    var id = 1;
    
    // Golden : 17 total 5 hidden
    for(let i=0; i<12; i++){
      effects.push(
        {id: id++, front: 5, back: 2}
        )
      }
    for(let i=0; i<5; i++){
      effects.push(
        {id: id++, front: 5, back: 1}
        )
      }
    // Grey: 4 total 1 hidden
    for(let i=0; i<3; i++){
      effects.push(
        {id: id++, front: 1, back: 2}
        )
      }
    effects.push(
        {id: id++, front: 1, back: 1}
        )
    // Blue: 3 total 1 hidden
    for(let i=0; i<2; i++){
      effects.push(
        {id: id++, front: 2, back: 2}
        )
      }
    effects.push(
      {id: id++, front: 2, back: 1}
      )
    // Red: 2 total 1 hidden
    effects.push(
      {id: id++, front: 3, back: 1}
      )
    effects.push(
      {id: id++, front: 3, back: 1}
      )
    // White: 1 total 1 hidden
    effects.push(
      {id: id++, front: 4, back: 1}
      )
    
    // SHUFFLE

    var effectFields: MosquitoEffectField[] = []
    var effectFieldIds = [7,9,11,15,17,19,23,25,27]
    for(let i=0; i<effectFieldIds.length; i++){
      var effectsForField: Effect[] = []
      for(let j=0; j<3; j++){
        let currentEffect = effects.pop()
        if(currentEffect!= undefined){
          effectsForField.push(currentEffect)
        }
      }
      effectFields.push({id: effectFieldIds[i], effects: effectsForField})
    }
    return effectFields;
}

export {
    createEffectFields
};
