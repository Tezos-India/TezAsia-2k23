"use client";
import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
import { Text, Button } from "@chakra-ui/react";
// const getActiveAccount = dynamic(() => import('../tezos').then((mod) => mod.getActiveAccount), { ssr: false });
// const clearActiveAccount = dynamic(() => import('../tezos').then((mod) => mod.clearActiveAccount), { ssr: false });
// import { dappClient } from "../utils/walletconnect";
import { getActiveAccount, clearActiveAccount } from "../tezos";

function LoginButton() {
  const [walletConnected, setWalletConnected] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     // TODO 5.b - Get the active account
  //     const accounts = await dappClient().getAccount();
  //     setWalletConnected(accounts.account);
  //   })();
  // }, []);

  const handleLogin = async () => {
    if (!walletConnected) {
      // await dappClient().connectAccount();
        let activeAccount = await getActiveAccount();
      // let activeAccount = await dappClient().getAccount();
      setWalletConnected(true);
      console.log(activeAccount);
    } else {
        await clearActiveAccount();
      // await dappClient().disconnectWallet();
      setWalletConnected(false);
    }
  };

  return (
    <>
      <Button m={"2"} className="btn btn-round-hollow" onClick={handleLogin}>
        {walletConnected ? (
          <Text fontSize={"xl"} fontWeight={"extrabold"}>
            Disconnect Wallet
          </Text>
        ) : (
          <Text fontSize={"xl"} fontWeight={"extrabold"}>
            Connect Wallet
          </Text>
        )}
      </Button>
    </>
  );
}

export default LoginButton;
