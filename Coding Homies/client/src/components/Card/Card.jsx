import React,{useState,useEffect} from 'react'
import { NFTStorage, File } from "nft.storage";
import axios from 'axios';
import { collectNFT, mintNFT,transferNFT,hex2buf } from '../../utils/operation';

import { getAccount } from '../../utils/wallet';
import './card.css';


const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZENzAwNkUzNDk2REM5QTlkNGRCMmRlN2Y5NTBlN0M3MmYwZjU3NTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MjAyMDYzMzkyNSwibmFtZSI6IlNlZCBWYWkifQ.PpABS7QPJjW59sNKrIZWIZ3BW7gP0UBJ-2fZj7GNgC0";
const client = new NFTStorage({ token: apiKey });


const Card = ({ header,description,id,rating,image,newimage,isDiff,tokenId,owner}) => {
  const [url,setUrl]=useState("")
  
  useEffect(()=>{
    const getUrl=async ()=>{
      const prevurl="https://ipfs.io/ipfs/"+newimage.replace('ipfs://',"");
      const response=await axios.get(prevurl);
      const newurl=await response.data;
      console.log(newurl)
      setUrl(newurl)
      
  
    }
    getUrl()

  },[newimage])
 
  let newUrl=''
  if(isDiff){
    if(image.url){
      newUrl=image.url.replace(/thumb/g, "720p	")
  
    }

  }
  
const obj = newUrl;
const blob = new Blob([obj], {
  type: 'image/*',
});

  const mintNftOnBuy=async ()=>{
    function makeid(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }
    const metadata = await client.store({
      name: header,
      description: description.substring(0, 100)+'...',
      decimals: 1,
      symbol: 'tz',
      image:blob,
      license:makeid(10)
      
  });
    const amount=Math.random(9,95)*100;
    const roundedAmount=Math.round(amount)
    const object={
      'amount':roundedAmount,
      'metadata':metadata
    }
    
    
    console.log(object)
    
    await mintNFT(object)
    try{
      const response1  = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/KT1RyU6sq5uPLeg5HqpQjccL6czVux8q1T7e/bigmaps/token_metadata/keys`
      );
      // const response2=await axios.get('https://api.tzkt.io/v1/tokens/balances?account=tz1eUd9joGEHLevziAZmPKB2upkjK1QJKbUg');
     
      const d2 = response1.data;
      console.log(d2.length-1)
      if(d2.length<=0){
        NftCollection(roundedAmount,d2.length);

      }else{
        NftCollection(roundedAmount,d2.length-1);

      }

      
      
    }catch(e){
      console.log(e)
    }
    
  }
  const NftCollection=(amount,tokenID)=>{
    console.log(amount)
    collectNFT(amount,tokenID)


  }
  const TransferNftOnBuy=async ()=>{
    const address=await getAccount();
    const sendTo = window.prompt("Who do you wanna Gift to?", "tz1eiNsheTtnSb6dLFFZSZUQJWArseHM6Yfr"); 
    
    
    const object=[
      {
      from_:address,
      txs:[
        {
          to_:sendTo,
          token_id:Number(tokenId),
          amount:1,
          
        }
        
      ]

    }
     
    ]
    console.log(object)
    
    
    
    transferNFT(object)


  }
  
  
  // console.log(newimage)
  return (
   

<div className="card w-[360px]">
    <div className="image">
    {isDiff?(<img
      className="rounded-t-lg"
      src={newUrl}
      alt="" />

    ):(
      <div>
     
      <img
      className="rounded-t-lg"
      src={url}
      alt="" />
      

      </div>
    )}
     
    </div>
    <div className="details max-w-[360px]">
      <div className="center">
        <h1 className='font-montserrat text-[#fff] font-bold'>{header}</h1>
        <p className='font-montserrat text-[#fff]' >{description.substring(0, 30)+'...'}</p>
        {isDiff?(
          <div>
          
          <p className='italic'>Rating:{Math.round(rating * 100) / 100}</p>
          <button onClick={mintNftOnBuy} className="px-4 py-2 text-xs font-bold  text-white font-montserrat  transition-all duration-150 bg-red-700 rounded shadow outline-none active:bg-red-100 hover:shadow-md focus:outline-none ease">Buy</button>

          </div>
        ):(
          <div>
             
             <p className='italic'>Owner:{owner.substring(0, 25)+'...'}</p>
             <button onClick={TransferNftOnBuy} className= "px-4 py-2 text-xs font-bold  text-white font-montserrat  transition-all duration-150 bg-red-700 rounded shadow outline-none active:bg-red-100 hover:shadow-md focus:outline-none ease" >Transfer/Buy</button>
                  
          </div>
        )}
        
      </div>
    </div>
  </div>
  )
}

export default Card
