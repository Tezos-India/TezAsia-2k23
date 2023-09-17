import { tezos } from "./tezos";

import { contractAddr } from "./constants";

// const walletAddr = "KT1SiVtqPuZNrr7Eb8ZgkGBgc1QGyawbfBGt";
// const walletAddr = "KT1TRFnW5Yaw549UX37WjY4DaCoz45fRqkvj"; //With Big_Map
// const walletAddr = "KT1BCWtdQrNJZKZySxKRam2DZ7UDE4xkr1Bb"; // With Better Big_Map

export const buyTicketOperation = async (tezAmt) => {
   try {
        const contract = await tezos.wallet.at(contractAddr)
        const op = await contract.methods.buy_ticket().send(
            {
                amount: tezAmt,
                mutez: false
            }
        )
        await op.confirmation(1);
   } catch(error) {
        throw error;
   }
};

function jsonToHexBytes(json) {

    const jsonString = JSON.stringify(json);
  
    const textEncoder = new TextEncoder();
    const byteArray = textEncoder.encode(jsonString);
  
  // Step 3: Convert byte array to hexadecimal representation
    const hexBytes = Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    // Return the byte array.
    return hexBytes;
}

export const endGameOperation = async (id, score) => {
    try {
        const contract = await tezos.wallet.at(contractAddr)
        const bytes = jsonToHexBytes('ABC')
        console.log('ABC')
        console.log(bytes)
        // const returnw=hex2buf(bytes)
        // console.log(returnw)
        const op = await contract.methods.end_game(
            id,
            parseInt(score),
        ).send()
        await op.confirmation(1);
   } catch(error) {
        throw error;
   }
};

export const refund = async () => {
    try {
         const contract = await tezos.wallet.at(contractAddr)
         const op = await contract.methods.refund().send()
         await op.confirmation(1);
    } catch(error) {
         throw error;
    }
 };

 export const createWeeklyOperation = async (gameName) => {
    try {
         const contract = await tezos.wallet.at(contractAddr)
         const op = await contract.methods.create_weekly_challenge(
            gameName
         ).send()
         await op.confirmation(1);
    } catch(error) {
         throw error;
    }
 };

 export const enterWeeklyOperation = async (challengeId) => {
    try {
         const contract = await tezos.wallet.at(contractAddr)
         const op = await contract.methods.enter_weekly_challenge(
            challengeId
         ).send(
            {
                amount: 1,
                mutez: false
            }
         )
         await op.confirmation(1);
    } catch(error) {
         throw error;
    }
 };

 export const participatedWeeklyOperation = async (challengeId, score) => {
    try {
         const contract = await tezos.wallet.at(contractAddr)
         const op = await contract.methods.participated_weekly_challenge(
            challengeId,
            score
         ).send()
         await op.confirmation(1);
    } catch(error) {
         throw error;
    }
 };

 export const endWeeklyOperation = async (challengeId) => {
    try {
         const contract = await tezos.wallet.at(contractAddr)
         const op = await contract.methods.end_weekly_challenge(
            challengeId
         ).send()
         await op.confirmation(1);
    } catch(error) {
         throw error;
    }
 };