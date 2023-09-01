import { NetworkType } from "@airgap/beacon-sdk";

export const apiUrl = "https://api.jakartanet.tzkt.io/v1";
export const SFT_CONTRACT = "KT1BkSid4kxYd3Lmht6jv8Z1RdpSkkjEJ8Gq"; // Semi fungible Token Contract Address
export const NFT_CONTRACT = "KT1Qsy19tB9VpLWW1thEoREFujaQe9FEYhi7"; // Non Fungible Token Contract Address

type ConfigType = {
  dappName:string
  network:NetworkType
  rpcUrl:string
}

export const tezosConfig:ConfigType = {
  dappName: "TezMint",
  network: NetworkType.JAKARTANET,
  rpcUrl: "https://jakartanet.ecadinfra.com"
}