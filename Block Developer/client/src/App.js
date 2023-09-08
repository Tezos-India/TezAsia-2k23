import React from "react";
import Routes from "./Routes";
import { AuthContextProvider } from "./store/auth-context";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import { Web3ReactProvider} from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'



function App() {

  function getLibrary(provider){
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AuthContextProvider>
      <Routes/>
      </AuthContextProvider>
    </Web3ReactProvider>
  );
}

export default App;