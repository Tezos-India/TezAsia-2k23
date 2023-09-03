import React,{useState,useEffect} from 'react'
import axios from 'axios'
import FetchNFT from './fetchNFT'
import Categories from './Categories/Categories';
import Card from './Card/Card';
import { collectNFT,hex2buf, transferNFT } from '../utils/operation';
import Pagination from '../utils/Pagination.jsx';
import { getAccount } from '../utils/wallet';
import { Token } from 'nft.storage';

const Inventory = () => {
  const[Tokendata,setTokenData]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  useEffect(()=>{
       
    const fetchData = async () => {
      
      try {
        const response= await axios.get(
          `https://api.ghostnet.tzkt.io/v1/contracts/KT1RyU6sq5uPLeg5HqpQjccL6czVux8q1T7e/bigmaps/data/keys`
        );
        const response1  = await axios.get(
          `https://api.ghostnet.tzkt.io/v1/contracts/KT1JexJ1zkHhEhP7EXojJphAuVQ4sUgMCiyY/bigmaps/token_metadata/keys`
        );
        // const response2=await axios.get('https://api.tzkt.io/v1/tokens/balances?account=tz1eUd9joGEHLevziAZmPKB2upkjK1QJKbUg');
        const d1 = response.data;
        const d2 = response1.data;
        // const d3=response2.data;
        // console.log(d3)
        console.log(d1)
        console.log(d2)

    
        let tokenData = [];
        for (let i = 0; i < d1.length; i++) {
          
          if((d2[i].value.token_info)!='' || (d2[i].value.token_info)===undefined ){
            // console.log(d2[i].value.token_info[""])
            
           
            const s = hex2buf(d2[i].value.token_info[""]).split("//").at(-1).replace('"','');
            console.log(s)
            
            const res = await axios.get("https://ipfs.io/ipfs/" + s);
            let l1;
            const address=await getAccount();
             if(d1[i].value.holder===address || d1[i].value.author===address){
              l1= d1[i].value;
              const l2 = res.data;
            
            tokenData.push({
            ...l1,
            ...l2,
             token_id: d2[i].value.token_id,
          });

             }
             console.log(l1)
              
         
             
          // console.log(tokenData)
          }   
        }
        // console.log(tokenData)
        console.log(tokenData)
        setTokenData(tokenData)

        
        return tokenData;
          
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    // console.log(tokenFetch())
  },[])
  const RenderCards=({data})=>{
  
    if(data?.length>0){
      return(
        data?.map((post,key)=>
          <Card 
          key={key}
          header={post.name}
          description={post.description}
          id={post.amount}
          owner={post.holder}
          newimage={post.image}
          isDiff={false}
          tokenId={post.token_id}

          
         />
        )
      )   
    } 
  }
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Tokendata.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div >
    <h1 className='text-[#fff] text-[50px] ml-4 font-montserrat'>Inventory</h1>
    <Categories />
    <div className='grid grid-cols-4 gap-5 width-[100vw] '>
      
      <RenderCards data={currentPosts} />
    </div>
    <Pagination
        postsPerPage={postsPerPage}
        totalPosts={Tokendata.length}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={currentPage}
      />
    </div>
  )
}

export default Inventory
