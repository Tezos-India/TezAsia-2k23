import React from 'react'
import { useState, useEffect } from 'react'
import NovelCarousel from '../components/NovelCarousel'
import { fetchStorage } from '../utils/tzkt';

function Home() {

  useEffect(() => {
    (async () => {
        // const res = await fetchStorage();
        // console.log(res);              
    })();    
  }, []); 

  return (
    <div>
        <NovelCarousel />
    </div>
  )
}

export default Home