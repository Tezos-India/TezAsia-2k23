// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation

import { tezos } from "./tezos";





export const retStorage = async () => {
	
  
   
try{
	   const contract = await tezos.wallet.at("KT196oSyVYUemUEH277cpTvAKYQEu4BfGRQf");
	   const str = await contract.storage();
	
	
	/*
	rannum = rannum|0
	shanum = shanum|0
	time1 = time1|0


   const contract = await tezos.wallet.at("KT1FySa48i7uA4NZnuFGk31ohtPPi1LGL3zi");
   const op = await contract.methods.startgame(rannum,shanum,time1).send()
*/
   //await str.confirmation(1);
   return str;

   
}
catch(error){
	throw error
}


};





export const startGameOperation = async (rannum:number,shanum:number,time1:number) => {
	
  
   
try{
	rannum = rannum|0
	shanum = shanum|0
	time1 = time1|0


   const contract = await tezos.wallet.at("KT196oSyVYUemUEH277cpTvAKYQEu4BfGRQf");
   const op = await contract.methods.startgame(rannum,shanum,time1).send()

   await op.confirmation(1);

   
}
catch(error){
	throw error
}


};

export const resetGame = async () => {
   
try{
   const contract = await tezos.wallet.at("KT196oSyVYUemUEH277cpTvAKYQEu4BfGRQf");
   const op = await contract.methods.resetall().send()
   await op.confirmation(1);
 
}
catch(error){
	throw error
}

};


export const endGameOperation = async () => {
   
try{
   const contract = await tezos.wallet.at("KT196oSyVYUemUEH277cpTvAKYQEu4BfGRQf");
   const op = await contract.methods.endgame().send()
   await op.confirmation(1);
 
}
catch(error){
	throw error
}

};



export const BidOperation = async (rannum:number,selnum:number,tez:number,time2:number) => {
	
	
   
try{
	rannum = rannum|0
	selnum = selnum|0
	selnum = selnum%6
	if(selnum%6 == 0 ){
		selnum=1
		selnum = selnum|0
	}
	
	time2 = time2|0
	tez = tez|0
	//tez = tez
	
	
   const contract = await tezos.wallet.at("KT196oSyVYUemUEH277cpTvAKYQEu4BfGRQf");
   //const op = await contract.methods.mybid().send({
	   //amount: 1,
	 //  mutez: false
   //})
   
   
   const op = await contract.methods.mybid(rannum,selnum,tez,time2).send({
	   amount: tez,
	   mutez: false
   })
   
   await op.confirmation(1);
}
catch(error){
	throw error
}

};

// TODO 10 - Call end_game entrypoint in the Lottery contract by completing endGameOperation

