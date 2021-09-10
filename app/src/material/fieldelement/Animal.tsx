/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameView from '@gamepark/mosquito-show/GameView';
import MoveType from '@gamepark/mosquito-show/moves/MoveType';
import { getColorFromAnimalId } from '@gamepark/mosquito-show/PlayerColor';
import { usePlay } from '@gamepark/react-client';
import { FunctionComponent, useState } from 'react';
import { Images } from '../Images';

type AnimalProp = {
    id: number
    state: GameView
}

const Animal: FunctionComponent<AnimalProp> = ({ state, id }: AnimalProp) => {
    const play = usePlay();

    const [selectTucan1, setTucanSelected1] = useState(false);
    const [selectChamelon1, setChamelonSelected1] = useState(false);

    function moveTo(id: number) {
        setTucanSelected1(false)
        setChamelonSelected1(false)
        play({ type: MoveType.MoveAnimal, fieldId: id, animalId: state?.selectedAnimalId })

    }

    function chooseAnimal(fieldId: number, animalId: number) {
        const color = getColorFromAnimalId(animalId)

        if (color === state.activePlayer) {
            if (animalId === 1 || animalId === 2) {
                setTucanSelected1(!selectTucan1)
            }
            if (animalId === 3 || animalId === 4) {
                setChamelonSelected1(!selectChamelon1)
            }
            play({ type: MoveType.ChooseAnimal, selectAnimalId: animalId })
        }
    }

    function isSelected(selectedAnimalId: number) {
        if (state.selectedAnimalId === selectedAnimalId) {
            return 100;
        }
        return 0;
    }

    function possibleFields() {
        if (state !== undefined) {
            var possibleFields = state.possibleAnimalFields
            if (possibleFields !== undefined) {
                for (var val of possibleFields) {

                    if (val === id) {
                        return <div css={highlightPosition(id)} onClick={() => { moveTo(id) }} ></div>
                    }
                }
            }
            if (state.board.animalfield !== undefined) {
                let animals = state.board.animalfield
                for (let i = 0; i < animals.length; i++) {
                    if (id === animals[i].fieldId) {
                        let animalId = animals[i].animalId
                        if (animalId === 1) {
                            return <div css={animalPosition(animals[i].fieldId, isSelected(animalId))} onClick={() => { chooseAnimal(id, animalId) }} style={{ backgroundImage: `url(${Images.Tucan_Orange})` }} />
                        } else if (animalId === 2) {
                            return <div css={animalPosition(animals[i].fieldId, isSelected(animalId))} onClick={() => { chooseAnimal(id, animalId) }} style={{ backgroundImage: `url(${Images.Tucan_Blue})` }} />
                        } else if (animalId === 3) {
                            return <div css={animalPosition(animals[i].fieldId, isSelected(animalId))} onClick={() => { chooseAnimal(id, animalId) }} style={{ backgroundImage: `url(${Images.Chamelon_Orange})` }} />
                        } else if (animalId === 4) {
                            return <div css={animalPosition(animals[i].fieldId, isSelected(animalId))} onClick={() => { chooseAnimal(id, animalId) }} style={{ backgroundImage: `url(${Images.Chamelon_Blue})` }} />
                        }
                    }
                }
            }
        }

        return <div></div>

    }
    return (
        possibleFields()
    )

}

export {
    Animal
};

const animalPosition = (id: number, invert: number) => css`
height: 13%;
width: 13%;
position: absolute;
left: ${5 + (((id - 1) % 4) * 25.5)}%;
top: ${5 + ((Math.floor((id - 1) / 4)) * 25.5)}%; 
filter: invert(${invert}%); 
border-radius: 50%;
border: none;
background-position: center;
background-size: cover;
`

const highlightPosition = (id: number) => css`
height: 13%;
width: 13%;
position: absolute;
left: ${5 + (((id - 1) % 4) * 25.5)}%;
top: ${5 + ((Math.floor((id - 1) / 4)) * 25.5)}%; 
border-radius: 50%;
border: 5px solid red; 
background-position: center;
background-size: cover;
`



