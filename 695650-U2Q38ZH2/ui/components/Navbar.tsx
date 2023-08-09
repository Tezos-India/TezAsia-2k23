import React, { useState, useEffect } from "react";
import Link from "next/link";
import { connectWallet, disconnect, getAccount } from "../dapp/tezos";
import { UserDashboard } from "./UserDashboard";
import { DropdownMenu } from "./DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function WelcomePopup({
  avatarName,
  onClose,
}: {
  avatarName: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded">
        <p>Welcome, {avatarName}!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function Navbar() {
  const [account, setAccount] = useState<string>("");
  const [avatarName, setAvatarName] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAccount() {
      const account = await getAccount();
      setAccount(account);

      try {
        const response = await fetch(`http://localhost:5000/user/${account}`);
        const data = await response.json();
        if (data && data.avatarName) {
          setAvatarName(data.avatarName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchAccount();
  }, []);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      const account = await getAccount();
      setAccount(account);
      console.log(`DEBUG: handling Connect`);

      const response = await fetch(`http://localhost:5000/user/${account}`);

      if (response.status === 404) {
        console.log(`DEBUG: User does not exist, show dashboard is true`);
        setShowDashboard(true);
        return; // return early since the user does not exist
      }

      const user = await response.json(); // Only attempt to parse JSON for valid responses

      if (user && user.avatarName) {
        // User exists
        setAvatarName(user.avatarName);
        setShowWelcomePopup(true); // Show the welcome popup for existing users
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  const handleDisconnectWallet = () => {
    console.log(`DEBUG:Disconnect Wallet`);
    disconnect();
    setAccount("");
    setShowDropdown(false);
    setShowDashboard(false);
  };

  const saveForm = async () => {
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatarName, walletAddress: account }),
      });

      if (response.ok) {
        alert("Avatar created successfully");
        setShowDashboard(false);
      } else {
        const data = await response.json();
        alert("Error saving avatar:" + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving avatar data:", error);
      alert("Failed to save avatar.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center gap-8 ml-[80px] mr-8 pt-6 pb-6">
        <Link href="/">
          <div className="text-white text-6xl font-sans cursor-pointer">
            EtherStrike
          </div>
        </Link>
        <Link href="/Library">
          <button className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] ">
            Library
          </button>
        </Link>
        {account ? (
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="w-12 h-12 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <DropdownMenu
                onDashboardClick={() => setShowDashboard(true)}
                onDisconnect={handleDisconnectWallet}
              />
            )}
          </div>
        ) : (
          <button
            className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto']"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
      {showDashboard && (
        <UserDashboard
          avatarName={avatarName || ""}
          setAvatarName={setAvatarName}
          onSave={saveForm}
          onBack={() => setShowDashboard(false)}
        />
      )}
      {showWelcomePopup && (
        <WelcomePopup
          avatarName={avatarName || ""}
          onClose={() => setShowWelcomePopup(false)}
        />
      )}
    </>
  );
}
