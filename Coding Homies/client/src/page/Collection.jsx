import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories/Categories'
import Games from '../components/Games'
import Carousel from '../components/Carousel/Carousel'
import FetchNFT from '../components/fetchNFT'
import { fetchData } from '../utils/fetchData'

const Collection = () => {
  const[gameData,setGameData]=useState([]);
  useEffect(()=>{
    (async()=>{
      
      const gData=await fetchData();
      setGameData(gData)
     
    })()

  },[])
  console.log(gameData)


  return (
    <div className=''>
        <Header />
        {/* <h1 className=' ml-20 italic gap-6 text-6xl font-primary my-3 '>ACTION          ADVENTURE     RPG         SHOOTING</h1> */}

        {/* <Carousel array={gameData}/> */}
        
        <Games />
        
        
      
    </div>
  )
}

export default Collection
