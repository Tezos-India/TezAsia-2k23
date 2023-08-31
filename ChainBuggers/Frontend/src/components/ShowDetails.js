import React from 'react'
import heartIcon from '../assets/icon-heart.png'
import infoIcon from '../assets/info.png'
import mobile from '../assets/mobile.png'
import fnb from '../assets/fnb.png'
export default function ShowDetails(props) {
  // console.log("che", props.name)
  return (
    <div className='w-full border-b-2 border-gray-700 '>
      <div className='flex  px-7 py-5 '>
        <div className='flex flex-col'>
          <div className='flex items-center my-2'>
            <img src={heartIcon} className='' />
            <div className=' text-white mx-3'>{props.name.name}</div>

            <img src={infoIcon} className='' />
            <div className=' text-gray-900'>Info</div>

          </div>
          <div className='flex items-center my-2'>
            <img src={mobile} className=' mx-1' />
            <div className='text-green-500 mr-3'>M-Ticket</div>
            <img src={fnb} className='mx-1' />
            <div className='text-orange '>Food & Beverage</div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div></div>
        </div>
      </div>
    </div>
  )
}
