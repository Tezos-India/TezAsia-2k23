
import { useContext, useEffect, useState } from "react";
import { connectWallet, getAccount, LogOut } from "../utils/wallet";
import LogoutIcon from '@mui/icons-material/Logout';
import { wallet } from "../utils/wallet";
import { context } from "../App";




const Navbar = () => {
  const { account,setAccount,hlo }=useContext(context);
  const [set,useset]=useState(false);
  useEffect(() => {
  (async ()=>{hlo()})(); 
  });

  // TODO 4.a - Complete onConnectWallet function
  const onConnectWallet = async (e) => {
    
    await connectWallet();
   hlo();
   useset(true);
  };

  const logOut = async() => {
    try{
 await LogOut();
  setAccount(null)
  window.location.reload();
 
    }
    catch(error){
      console.log(error)
    }

 console.log(account)
 
 
  }

  

  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand" style={{fontWeight:"bold",fontSize:"25px",paddingLeft:"35px"}}>
          Photo Sharing Dapp
        </a>
        <div className="d-flex">
          {/* TODO 4.b - Call connectWallet function onClick  */}
         
          <button onClick={onConnectWallet} name="butt" className="btn btn-outline-info">
            {/* TODO 5.a - Show account address if wallet is connected */}
            { account ? "Connected" : "Connect Wallet"}
          </button>
      
        </div>
       
      </div>
   <LogoutIcon sx={{color:"white",width:"35px",height:"35px",cursor:"pointer",marginRight:"26px"}} onClick={logOut} style={{ visibility: account ? 'visible': 'hidden'}} /> 
     
      {/* <button style={{ visibility: account ? 'visible': 'hidden'}} onClick={logOut}>logout</button>  */}
     
  
    </div>
  );
};

export default Navbar;
