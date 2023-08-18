import React from 'react';
import Messages from './Messages';
import PGNViewer from './PGNViewer';
import TapMessages from './TapMessages';
import { useGame } from '@/contexts/GamesContext';
import { allowLiveChat } from '@/vars';
import styles from './Sidebar.module.css';
interface SidebarProps {
  gameId: string; // Replace string with the actual type of gameId
}

export default function Sidebar({ gameId }: SidebarProps) {
  const { game, gameOver, publicGame } = useGame();

  return (
    <React.Fragment>
      <div className='sidebar-header'  >
        <h3 style={{ textAlign: 'center' }}>
          {gameOver ? `Game Over ${gameOver.result}` : game && game.turn() === 'w' ? "White to move" : "Black to move"}
        </h3>
      </div>
      <div className='game-sidebar'>
        <PGNViewer />
        {publicGame && !allowLiveChat ? <TapMessages gameId={gameId} /> : <Messages gameId={gameId} />}
      </div>
    </React.Fragment>
  );
}
