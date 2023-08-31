import { MichelsonMap, WalletContract } from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";

export const mintNFTOperation = async (
  metadata: string,
  contract: WalletContract,
  pkh: string
) => {
  try {
    const metadataURI = char2Bytes(metadata);
    const op = await contract.methods
      .mint(pkh, MichelsonMap.fromLiteral({ "": metadataURI }))
      .send();
    return op;
  } catch (err:any) {
    console.log(err);
    throw Error(err.message ? err.message : "Transaction failed");
  }
};

export const mintSFTOperation = async (
  metadata: string,
  contract: WalletContract,
  pkh: string,
  amount: number
) => {
  try {
    console.log(amount);
    const metadataURI = char2Bytes(metadata);
    const op = await contract.methods
      .mint(amount,pkh, MichelsonMap.fromLiteral({ "": metadataURI }))
      .send()
    return op;
  } catch (err:any) {
    console.log(err);
    throw Error(err.message ? err.message : "Transaction failed");
  }
};
