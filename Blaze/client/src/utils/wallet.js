// TODO 2.a - Setup a Beacon Wallet instance
import { BeaconWallet } from "@taquito/beacon-wallet";
export const wallet = new BeaconWallet({
  name: "Voting Dapp",
  preferredNetwork: "ghostnet",
});
// TODO 2.b - Complete connectWallet function (for ithacanet)
export const connectWallet = async () => {
  await wallet.requestPermissions({
    network: {
      type: "ghostnet",
    },
  });
};

// TODO 2.c - Complete getAccount function
export const getAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount.address;
  } else {
    return null;
  }
};

// TODO 2.d - Complete disconnectWallet function
export const disconnectWallet = async () => {
  await wallet.clearActiveAccount();
};

export const getFullActitveAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount;
  } else {
    return null;
  }
};
