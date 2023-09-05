import React from 'react'
import WalletLogElement from './WalletLogElement'

export default function WalletLog() {
  return (
    <div className='w-full h-screen mx-12 my-10'>
      <div className='flex flex-col'>
        <div className='relative text-5xl font-bold font-poppins text-white text-left'>Wallet History</div>
        <div class="parent h-[500px] overflow-hidden m-2 mt-6">
          <div class="child h-auto max-h-[300px] overflow-y-scroll">
            <WalletLogElement />
            <WalletLogElement />
            <WalletLogElement />
            <WalletLogElement />
            <WalletLogElement />
            <WalletLogElement />
          </div>
        </div>
      </div>
    </div>
  )
}



