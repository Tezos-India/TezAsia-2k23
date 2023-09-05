// TODO 6 - Call add entrypoint in the storage contract
import {tezos} from "./tezos"

export const addOperation = async (ImgHash) => {
    try{
        console.log(ImgHash)
        const contract = await tezos.wallet.at("KT1TWcZKqV1V2iTVrPW7Y1rivSsFZjk9TaS6");
        const op =await contract.methods.add(ImgHash).send()
        await op.confirmation(1);
    }
    catch(err){
        throw err;
    }
};

