import React, { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";
import { resetGame} from ".././utils/operation";


const Navbar: React.FC = () => {
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      
      setAccount(account);
    })();
  }, []);

  // TODO 4.a - Complete onConnectWallet function
  const onConnectWallet = async () => {
	  await connectWallet();
	  const account = await getAccount();
	  setAccount(account);
	  
  };
  
  
    const onReset = async () => {
	  await resetGame();
	  
	  
  };
  
  

  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
			ROLL THE DICE 
        </a>
        <div className="d-flex" style={{padding:30}}>
          {/* TODO 4.b - Call connectWallet function onClick  */}
          <button onClick={onConnectWallet} className="btn btn-outline-info">
            {/* TODO 5.a - Show account address if wallet is connected */}
            {account ? account:"Connect Wallet"}
          </button>
          <div style={{width:50}}> </div>
                    <button onClick={onReset}  className="btn btn-primary btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
           {"RESET GAME" } 
          </button>
                    

        </div>
      </div>
    </div>
  );
};

export default Navbar;
