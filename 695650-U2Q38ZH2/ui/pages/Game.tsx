import React, { useState, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const Game = () => {
  const [room, setRoom] = useState<string | null>(null);
  const roomCodeRef = useRef<HTMLInputElement | null>(null);

  const createRoom = () => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    socket.emit('createRoom', roomCode);
    setRoom(roomCode);
  };
  
  const joinRoom = () => {
    if (roomCodeRef.current) {
      const roomCode = roomCodeRef.current.value;
      socket.emit('joinRoom', roomCode);
      setRoom(roomCode);
    }
  };
  
  return (
    <div>
      {!room ? (
        <div>
          <button onClick={createRoom}>Create Room</button>
          <input ref={roomCodeRef} placeholder="Enter Room Code" />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          Room Code: {room}
          {/* Place your chess board component here */}
        </div>
      )}
    </div>
  );
}

export default Game;
