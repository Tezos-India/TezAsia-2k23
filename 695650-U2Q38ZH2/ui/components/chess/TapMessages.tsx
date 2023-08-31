import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useGame } from '@/contexts/GamesContext';

interface TapMessagesProps {
  gameId: string; // Provide the appropriate type for gameId
}

export default function TapMessages({ gameId }: TapMessagesProps) {
  const socket = useSocket();
  const alertRef = useRef<HTMLAudioElement | null>(null); // Provide the appropriate type
  const { opponent } = useGame();
  const messagesArr = ["Hello", "Still there?", "I'm thinking...", "Good Move", "Thanks", "Yes", "Oops", "Good Game", "Noooo", "I resign", "Gotta go", "lol", "heyyy", "there's a glitch"];
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;
    const handleSocketMessage = (message: string) => {
      setAlerts(prev => [...prev, message]);
      if (alertRef.current) {
        alertRef.current.currentTime = 0;
        alertRef.current.play();
      }
      const timeout = setTimeout(() => {
        setAlerts(prev => prev.slice(1));
        clearTimeout(timeout);
      }, 10000);
    };

    socket.on('message', handleSocketMessage);
    return () => {
      socket.off('message', handleSocketMessage);
    };
  }, [socket]);

  function sendMessage(message: string) {
    if (socket) {
      socket.emit('message', message, gameId);
      setAlerts(prev => [...prev, 'Sent!']);
    }
  }

  return (
    <div style={{ padding: '1em' }}>
      <audio src='/new-alert.mp3' ref={alertRef} />
      {alerts.map((alert, index) => (
        <div key={index} className='message-alert'>
          {alert}
        </div>
      ))}
      <div className='tap-messages'>
        {messagesArr.map((message, index) => (
          <div
            key={index}
            className='tap-message'
            onClick={() => sendMessage(message)}
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
