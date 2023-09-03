import { tezos } from "./tezos";
 
export const buyTicketOperation = async () => {
   try {
        const contract = await tezos.wallet.at("KT1CpGBXnBFZqzARUSUtgm1p2Xp9xnruDdsd")
        const op = await contract.methods.buy_ticket().send(
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

function jsonToHexBytes(json) {

    const jsonString = JSON.stringify(json);
  
    const textEncoder = new TextEncoder();
    const byteArray = textEncoder.encode(jsonString);
  
  // Step 3: Convert byte array to hexadecimal representation
    const hexBytes = Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    // Return the byte array.
    return hexBytes;
}

export const endGameOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1CpGBXnBFZqzARUSUtgm1p2Xp9xnruDdsd")
        const bytes = jsonToHexBytes('ABC')
        console.log('ABC')
        console.log(bytes)
        // const returnw=hex2buf(bytes)
        // console.log(returnw)
        const op = await contract.methods.end_game(
            bytes
        ).send()
        await op.confirmation(1);
   } catch(error) {
        throw error;
   }
};