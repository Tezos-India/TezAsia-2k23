// TODO 1 - Setup Tezos Toolkit
//specifies which node we want to connect to
import { wallet } from "./wallet"
import { TezosToolkit } from '@taquito/taquito';

// import { InMemorySigner, importKey } from '@taquito/signer';
export const tezos =new TezosToolkit("https://ghostnet.smartpy.io");
// export const tezos =new TezosToolkit("https://jakartanet.smartpy.io");


// TODO 3 - Specify wallet provider for Tezos instance

tezos.setWalletProvider(wallet)