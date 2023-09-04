// TODO 2.a - Setup beacon wallet instance
import { BeaconWallet } from "@taquito/beacon-wallet";

export const wallet = new BeaconWallet({
  name: "Apni Car",
  preferredNetwork: "Ghostnet",
});

// TODO 2.b - Setup connectWallet function (on jakartanet)
export const connectWallet = async () => {
  await wallet.requestPermissions({ network: { type: "Ghostnet" } });
};

// TODO 2.c - Setup getAccount function
export const getAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount.address;
  } else {
    return "";
  }
};