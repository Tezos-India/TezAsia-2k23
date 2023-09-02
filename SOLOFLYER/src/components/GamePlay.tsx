import styled from "styled-components";
import NumberSelector from "./NumberSelector";
import RoleDice from "./RollDice";
import { useState } from "react";
import { Button, OutlineButton } from "../styled/Button";
import Rules from "./Rules";
import BetAmount from "./BetAmount";
import { buyBetOperation, endBet } from "../utils/operation";
import { fetchStorage } from "../utils/tzkt";


const GamePlay = ({toggle}) => {
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [showRules, setShowRules] = useState<boolean>(false);
  const [betAmount, setBetAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const onBuyBet = async (selectedNumber:number, betAmount, randomNumber) => {
    try {
      setLoading(true);
      await buyBetOperation(selectedNumber, betAmount,randomNumber);
      try{
          console.log("randomNumber:", randomNumber);
          console.log("selectedNumber:", selectedNumber);
          await endBet();}
      catch(e){
        fetchData();
      }
      fetchData();
      alert("Transaction BuyBet successful");
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

    // TODO 9 - Fetch players and tickets remaining from storage
    const fetchData = async () => {
      const storage = await fetchStorage();
      const winNumber = storage.winningNumber;
      setCurrentDice((prev) => winNumber);
    
      if (selectedNumber == winNumber) {
        setError("You Won!!!!!");
      } else {
        setError("Better Luck Next Time!!");
      }

      setSelectedNumber(undefined);
      setBetAmount("");
  };



  const roleDice = () => {
    const randomNumber = generateRandomNumber(1, 6);

    if (!selectedNumber && betAmount == ''){
        setError("You have not selected any number and not given Bet Amount");
        return; 
    }

    if (!selectedNumber) {
      setError("You have not selected any number");
      return;
    }

    if (betAmount == '') {
        setError("You have not entered Bet Amount");
        return;
      }

    onBuyBet(selectedNumber, betAmount, randomNumber);
  };

  return (
    <MainContainer>
      <div className="top_section">
        <div><BetAmount 
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        error={error}
        setError={setError}
        /></div>
        <NumberSelector
          error={error}
          setError={setError}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
        />
        
      </div>
      <RoleDice currentDice={currentDice} roleDice={roleDice} />
      <div className="btns">
        <Button onClick={() => setShowRules((prev) => !prev)}>
          {showRules ? "Hide" : "Show"} Rules
        </Button>
        <OutlineButton onClick={toggle}>End Game</OutlineButton>
      </div>

      {showRules && <Rules />}
    </MainContainer>
    
  );
};

export default GamePlay;

const MainContainer = styled.main`
  padding-top: 70px;
  .top_section {
    display: flex;
    justify-content: space-around;
    align-items: end;
  }
  .btns {
    margin-top: 40px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;