import React from 'react';
import './Instructions.css';

const Instruction = () => {
  return (
    <div className="instruction-container">
      <h1>Instructions for Tezos NFT Marketplace</h1>
      <ol>
        <li>Create a Tezos Wallet</li>
        <p>In order to buy, sell or trade Tezos NFTs, you will need a Tezos wallet that supports the FA2 token standard. Some popular wallets include Temple, Galleon, and Kukai.</p>
        <li>Fund Your Wallet</li>
        <p>You will need to have XTZ (Tezos native cryptocurrency) in your wallet to pay for gas fees when making transactions on the Tezos blockchain. You can purchase XTZ on cryptocurrency exchanges such as Binance, Kraken, and Coinbase.</p>
        <li>Connect Your Wallet to the Marketplace</li>
        <p>Once you have set up your wallet and funded it with XTZ, you can connect it to the Tezos NFT Marketplace by clicking the "Connect Wallet" button and selecting your wallet from the list of supported wallets.</p>
        <li>Browse Listings</li>
        <p>You can browse existing NFT listings on the marketplace by clicking the "Marketplace" button in the navigation bar. You can filter listings by category, price, and other criteria.</p>
        <li>Create a Listing</li>
        <p>If you want to sell an NFT, you can create a listing by clicking the "Create Listing" button and filling out the required information, such as name, description, and price.</p>
        <li>Buy or Make an Offer</li>
        <p>If you find an NFT that you want to purchase, you can either buy it outright (if it is listed as "Buy Now") or make an offer (if the seller has enabled the "Make Offer" option). You will need to confirm the transaction and pay the required XTZ gas fee.</p>
        <li>Manage Your NFTs</li>
        <p>You can view and manage your owned NFTs by clicking the "My NFTs" button in the navigation bar. From there, you can transfer or sell your NFTs, as well as view their transaction history.</p>
      </ol>
    </div>
  );
};

export default Instruction;
