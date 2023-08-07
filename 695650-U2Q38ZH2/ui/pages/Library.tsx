import { Footer } from '@/components/Footer'
import LargeCard from '@/components/LargeCard'
import Navbar from '@/components/Navbar'
import React from 'react'

const Library = () => {
  return (
    <div className=" bg-gray-800">
        <Navbar/>
        <hr className="border-t border-white h-2 my-2"></hr>
        <LargeCard title="Chess" desc="Collect, Play, and Conquer - Chess NFT Card Game brings the world of NFTs  and chess together for an unparalleled gaming experience" img="/3.jpeg"/>
        <LargeCard title="Chess" desc="Collect, Play, and Conquer - Chess NFT Card Game brings the world of NFTs  and chess together for an unparalleled gaming experience" img="/3.jpeg"/>
        <Footer/>
    </div>
  )
}

export default Library