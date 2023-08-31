import { TezosToolkit, WalletContract } from "@taquito/taquito";

import create from "zustand";
import { SFT_CONTRACT, NFT_CONTRACT, tezosConfig } from "./config";
import useWalletStore from "./useWalletStore";

interface ContractState {
  tezos: TezosToolkit | null;
  nftContract: WalletContract | null;
  sftContract: WalletContract | null;
  loadContracts: any;
}

const useContractStore = create<ContractState>((set,get) => ({
  tezos: null,
  nftContract: null,
  sftContract:null,
  loadContracts: async () => {
    try {
      const tezos = new TezosToolkit(tezosConfig.rpcUrl)
      const walletinstance = useWalletStore.getState().walletInstance;
      if (walletinstance) {
        await tezos.setWalletProvider(walletinstance);
        const nftContract = await tezos.wallet.at(NFT_CONTRACT);
        const sftContract = await tezos.wallet.at(SFT_CONTRACT);
        set({ tezos, nftContract, sftContract });
        console.log("Contracts loaded Successfully !");
      } else {
        console.log("Wallet Instance Not found , please connect your awllet")
      }
    } catch (err) {
      console.log(err);
    }
  },

}));

export default useContractStore;
