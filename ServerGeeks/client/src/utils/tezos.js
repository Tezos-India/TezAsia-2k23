import { TezosToolkit } from "@taquito/taquito";
import { wallet } from "./wallet";
import { contractAddr } from "./constants";
// import { MichelCodecPacker } from '@taquito/taquito';

export const tezos = new TezosToolkit("https://ghostnet.smartpy.io");

const fetch = async() => {
    const contract = await tezos.contract.at(contractAddr)
    const storage = await contract.storage();
    console.log(JSON.stringify(storage))
}

fetch();

tezos.setWalletProvider(wallet);