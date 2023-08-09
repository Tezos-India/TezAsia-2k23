import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

const Tezos = new TezosToolkit("https://ghostnet.smartpy.io");

const options = {
  name: "MyAwesomeDapp",
  iconUrl: "https://tezostaquito.io/img/favicon.svg",
  preferredNetwork: NetworkType.GHOSTNET,
  // eventHandlers: {
  //   PERMISSION_REQUEST_SUCCESS: {
  //     handler: async (data: any) => {
  //       console.log("permission data:", data);
  //     },
  //   },
  // },
};

const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);

export async function connectWallet() {
  await wallet.requestPermissions({ network: { type: NetworkType.GHOSTNET } });
  // const userAddress = await wallet.getPKH();
  // console.log(`Connected with ${userAddress}`);

  // return {
  //   Tezos,
  //   wallet,
  //   userAddress,
  //   disconnect: () => wallet.clearActiveAccount(),
  // };
}

export const getAccount = async () => {
  const connectedWallet = await wallet.client.getActiveAccount();
  if (connectedWallet) {
    return connectedWallet.address;
  } else {
    return "";
  }
};

export const disconnect = async () => {
  wallet.clearActiveAccount();
};
