import { useEffect, useState } from "react";
import { connectWallet } from "../dapp/tezos";

const Form = () => {
  const [username, setUsername] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const onConnectWallet = async () => {
    try {
      const { userAddress } = await connectWallet();
      setWalletAddress(userAddress);
      setIsWalletConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const onDisconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
  };

  const fetchUserData = async () => {
    try {
      const userDataResponse = await fetch(`http://localhost:5001/user/${walletAddress}`);
      if (!userDataResponse.ok) {
        setIsNewUser(true);
      } else {
        const userData = await userDataResponse.json();
        if (userData.avatarName) {
          setIsNewUser(false); // Existing user
          setUsername(userData.avatarName || '');
        }
      }
    } catch (error) {
      console.error('Error occurred while fetching user data:', error);
    }
  };

  const registerAvatarName = async (name:any) => {
    try {
      await fetch('http://localhost:5001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: walletAddress, avatarName: name }),
      });
      setUsername(name);
      setIsNewUser(false);
      console.log('Avatar name registered successfully!');
    } catch (error) {
      console.error('Error occurred while registering avatar name:', error);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchUserData();
    }
  }, [walletAddress]);

  const handleButtonClick = async () => {
    await onConnectWallet();
  };

  return (
    <div>
      
      {isWalletConnected ? (
        <>
        <div className="flex">
          <p className="text-2xl pr-4 pt-2 text-white ">Username: {isNewUser ? 'No' : username}</p>
          {isNewUser && (
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your avatar name"
              />
              <button type="button" onClick={() => registerAvatarName(username)}>
                Sign Up
              </button>
            </div>
          )}
          <button className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] " type="button" onClick={handleButtonClick} type="button" onClick={onDisconnectWallet}>
            Disconnect Wallet
          </button>
          </div>
        </>
      ) : (
        <button className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] " type="button" onClick={handleButtonClick} >
        Connect
        </button>
        
      )}
    </div>
  );
};

export default Form;
