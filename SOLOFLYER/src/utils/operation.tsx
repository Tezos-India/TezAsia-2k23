// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation
import {tezos} from "./tezos"

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

export const buyBetOperation = async (selectedNumber: number, betAmount: number, genNumber:number) => {
    try{
        const contract = await tezos.wallet.at("KT1JMMq7Gkci4Y8m96smeobtzdeEKtbJja5i");
        const op =await contract.methods.buy_bet(selectedNumber, genNumber).send({
            amount: betAmount,
            mutez: false,
        })
        await op.confirmation(1);
    }
    catch(err){
        throw err;
    }
};

// TODO 10 - Call end_game entrypoint in the Lottery contract by completing endGameOperation

export const endBet = async () => {
    try{
        
        const contract = await tezos.wallet.at("KT1JMMq7Gkci4Y8m96smeobtzdeEKtbJja5i")
        const op = await contract.methods.closeBet().send()
        await op.confirmation(1)
    }
    catch (err){
        throw err;
    }
};