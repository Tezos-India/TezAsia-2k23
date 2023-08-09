// DropdownMenu.tsx

import React, { FC } from 'react';

interface DropdownMenuProps {
  onDashboardClick: () => void;
  onDisconnect: () => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ onDashboardClick, onDisconnect }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-xl">
      <button 
        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
        onClick={onDashboardClick}
      >
        Dashboard
      </button>
      <button 
        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
        onClick={onDisconnect}
      >
        Disconnect
      </button>
    </div>
  );
}
