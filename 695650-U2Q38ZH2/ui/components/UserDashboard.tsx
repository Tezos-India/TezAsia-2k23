// UserDashboard.tsx

import React, { FC, useState } from 'react';

interface UserDashboardProps {
  avatarName: string;
  setAvatarName: (name: string) => void;
  onSave: () => void;
  onBack: () => void;
}

export const UserDashboard: FC<UserDashboardProps> = ({ avatarName, setAvatarName, onSave, onBack }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-lg">
      <button onClick={onBack}>Back</button>
      <h2 className="text-white text-3xl mb-4">User Dashboard</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
        <label className="text-white">Avatar Name*:</label>
        <input 
          value={avatarName} 
          onChange={e => setAvatarName(e.target.value)} 
          className="bg-gray-800 text-white rounded px-2 py-1 mb-4"
          required
        />
        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
      <section>
        <h3 className="text-white mt-4">MyNFT’s</h3>
        {/* NFT items here */}
      </section>
      <section>
        <h3 className="text-white mt-4">Achievements</h3>
        {/* Achievement items here */}
      </section>
    </div>
  );
}
