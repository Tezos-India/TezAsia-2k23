import React, { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faGamepad,
  faTimesCircle,
  faDrawPolygon,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface UserDashboardProps {
  avatarName: string;
  setAvatarName: (name: string) => void;
  onSave: () => void;
  onBack: () => void;
  editMode: boolean;
  onEdit?: () => void;
  account: any;
}

export const UserDashboard: FC<UserDashboardProps> = ({
  avatarName,
  setAvatarName,
  onSave,
  onBack,
  editMode,
  account,
}) => {
  const [initialAvatarName, setInitialAvatarName] = useState(avatarName);
  const [isEditing, setIsEditing] = useState(editMode);
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    gamesDrawn: 0,
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [nfts, setNfts] = useState([]);

  async function fetchNFTs() {
    try {
      const response = await fetch(
        `https://api.ghostnet.tzkt.io/v1/tokens?contract=KT1J82VHvCFMwPypUsr3vctf6kLpYFhgSJwB&metadata.owner=${account}`
      );
      const data = await response.json();
      setNfts(data);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  }

  async function fetchGameStats() {
    try {
      const userId = localStorage.getItem("userId");
      console.log(`DEBUG: user ID ${userId}`);
      if (!userId) {
        console.warn("User ID is not available yet.");
        return;
      }

      const response = await fetch(`${apiUrl}/gameStats/${userId}`);
      const data = await response.json();
      setGameStats(data);
      console.log(`DEBUG: fetch game stats: ${gameStats}`);
    } catch (error) {
      console.error("Error fetching game stats:", error);
    }
  }

  useEffect(() => {
    fetchGameStats();
  }, []);

  useEffect(() => {
    fetchNFTs();
  }, []);


  useEffect(() => {
    setIsEditing(editMode);
  }, [editMode]);

  useEffect(() => {
    if (avatarName) {
      setInitialAvatarName(avatarName);
    }
  }, [avatarName]);

  const handleBackClick = () => {
    if (isEditing && initialAvatarName !== avatarName) {
      alert("You have unsaved changes. Please save avatar details first.");
    } else {
      onBack();
    }
  };

  return (
    <div
      className="pointer-events-auto bg-gray-900 p-16 w-full md:max-w-4xl mx-auto rounded-lg relative shadow-xl h-[90vh] overflow-y-auto
    "
    >
      <button
        onClick={handleBackClick}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-800 transition"
      >
        ✖
      </button>
      <div className="dashboard-content ">
        <h2 className="text-purple-500 text-4xl mb-4 border-b border-purple-400 ">
          User Dashboard
        </h2>

        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
              setIsEditing(false);
            }}
          >
            <label className="text-white mb-2 block text-lg">
              Avatar Name*:
            </label>
            <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4">
              <input
                value={avatarName}
                onChange={(e) => setAvatarName(e.target.value)}
                className="bg-gray-800 text-white w-full md:w-2/3 rounded px-3 py-2 mb-4"
                required
              />
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded mt-4 md:mt-0"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-semibold text-lg">
                Avatar Name:
              </div>
              <div className="text-white font-semibold text-lg">
                {avatarName}
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded self-end"
            >
              Edit
            </button>
          </div>
        )}

        <section className="mb-6">
          <h3 className="text-purple-500 mb-2 text-2xl">MyNFT’s</h3>
          {nfts.length === 0 ? (
            <p className="text-white opacity-70">Play games to unlock</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {nfts.map((nft) => (
                <div
                  key={nft.id}
                  className="bg-gray-800 p-4 rounded shadow-lg flex flex-col items-center justify-between space-x-4"
                >
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${
                      nft.metadata.displayUri.split("//")[1]
                    }`}
                    alt={nft.metadata.name}
                    className="w-32 h-32 mb-2 rounded-full"
                    width={128}
                    height={128}
                  />
                  <p className="text-white text-lg">{nft.metadata.name}</p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={fetchNFTs}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 mt-4 rounded"
          >
            Import My NFTs
          </button>
        </section>

        <section className="mb-6">
          <h3 className="text-purple-500 mb-2 text-2xl">Achievements</h3>
          <p className="text-white opacity-70">Play games to unlock</p>
        </section>

        <section className="mb-6">
          <h3 className="text-purple-500 mb-4 text-2xl">Chess Game Stats</h3>
          {gameStats ? (
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: faGamepad,
                  count: gameStats.gamesPlayed,
                  label: "Games Played",
                },
                {
                  icon: faTrophy,
                  count: gameStats.gamesWon,
                  label: "Games Won",
                },
                {
                  icon: faTimesCircle,
                  count: gameStats.gamesLost,
                  label: "Games Lost",
                },
                {
                  icon: faDrawPolygon,
                  count: gameStats.gamesDrawn,
                  label: "Games Drawn",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded shadow-lg flex items-center justify-between space-x-4"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    size="2x"
                    className="text-gray-400"
                  />
                  <div className="text-right">
                    <p className="text-white text-xl font-bold">{item.count}</p>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white opacity-70">Fetching stats...</p>
          )}
          <button
            onClick={fetchGameStats}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 mt-4 rounded"
          >
            Refresh Stats
          </button>
        </section>
      </div>
    </div>
  );
};
