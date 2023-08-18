import React, { useState, useEffect } from 'react';
import Game from './Game';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import { useSocket } from '@/contexts/SocketContext';
import { useGame } from '@/contexts/GamesContext';
import Modal from './Modal';
import styles from './Game.module.css';
export default function GamePage() {
  type Popup = {
    message: string;
    extra: string;
    element: JSX.Element;
  };

  const socket = useSocket();
  const [popup, setPopup] = useState<Popup | null>(null);
  const router = useRouter();
  const { gameId } = router.query;

  const { gameOver, orientation } = useGame();
  const [isRematch, setIsRematch] = useState(0);

  useEffect(() => {
    if (!orientation) return;
    if (gameOver != null) {
      let message = gameOver.winner != null ? ((gameOver.winner === 0 && orientation === 'white' || gameOver.winner === 1 && orientation === 'black') ? 'You Win!' : (gameOver.winner === 0 ? 'white' : 'black') + ' wins') : 'Draw';
      setPopup({
        message,
        extra: 'by ' + gameOver.reason,
        element: <button onClick={() => socket?.emit('rematch', gameId)}>Rematch</button>
      });
      setIsRematch(0);
    } else {
      setPopup(null);
    }
  }, [gameOver, orientation]);

  useEffect(() => {
    if (!socket) return;

    const leaveHandler = () => {
      router.push('/');
    };

    const playerLeftHandler = () => {
      setPopup({
        message: "Your opponent left.",
        extra: "they may return...",
        element: <></> // Replace with the appropriate JSX element
      });
    };

    const rematchHandler = () => {
      setIsRematch(1);
    };

    socket.on('leave', leaveHandler);
    socket.on('player left', playerLeftHandler);
    socket.on('rematch', rematchHandler);

    return () => {
      socket.off('leave', leaveHandler);
      socket.off('player left', playerLeftHandler);
      socket.off('rematch', rematchHandler);
    };
  }, [socket]);

  return (
    <div className={styles['smokeDarkTheme']} >
    <div className='game-container'>
      <div className='board-container'>
        {gameId && <Game gameId={gameId as string} />}
      </div>
      <Sidebar gameId={gameId ? (Array.isArray(gameId) ? gameId[0] : gameId) : ''} />
      {popup && socket && (
        <Modal onClose={() => setPopup(null)}>
          <Modal.Header>{popup.message}</Modal.Header>
          <Modal.Body>
            <div style={{ marginBottom: '1em' }}>{popup.extra}</div>
            {popup.element}
          </Modal.Body>
        </Modal>
      )}
    </div>
    </div>
  );
}
