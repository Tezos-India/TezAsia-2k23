import { useEffect, useState } from "react";
import { connectWallet } from "../dapp/tezos";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";

const Form = () => {
  const [username, setUsername] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const onConnectWallet = async () => {
    try {
      const { userAddress }:any = await connectWallet();
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
      const userDataResponse = await fetch(
        `${apiUrl}/user/${walletAddress}`
      );
      if (!userDataResponse.ok) {
        setIsNewUser(true);
      } else {
        const userData = await userDataResponse.json();
        if (userData.avatarName) {
          setIsNewUser(false); // Existing user
          setUsername(userData.avatarName || "");
        }
      }
    } catch (error) {
      console.error("Error occurred while fetching user data:", error);
    }
  };

  const registerAvatarName = async (name: any) => {
    try {
      await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: walletAddress,
          avatarName: name,
        }),
      });
      setUsername(name);
      setIsNewUser(false);
      console.log("Avatar name registered successfully!");
    } catch (error) {
      console.error("Error occurred while registering avatar name:", error);
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
            {isNewUser && (
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your avatar name"
                />
                <button
                  type="button"
                  onClick={() => registerAvatarName(username)}
                >
                  Sign Up
                </button>
              </div>
            )}

            <Menu>
              <MenuHandler>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </MenuHandler>
              <MenuList className="p-8">
                <MenuItem className="flex items-center gap-2">
                  <p className="font-normal">
                    Username: {isNewUser ? "No" : username}
                  </p>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                    />
                  </svg>
                  <button
                    className="text-gray-500 text-2xl "
                    type="button"
                    onClick={onDisconnectWallet}
                  >
                    Sign Out
                  </button>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </>
      ) : (
        <button
          className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] "
          type="button"
          onClick={handleButtonClick}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Form;
