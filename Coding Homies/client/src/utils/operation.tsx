// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation
import {tezos} from "./tezos"


const contractAddress='KT1RyU6sq5uPLeg5HqpQjccL6czVux8q1T7e';

// export const hex2buf = (hex) => {
// 	return new Uint8Array(
// 		hex.match(/[da-f]{2}/gi).map((h) => parseInt(h, 16))
// 	);
// };
 
// export function bytes2Char(hex) {
// 	return Buffer.from(hex2buf(hex)).toString("utf8");
// }

  
// export const mintNFT = async (amount,metadata) => {
//       try {
//         console.log(amount,metadata) 
//         const contract = await tezos.wallet.at('KT19YBGhmge3upmDXFJVKmJrWGoazhtHZSjR');
// 		console.log('Hello')
//         let bytes = "";
//         for (var i = 0; i < metadata.length; i++) {
//           bytes += metadata.charCodeAt(i).toString(16).slice(-4);
//         }
//         console.log(contract)
//         const op = await contract.methods.mint(amount, bytes).send();
//         console.log(op)
//         console.log(op.confirmation)
//         await op.confirmation();
        
        
//       } catch (e) {
//         console.log(e);
//       }
// };
interface nftObject{
  amount :any,
  metadata: any

}
function jsonToHexBytes(json:any) {
  
  const jsonString = JSON.stringify(json);

  const textEncoder = new TextEncoder();
  const byteArray = textEncoder.encode(jsonString);

// Step 3: Convert byte array to hexadecimal representation
  const hexBytes = Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0')).join('');

  // Return the byte array.
  return hexBytes;
}
export const mintNFT = async (nftDetails:nftObject) => {
  try {
    console.log( nftDetails.amount, nftDetails.metadata);
    const contract = await tezos.wallet.at('KT1RyU6sq5uPLeg5HqpQjccL6czVux8q1T7e');
    
   
    console.log()
    const bytes = jsonToHexBytes(nftDetails.metadata.url)
    console.log(nftDetails.metadata.length)
    console.log(bytes)
    const returnw=hex2buf(bytes)
    console.log(returnw)
    
    const op = await contract.methods.mint(nftDetails.amount, bytes).send();
    await op.confirmation();
  } catch (e) {
    console.log(e);
  }
};
// export const collectNFT = async ( amount, id ) => {
// 	try {
// 			const contract = await tezos.wallet.at(contractAddress);
 
// 			const op = await contract.methods
// 				.collect(id)
// 				.send({ mutez: true, amount: amount });
// 			await op.confirmation();
//       let tokenData=await fetchData();
//       return tokenData;
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	;
// };

export const collectNFT = async (amount:number, id: string) => {
  try {
    const contract = await tezos.wallet.at('KT1RyU6sq5uPLeg5HqpQjccL6czVux8q1T7e');
    console.log(amount,id)

    const op = await contract.methods
      .collect(id)
      .send({ mutez: true, amount: amount });
    await op.confirmation();
    // let tokenData = await fetchData();
    // console.log(tokenDat
    // return tokenData;
    
  } catch (e) {
    console.log(e);
  }
};

export const hex2buf = (hexString:String) => {

// Step 1: Split hexadecimal string into pairs of two characters
const hexPairs = hexString.match(/.{2}/g);

// Step 2: Convert hexadecimal pairs to decimal numbers
const decimalArray = hexPairs.map(hexPair => parseInt(hexPair, 16));

// Step 3: Convert decimal numbers to characters
const characters = decimalArray.map(decimal => String.fromCharCode(decimal)).join('');
return characters;
};
 
// export function bytes2Char(hex:any) {
// 	return Buffer.from(hex2buf(hex)).toString("utf8");
// }

interface transferObject{
  object:any
  
}


export const transferNFT=async(transferDetails:transferObject)=>{
  try{
    const contractInstance=await tezos.wallet.at('KT1RyU6sq5uPLeg5HqpQjccL6czVux8q1T7e');
    console.log(transferDetails)
    const op=await contractInstance.methods.transfer(transferDetails).send();
    await op.confirmation(1);
  }catch(error){
    throw error;
  }
}


export const updateAdmin=async ()=>{
    try {
        const contractInstance = await tezos.wallet.at(contractAddress);
        const op = await contractInstance.methods.updateAdmin().send();
        await op.confirmation(1);
      } catch (err) {
        throw err;
      }

}
  
  // TODO 10 - Call end_game entrypoint in the Lottery contract
  // export const endGameOperation = async () => {
  //   try {
  //     const contractInstance = await tezos.wallet.at(contractAddress);
  //     const op = await contractInstance.methods.end_game().send();
  //     await op.confirmation(1);
  //   } catch (err) {
  //     throw err;
  //   }
  // };