import { Footer } from '@/components/Footer'
import LargeCard from '@/components/LargeCard'
import {Navbar} from '@/components/Navbar'
import React from 'react'

const Library = () => {
  return (
      <div className="bg-gray-800">
          <Navbar />
          <hr className="border-t border-white h-2 my-2" />
          <LargeCard
              title="Chess"
              desc="Collect, Play, and Conquer..."
              img="/3.jpeg"
              link="/Game"
          />
          <Footer />
      </div>
  )
}

export default Library