import { Button } from "../styled/Button";
import styled from "styled-components";


const BetAmount = ({betAmount, setBetAmount, error, setError}) => {

  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

  };

  const resetError = () => {
    setError("");
  };

  return (
    <BetAmountContainer>
      <div>
      <form onSubmit={handleSubmit}>
        <input
          className = "h1"
          id="betAmount"
          name="betAmount"
          type="number" min="1"
          pattern="[0-9]*"
          placeholder="Bet Amount in Tez"
          onChange={event => setBetAmount(event.target.value)}
          value={betAmount}
        />
        <br></br>
        <br></br>
      <Button onClick = {resetError} type="submit">Submit Bet</Button>
      </form>
      <br></br>
      <h5>Click on Submit to record Bet Amount</h5>
    </div>
    </BetAmountContainer>
    
  );
};

export default BetAmount;

const BetAmountContainer = styled.div`
.h1 {
  height: 30px;
  font-size: 16px;
  min-width: 210px;

}
`; 