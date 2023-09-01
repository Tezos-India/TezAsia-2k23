import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from './Card';
import { collectNFT,hex2buf } from '../utils/operation';
import {fetchData} from '../utils/fetchData.js'
import Carousel from './Carousel';
import Categories from './Categories';
import Pagination from '../utils/Pagination.jsx';

const InventoryCard = () => {
  const[gamedata,setgameData]=useState([]);
  const[search,setSearch]=useState('')
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  // const[toggle,setToggle]=useState(false)
  const[token,setToken]=useState('c59n15dhg7u7w2t5jurqcheb39n9xe');
  const stapleImage={ url: 'https://images5.alphacoders.com/109/1091255.png'}
  
  
  
  useEffect(()=>{
   
    (async()=>{
      
      const gData=await fetchData();
      setgameData(gData)
     
    })()
    
  },[])

  
  const FindImage= (post)=>{
    
    if(post.cover){
      return post.cover;
    }else{
      return stapleImage
    }
  }
  
  const RenderCards=({data})=>{
  
    if(data?.length>0){
      return(
        data?.map((post,key)=>
          <Card 
          key={key}
          header={post.name}
          description={post.summary}
          id={post.id}
          rating={post.rating}
          image={FindImage(post)}
          isDiff={true}
          
         />
        )
      )   
    } 
  }
  const handleSearch = async () => {
    if (search) {

      // const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      const GameData=gamedata;
     

      const searchedExercises = GameData.filter(
        (item) => item.name.toLowerCase().includes(search)
               || item.target.toLowerCase().includes(search)
               || item.equipment.toLowerCase().includes(search)
               || item.bodyPart.toLowerCase().includes(search),
      );

      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

      setSearch('');
      setgameData(searchedExercises);
    }
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = gamedata.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className='ml-4  '>
      {/* <button onClick={collectNFT} className='px-4 py-2 text-xs font-bold  text-white font-montserrat  transition-all duration-150 bg-red-700 rounded shadow outline-none active:bg-red-100 hover:shadow-md focus:outline-none ease'>Collect Nfts</button> */}
      {/* <Carousel array={gamedata} /> */}
      <Categories />
      <div className='grid grid-cols-4 gap-5 width-[100vw]'>
      <RenderCards data={currentPosts} />
       
     
      </div>
      
      
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={gamedata.length}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={currentPage}
      />
    </div>
  )
}

export default InventoryCard;
