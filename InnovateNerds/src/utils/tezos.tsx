import { TezosToolkit } from "@taquito/taquito";
import { wallet } from "./wallet";

export const tezos= new TezosToolkit("https://ghostnet.smartpy.io")

tezos.setWalletProvider(wallet)