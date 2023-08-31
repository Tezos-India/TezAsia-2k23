import React, { useState, useEffect } from "react";
import Link from "next/link";
import { connectWallet, disconnect, getAccount } from "../dapp/tezos";
import { UserDashboard } from "./UserDashboard";
import { DropdownMenu } from "./DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import WelcomePopup from "./WelcomePopup";
import { useAccount } from "@/contexts/AccountContext";

export function Navbar() {
  const {
    account,
    setAccount,
    avatarName,
    setAvatarName,
    avatarId,
    setAvatarId,
  } = useAccount();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchAccount() {
      const account = await getAccount();
      setAccount(account);

      try {
        const response = await fetch(`${apiUrl}/user/${account}`);
        const data = await response.json();
        if (data && data.avatarName) {
          setAvatarName(data.avatarName);
          setAvatarId(data.id);
          console.log(
            "Setting avatarName and userId in context:",
            data.avatarName,
            data.id
          );
        } else {
          handleConnectWallet();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchAccount();
  }, [setAccount]);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      const account = await getAccount();
      setAccount(account);
      console.log(`DEBUG: handling Connect`);

      const response = await fetch(`${apiUrl}/user/${account}`);

      if (response.status === 404) {
        console.log(`DEBUG: User does not exist, show dashboard is true`);
        setShowDashboard(true);
        setEditMode(true);
        return;
      }
      const user = await response.json();
      if (user && user.avatarName) {
        setAvatarName(user.avatarName);
        setAvatarId(user.id);
        setShowWelcomePopup(true);
        console.log(
          "Setting avatarName and userId in context:",
          user.avatarName,
          user.id
        );
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
    setAvatarName(null);
    setAvatarId(null);
  };

  const saveForm = async () => {
    try {
      const url = `${apiUrl}/user/upsert`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatarName, walletAddress: account }),
      });

      if (response.ok) {
        alert(
          editMode
            ? "Avatar updated successfully"
            : "Avatar created successfully"
        );
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
      <div className="pointer-events-auto flex justify-between items-center gap-8 p-6 bg-gradient-to-br from-gray-900 to-black">
        <Link href="/">
          <span className="text-purple-400 text-4xl font-bold hover:text-purple-600 transition duration-200">
            BLOCKS
          </span>
        </Link>
        <div className="">
          <Link href="/Library">
            <span className="text-purple-400 text-2xl hover:text-purple-600 transition duration-200 mr-6">
              Library
            </span>
          </Link>
          <Link href="/AboutUs">
            <span className="text-purple-400 text-2xl hover:text-purple-600 transition duration-200">
              About Us
            </span>
          </Link>
        </div>

        {account ? (
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="w-8 h-8 text-gray-300 cursor-pointer hover:text-purple-400 transition duration-200"
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
            className="text-white text-xl bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-full"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
      {showDashboard && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="z-0">
            <UserDashboard
              avatarName={avatarName || ""}
              setAvatarName={setAvatarName}
              onSave={() => {
                saveForm();
                setEditMode(false);
              }}
              onEdit={() => setEditMode(true)}
              onBack={() => {
                if (editMode) {
                  alert("Please save avatar details first.");
                } else {
                  setShowDashboard(false);
                }
              }}
              editMode={editMode}
              account={account}
            />
          </div>
        </div>
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
