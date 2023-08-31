import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContainer from "../components/layout/AppContainer";
import useContractStore from "../tezos/useContractStore";
import { useEffect } from "react";
import useWalletStore from "../tezos/useWalletStore";
import {  MotionConfig } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
  const loadContracts = useContractStore((state) => state.loadContracts);
  const connectWallet = useWalletStore((state) => state.connectWallet);
  const isConnected = useWalletStore((state) => state.isConnected);
  //Initial checks and loadups
  useEffect(() => {
    connectWallet(false);
  }, [connectWallet]);

  // Load the wallet contract instances once the wallet is loadd
  useEffect(() => {
    if (isConnected) {
      loadContracts();
    }
  }, [isConnected, loadContracts]);

  return (

      <MotionConfig reducedMotion="user">
        <AppContainer key="root">
          <Component {...pageProps} />
        </AppContainer>
      </MotionConfig>

  );
}

export default MyApp;
