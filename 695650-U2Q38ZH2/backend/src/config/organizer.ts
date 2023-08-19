import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";

const Tezos = new TezosToolkit("https://ghostnet.smartpy.io");

Tezos.setProvider({
  signer: await InMemorySigner.fromSecretKey(
    "edskRnT7i4kHKbJtznWi5KFjJ1y9HQoburPBVmBAebdxby5GUiTpm1KpwCkR7si4v7ofNUsNVfQ7nEuyruu2GaQh8MuJVgkWDF"
  ),
});

const contract = await Tezos.wallet.at("KT1DdegaPz1V54ReKSHuw5Vfw3nC7pAJF3jh");

export async function wingame(uid, winner) {
  try {
    const op = await contract.methods.wingame(uid, winner).send();
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

export async function drawgame(uid) {
  try {
    const op = await contract.methods.drawgame(uid).send();
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
