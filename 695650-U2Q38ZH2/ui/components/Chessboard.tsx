import React, { useState, useEffect, useRef } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import io from 'socket.io-client';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const socket = io(`${apiUrl}`); // Server port updated based on your server

const ChessBoard1 = () => {
  const [fen, setFen] = useState('start');
  const [squareStyles, setSquareStyles] = useState({});
  const [game, setGame] = useState(new Chess());
  const [room, setRoom] = useState<string | null>(null);

  const roomInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Listen for the startGame event to get the initial FEN
    socket.on('startGame', (data) => {
      setFen(data.fen);
    });

    // Listen for moveServer to update the board based on other player's move
    socket.on('moveServer', (move) => {
      handleMove(move);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('startGame');
      socket.off('moveServer');
    };
  }, [game]);

  const handleMove = (move: { from: string, to: string }) => {
    try {
      const moveObj = game.move(move);
      if (moveObj) {
        setFen(game.fen());
        setSquareStyles({}); // Reset any highlighted squares
      }
    } catch (error) {
      console.error('Error making move:', error);
    }
  };

  const createRoom = () => {
    if (roomInput.current) {
      const roomName = roomInput.current.value;
      socket.emit('createRoom', roomName);
    }
  };

  const joinRoom = () => {
    if (roomInput.current) {
      const roomName = roomInput.current.value;
      socket.emit('joinRoom', roomName);
    }
  };

  return (
    <div>
      {!room ? (
        <div>
          <input ref={roomInput} placeholder="Enter Room ID" />
          <button onClick={createRoom}>Create Room</button>
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <h2>Room: {room}</h2>
          <Chessboard
            position={fen}
            onDrop={({ sourceSquare, targetSquare }) => {
              const move = { from: sourceSquare, to: targetSquare };
              handleMove(move);
              socket.emit('moveClient', { move, room });
            }}
            squareStyles={squareStyles}
          />
        </div>
      )}
    </div>
  );
};

export default ChessBoard1;
