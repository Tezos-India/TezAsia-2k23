import React, { FC, useState, useEffect } from "react";

interface UserDashboardProps {
  avatarName: string;
  setAvatarName: (name: string) => void;
  onSave: () => void;
  onBack: () => void;
  editMode: boolean;
  onEdit?: () => void;
}

export const UserDashboard: FC<UserDashboardProps> = ({
  avatarName,
  setAvatarName,
  onSave,
  onBack,
  editMode,
}) => {
  const [initialAvatarName, setInitialAvatarName] = useState(avatarName);
  const [isEditing, setIsEditing] = useState(editMode);

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
    <div className="pointer-events-auto bg-gray-900 p-12 w-full md:max-w-4xl mx-auto rounded-lg relative shadow-xl">
      <button
        onClick={handleBackClick}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-800 transition"
      >
        ✖
      </button>
      <h2 className="text-purple-500 text-4xl mb-6 border-b border-purple-400 pb-2">
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
          <label className="text-white mb-2 block text-lg">Avatar Name*:</label>
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
            <div className="text-white font-semibold text-lg">Avatar Name:</div>
            <div className="text-white font-semibold text-lg">{avatarName}</div>
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
        {/* NFT items here */}
        {/* Placeholder if no NFTs */}
        <p className="text-white opacity-70">Play games to unlock</p>
      </section>
      <section className="mb-6">
        <h3 className="text-purple-500 mb-2 text-2xl">Achievements</h3>
        {/* Achievement items here */}
        {/* Placeholder if no Achievements */}
        <p className="text-white opacity-70">Play games to unlock</p>
      </section>
    </div>
  );
};
