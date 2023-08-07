import React from 'react'
import Image from "next/image";

const LargeCard = ({ img, title, desc }: any) => {
  return (
    <div className='flex  bg-gray-900 border rounded-lg p-8 m-12 hover:opacity-80 hover:shadow-lg transition duration-500'>
      <div className='m-2 mr-16'>
        <Image className='border rounded-full' src={img} alt="" width={400} height={400} />
      </div>
      <div>
        <h1 className='text-white text-6xl font-serif '>{title}</h1>
        <br />
        <p className='text-gray-400 text-xl font-mono mr-60'>{desc}</p>
        <div className='flex justify-center mt-12'>
        <button className='border border-white rounded-lg p-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </button>
        </div>
       
      </div>
    </div>
  )
}

export default LargeCard