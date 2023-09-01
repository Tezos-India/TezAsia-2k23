import styled from "styled-components";
import { Button } from "../styled/Button";
import { useState } from "react";
import { useEffect } from "react";
import { connectWallet, getAccount } from "../utils/wallet";

const StartGame = ({ toggle}) => {
   const [account, setAccount] = useState("");
   const [message, setMessage] = useState<string>("");


  // useEffect(() => {
  //   (async () => {
  //     // TODO 5.b - Get the active account
  //     const account = await getAccount();
  //     setAccount(account);
  //     setMessage("");
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      if(account == ""){
        setMessage("Click on Connect Wallet to proceed into game");
      }
    })();
  }, []);

  // TODO 4.a - Complete onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
    setMessage("");
  }; 
  const messageView = () => {
      setMessage("You have not connected wallet");
  };

  return (
    <Container>
      <div>
        <img src="/images/dices.png" />
      </div>
      <div className="content">
        <h1>Dice Game</h1>
        <Button onClick={account ? toggle : {messageView}}>Play Now</Button>
        &nbsp;&nbsp;&nbsp;  
        <Button onClick={onConnectWallet} >{account ? "Change Wallet Account" : "Connect Wallet to Play"}</Button>
        <p className="error">{message}</p>
      </div>
    </Container>
  );
};

export default StartGame;

const Container = styled.div`
  max-width: 1180px;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  align-items: center;

  .content {
    h1 {
      font-size: 96px;
      white-space: nowrap;
    }
    .error {
    color: purple;
  }
  }
`;