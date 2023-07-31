import { useState } from 'react';
import { connectWallet } from '../dapp/tezos';

export default function Navbar() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const onConnectWallet = async () => {
    try {
      const { userAddress } = await connectWallet();
      setWalletAddress(userAddress);
      setIsWalletConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const onDisconnectWallet = () => {
    // Depending on the implementation of connectWallet, this may need to be updated.
    setIsWalletConnected(false);
    setWalletAddress('');
  };

  return (
    <div>
      <h1>My Dapp</h1>
      {!isWalletConnected ? (
        <button onClick={onConnectWallet}>Connect Wallet</button>
      ) : (
        <>
          <button onClick={onDisconnectWallet}>Disconnect Wallet</button>
          <p>Connected wallet address: {walletAddress}</p>
        </>
      )}
    </div>
  );
}
