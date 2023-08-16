import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSocket } from '@/contexts/SocketContext';
import { useUser } from '@/contexts/UserContext';
import Loader from './Loader';
import { inDevelopment } from '@/vars';
import { Socket } from 'socket.io-client';
import Image from 'next/image';

export default function Menu() {
  const router = useRouter();
  const socket = useSocket() as Socket;
  const { username } = useUser();
  
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.emit('username', username);

    const handleGameId = (gameId:string) => {
      router.push('/chess/' + gameId);
    };

    socket.on('game id', handleGameId);
    socket.emit('get-users');

    socket.on('get-users', _users => {
      setOnlineUsers(_users);
    });

    return () => {
      socket.off('game id', handleGameId);
      socket.off('get-users');
    };
  }, [socket, username, router]);

  return (
    <div className='menu'>
      {loading ? <Loader /> : (
        <>
          <div className='menu-title'>
            <Image src='/bP.png' alt="Chess logo" width={100} height={100}/>
            <h1>Chess</h1>
          </div>
          <div className='menu-buttons'>
            <button className='chess-button' onClick={() => {
              setLoading(true);
              socket.emit('create');
            }}>
              Private Game
              <span>send a link to a friend</span>
            </button>
            <button className='chess-button' onClick={() => {
              setLoading(true);
              socket.emit('waitlist', username);
            }}>
              Random Opponent
              <span>battle with an unknown player</span>
            </button>
          </div>
          <div style={{position: 'fixed', top: '2em', left: '2em'}}>Online: {onlineUsers.length}</div>
          {inDevelopment && <div className='slide-down develop-message'>Development in process. Sorry for any inconvenience.</div>}
        </>
      )}
    </div>
  );
}