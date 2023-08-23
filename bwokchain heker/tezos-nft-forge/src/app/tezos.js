import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";

import config from "./config";

// Update CONTRACT_ADDRESS and other constants below as required
const DAPP_NAME = "NFT Creators' PARADISE";
const RPC_URL = "https://ghostnet.smartpy.io";
const NETWORK = "ghostnet";
// const CONTRACT_ADDRESS = "KT1Ba56eW3NHGSeTQrTQHZGAyGCJJb2Sev6U"
const CONTRACT_ADDRESS = config.contractAddress;

const Tezos = new TezosToolkit(RPC_URL);
const wallet = new BeaconWallet({
  name: DAPP_NAME,
  network: { type: NETWORK },
  colorMode: "light",
});

Tezos.setWalletProvider(wallet);

const getActiveAccount = async () => {
    const activeAccount = await wallet.client.getActiveAccount();

    // no active account, we need permissions first
    if (!activeAccount) {
        await wallet.requestPermissions({
            type: NETWORK,
            rpcUrl: RPC_URL
        });
        return getActiveAccount();
    }

    return activeAccount;
};

const clearActiveAccount = async () => {
    return wallet.client.clearActiveAccount();
}

const getContract = async () => {
    return Tezos.wallet.at(CONTRACT_ADDRESS);
}

const getContractStorage = async () => {
    const contract = await getContract();
    return contract.storage();
}

export {
    Tezos,
    wallet,
    getActiveAccount,
    clearActiveAccount,
    getContract,
    getContractStorage
}