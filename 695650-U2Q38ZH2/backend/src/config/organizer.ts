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

  return Tezos;
}

// Wingame function
export async function wingame(tezos, uid, winner) {
  try {
    const contract = tezos.wallet.at("KT1JTQ3Af8CjkzA3V45hWHt5eZiwBCKJwpxN");
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
export async function drawgame(tezos, uid) {
  try {
    const contract = tezos.wallet.at("KT1JTQ3Af8CjkzA3V45hWHt5eZiwBCKJwpxN");
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

export async function mintPawn(player) {
  const image = "ipfs://QmbWmd2zhLkemFcRfgQAUUPQFBX77WN5CsRvpJXqhBHpB9";
  const type = "Pawn";

  const metadata = await pinataWrapper(player, type, image);
  const ipfs = metadata.Ipfs;
  console.log(ipfs);

  const data = {
    "": char2Bytes("ipfs://" + ipfs),
  };
  const send = {
    to_: player,
    metadata: data,
  };
  var arr = [send];

  try {
    await mint(arr);
  } catch (error) {
    console.log(error);
  }
}

export async function mintBishop(player) {
  const image = "ipfs://QmUeJjsWwFDzku2kcn5HYBSVdaQjkzqm7a8LCDmpqM8Cuu";
  const type = "Bishop";

  const metadata = await pinataWrapper(player, type, image);
  const ipfs = metadata.Ipfs;
  console.log(ipfs);

  const data = {
    "": char2Bytes("ipfs://" + ipfs),
  };
  const send = {
    to_: player,
    metadata: data,
  };
  var arr = [send];

  try {
    await mint(arr);
  } catch (error) {
    console.log(error);
  }
}

export async function mintKnight(player) {
  const image = "ipfs://QmbM5v3mXgEMMWBCt95TJ15b3pNSimRepUkcMa1JaF7odh";
  const type = "Knight";

  const metadata = await pinataWrapper(player, type, image);
  const ipfs = metadata.Ipfs;
  console.log(ipfs);

  const data = {
    "": char2Bytes("ipfs://" + ipfs),
  };
  const send = {
    to_: player,
    metadata: data,
  };
  var arr = [send];

  try {
    await mint(arr);
  } catch (error) {
    console.log(error);
  }
}

export async function mintRook(player) {
  const image = "ipfs://QmcAdnDFkz6PFkksf7KiZJ3Z1ZESqmerqyKSKabajm8w1h";
  const type = "Rook";

  const metadata = await pinataWrapper(player, type, image);
  const ipfs = metadata.Ipfs;
  console.log(ipfs);

  const data = {
    "": char2Bytes("ipfs://" + ipfs),
  };
  const send = {
    to_: player,
    metadata: data,
  };
  var arr = [send];

  try {
    await mint(arr);
  } catch (error) {
    console.log(error);
  }
}

export async function mintQueen(player) {
  const image = "ipfs://QmVs3pkr4Q31ZBicv7zv693ArtCb4o9nH3Sh25GDnTXPNv";
  const type = "Queen";

  const metadata = await pinataWrapper(player, type, image);
  const ipfs = metadata.Ipfs;
  console.log(ipfs);

  const data = {
    "": char2Bytes("ipfs://" + ipfs),
  };
  const send = {
    to_: player,
    metadata: data,
  };
  var arr = [send];

  try {
    await mint(arr);
  } catch (error) {
    console.log(error);
  }
}

export async function mintKing(player) {
  const image = "ipfs://QmQx1H61FCmZYjxyzEefWBhjHE25hQ6HGeYyhW8veWGCTy";
  const type = "King";

  const metadata = await pinataWrapper(player, type, image);
  const ipfs = metadata.Ipfs;
  console.log(ipfs);

  const data = {
    "": char2Bytes("ipfs://" + ipfs),
  };
  const send = {
    to_: player,
    metadata: data,
  };
  var arr = [send];

  try {
    await mint(arr);
  } catch (error) {
    console.log(error);
  }
}

export async function mint(batch) {
  const tezos = initializeTezos();
  const contract_nft = tezos.wallet.at("KT1MKeXcAXCKaJ1CffQnX1VPc3G8HZUyziaF");
  try {
    console.log("inside mint");
    const op = await contract_nft.methods.mint(batch).send();
    await op.confirmation(1);
    console.log("Mint Successful");
  } catch (err) {
    throw err;
  }
}
