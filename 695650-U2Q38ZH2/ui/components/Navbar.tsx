import { useState } from "react";
import { connectWallet } from "../dapp/tezos";
import Form from "./Form";

export default function Navbar() {
  
  const [showLoginComponent, setShowLoginComponent] = useState(false);
  const handleLoginClick = () => {
    setShowLoginComponent(true);
  };

 

  return (
    <div className="flex justify-between items-center gap-8 ml-[80px] mr-8  pt-6 pb-6">
      <div className="text-white text-6xl font-sans">EtherStrike</div>
     
        <Form/>
     
     
    </div>
  );
}

