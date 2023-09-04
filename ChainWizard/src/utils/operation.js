import { tezos } from "./tezos";

export const ContributeFundOperation = async (amount) => {
  try {
    const contract = await tezos.wallet.at(
      "KT1Fyc9TtYHfUj7AuRbtMKU4hBghVHUxDrqz"
    );
    const op = await contract.methods.contribute().send({
      amount: amount,
      mutez: true,
    });
    await op.confirmation(1);
    // 1 represents that it waits for atleast 1 block after the operation is confirmed
  } catch (err) {
    throw err;
  }
};

export const endFund = async () => {
  try {
    const contract = await tezos.wallet.at(
      "KT1Fyc9TtYHfUj7AuRbtMKU4hBghVHUxDrqz"
    );
    const op = await contract.methods.close().send();
    await op.confirmation(1);
    // 1 represents that it waits for atleast 1 block after the operation is confirmed
  } catch (err) {
    throw err;
  }
};


export const withdrawFund = async () => {
    try{
        const contract=await tezos.wallet.at("KT1KJJ5oHXHiAfsfytVaFupEJ1pyaNxQLMz6");
        const op =await contract.methods.withdraw().send();
        // await op.confirmation(1);
        // 1 represents that it waits for atleast 1 block after the operation is confirmed
    }
    catch(err)
    {
        throw err;
    }

};
