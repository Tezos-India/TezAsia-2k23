import { tezos } from "./tezos";

export const createOperation = async (title, first_chapter_hash) => {
  try {
    const contractInstance = await tezos.wallet.at('KT1Q6WTWL1n2NjZrUM42dvy1qMuqgyGHTZca');
    console.log(contractInstance);
    const op = await contractInstance.methods.default(first_chapter_hash, title).send();
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};

export const proposeOperation = async (contract, option_1, option_2, option_3) => {
  try {
    const contractInstance = await tezos.wallet.at(contract);
    console.log(contractInstance);
    const op = await contractInstance.methods.propose_chapter(option_1, option_2, option_3).send({amount : 1});
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
}