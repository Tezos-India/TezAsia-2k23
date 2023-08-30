const { InMemorySigner } = require("@taquito/signer");
const { TezosToolkit } = require("@taquito/taquito");

const Tezos = new TezosToolkit("https://ghostnet.smartpy.io");

// Set up the Tezos provider
export async function initializeTezos() {
  Tezos.setProvider({
    signer: await InMemorySigner.fromSecretKey(
      "edskRnT7i4kHKbJtznWi5KFjJ1y9HQoburPBVmBAebdxby5GUiTpm1KpwCkR7si4v7ofNUsNVfQ7nEuyruu2GaQh8MuJVgkWDF"
    ),
  });

  return Tezos.wallet.at("KT1JTQ3Af8CjkzA3V45hWHt5eZiwBCKJwpxN");
}

// Wingame function
export async function wingame(contract, uid, winner) {
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
    console.log("uid, winner", uid, winner, err);
    return false;
  }
}

// Drawgame function
export async function drawgame(contract, uid) {
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
