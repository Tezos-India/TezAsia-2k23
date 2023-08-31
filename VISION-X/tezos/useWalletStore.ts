import create from "zustand";
import { BeaconWallet } from "@taquito/beacon-wallet";
import axios from "axios";
import { apiUrl, NFT_CONTRACT, SFT_CONTRACT, tezosConfig } from "./config";
import { NetworkType } from "@airgap/beacon-sdk";
import { getFa2Owned } from "../lib/tzkt";

interface WalletState {
  balance: number;
  isConnected: boolean;
  walletInstance: BeaconWallet | null;
  accountPkh: string;
  network:string | undefined, 
  nftsMinted:any[]
  sftsMinted:any[]
  connectWallet: (request: boolean) => Promise<void>;
  fetchBalance: () => Promise<void>;
  disconnectAccount: () => void;
  getTokenBalances: () => void;
}

const initState = {
  balance: 0,
  network:undefined,
  nftsMinted:[],
  sftsMinted:[],
  accountPkh: "",
  isConnected: false,
  walletInstance: null,
}

const useWalletStore = create<WalletState>((set, get) => ({
  ...initState,
  connectWallet: async (requestPermission: boolean) => {
    const wallet = new BeaconWallet({
      name: tezosConfig.dappName,
      preferredNetwork: tezosConfig.network,
    });
    if (!requestPermission) {
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const accountPkh = await wallet.getPKH();
        set({
          isConnected: true,
          accountPkh: accountPkh,
          walletInstance: wallet,
          network:activeAccount.network.type
        });
        await get().fetchBalance();
      }
    } else {
      await wallet.requestPermissions({
        network: {
          type: tezosConfig.network,
        },
      });
      const accountInfo = await wallet.client.getActiveAccount();

      set({
        isConnected: true,
        accountPkh: accountInfo?.address,
        network:accountInfo?.network.type,
        walletInstance: wallet,
      });
      await get().fetchBalance();
      console.log("Wallet connected successfully!");
    }
  },
  fetchBalance: async () => {
    try {
      const _pkh = get().accountPkh;
      if(_pkh){
        const res = await axios.get(`${apiUrl}/accounts/${_pkh}/balance`);
        set({balance:res.data})
      } else {
        console.log("pkh not found ")
      }
    } catch (err) {
      console.error("Failed to fetch Balance ");
      console.error({ err });
    }
  },
  disconnectAccount: ()=> {
    const wallet = get().walletInstance;
    wallet?.disconnect();
    set(initState);
  },
  getTokenBalances: async ()=> {
    try{
      const pkh = get().accountPkh
      const nfts = await getFa2Owned(NFT_CONTRACT,pkh);
      const sfts = await getFa2Owned(SFT_CONTRACT,pkh);
      set({nftsMinted:nfts,sftsMinted:sfts});
    } catch(err){
      console.error(err);
    }
  }
}));

export default useWalletStore;
