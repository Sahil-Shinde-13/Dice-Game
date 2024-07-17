import React from 'react'
import TotalScore from './TotalScore'
import NumberSelector from './NumberSelector'
import styled from 'styled-components'
import RollDice from './RollDice'
import { useState } from 'react'
import { Button } from '../Styled/Button'
import Rules from './Rules'

function GamePlay() {
    const [currDice , setCurrentDice] = useState(1);

    const [score, setScore] = useState(0)

    const [selectedNumber,setSelectedNumber] = useState();

    const [error, setError] = useState("");

    const [showRules,setShowRules] = useState(false)

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const ResetScore = () => {
        setScore(0);

    }
    const roleDice = () =>{
        if(!selectedNumber) {

            setError("You have not selected any number")
            return
        }
            

        const  randomNumber = generateRandomNumber(1,7);
        setCurrentDice((prev) => randomNumber);

        if(selectedNumber == randomNumber){
            setScore((prev) => prev + randomNumber);
        } else{
            setScore((prev) => prev - 2 );
        }

        setSelectedNumber(undefined);
    };

  return (
    <MainContainer>
        <div className='top_section'>
         <TotalScore score={score}/>
         <NumberSelector selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} error={error} setError={setError}/>
         </div>
         <RollDice currDice={currDice} roleDice={roleDice}/>
         <div className="btns">
            <Button onClick={ResetScore}>Reset</Button>
            <Button onClick={() => setShowRules((prev) => !prev)}> {showRules ? "Hide" : "Show"} Rules</Button>
         </div>
       {showRules && <Rules/>}
    </MainContainer>
  )
}

export default GamePlay

const MainContainer = styled.main`
    padding-top: 70px;

    .top_section{
        display: flex;
        justify-content: space-around;
        align-items: end;
    }

    .btns{
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
`;