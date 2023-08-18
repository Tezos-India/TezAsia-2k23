import React, { FC, useState } from 'react';

interface UserDashboardProps {
  avatarName: string;
  setAvatarName: (name: string) => void;
  onSave: () => void;
  onBack: () => void;
}

export const UserDashboard: FC<UserDashboardProps> = ({ avatarName, setAvatarName, onSave, onBack }) => {
  const [isNameSaved, setIsNameSaved] = useState(avatarName !== '');

  return (
    <div className="bg-gray-900 p-8 ">
      <div className='flex'>
      <h2 className="text-white text-3xl mb-4">User Dashboard</h2>
      </div>
      {isNameSaved ? (
        <div className='flex'>
          <div className='text-white font-semibold text-lg'>Avatar Name &nbsp;:</div>
          <div className='text-white font-semibold text-lg pl-4'>{avatarName}</div>
        </div>
      ) : (
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          onSave(); 
          setIsNameSaved(true);
        }}>
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
      )}
      <section>
        <h3 className="text-white mt-4">MyNFT’s</h3>
        {/* NFT items here */}
      </section>
      <section>
        <h3 className="text-white mt-4">Achievements</h3>
        {/* Achievement items here */}
      </section>
      <div className='flex justify-end'>
        <button onClick={onBack} className="text-white text-xl bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-full">Back</button>
      </div>
    </div>
  );
}
