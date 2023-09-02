import React from 'react';
import FetchNFT from '../components/FetchNFT'
import Header from '../components/Header'
import Inventory from '../components/Inventory'

const Marketplace = () => {
  return (
    <div>
    
      <Header />
      <Inventory />
      <FetchNFT />
    </div>
  )
}

export default Marketplace
