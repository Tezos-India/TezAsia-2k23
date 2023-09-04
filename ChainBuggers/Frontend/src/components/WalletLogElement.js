import React from 'react'
import arrow from '../assets/downArr.png';

export default function WalletLogElement() {
    return (
        <div className='w-2/3 h-24 rounded-lg backdrop-blur-md'>
            <div className='flex justify-between items-center'>
                <div className='border-4 w-14 h-14 rounded-md'>
                    <img className='mx-auto my-2' src={arrow} />
                </div>
                <div className='font-poppins font-semibold text-3xl text-white'>Withdraw</div>
                <div className='font-poppins font-regular text-2xl text-white'>06:24:45 AM</div>
                <div className='font-poppins font-semibold text-3xl text-white'>542</div>
                <div className='font-poppins font-medium text-3xl text-[#9C9C9C]'>Pending</div>
            </div>
        </div>
    )
}
