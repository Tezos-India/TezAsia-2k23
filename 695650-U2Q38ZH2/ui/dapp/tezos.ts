import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

const Tezos = new TezosToolkit("https://ghostnet.smartpy.io");

const options = {
  name: "MyAwesomeDapp",
  iconUrl: "https://tezostaquito.io/img/favicon.svg",
  preferredNetwork: NetworkType.GHOSTNET,
};

const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);

export async function connectWallet() {
  await wallet.requestPermissions({ network: { type: NetworkType.GHOSTNET } });
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

const contract = await Tezos.wallet.at("KT1JTQ3Af8CjkzA3V45hWHt5eZiwBCKJwpxN");

export async function addplayer1(uid) {
  const amountToSend = 5;
  try {
    const op = await contract.methods
      .add_player1(uid)
      .send({ amount: amountToSend });
    console.log(`Hash: ${op.opHash}`);

    const result = await op.confirmation();
    console.log(result);

    if (result.completed) {
      console.log(`Transaction correctly processed!
        Block: ${result.block.header.level}
        Chain ID: ${result.block.chain_id}`);
      return true;
    } else {
      console.log("An error has occurred");
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function addplayer2(uid) {
  const amountToSend = 5;
  try {
    const op = await contract.methods
      .add_player2(uid)
      .send({ amount: amountToSend });
    console.log(`Hash: ${op.opHash}`);

    const result = await op.confirmation();
    console.log(result);

    if (result.completed) {
      console.log(`Transaction correctly processed!
        Block: ${result.block.header.level}
        Chain ID: ${result.block.chain_id}`);
      return true;
    } else {
      console.log("An error has occurred");
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}