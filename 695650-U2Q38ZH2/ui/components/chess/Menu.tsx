import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSocket } from '@/contexts/SocketContext';
import { useUser } from '@/contexts/UserContext';
import Loader from './Loader';
import { inDevelopment } from '@/vars';
import styles from './Menu.module.css';
import Image from "next/image";
export default function Menu() {
  
  const router = useRouter();
  const [myGames, setMyGames] = useState<any[]>([]); // Specify the type for myGames
  const [loading, setLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean | undefined>(); // Specify the type for isPrivate
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // Specify the type for onlineUsers
  const [joiningGame, setJoiningGame] = useState(false);
  const [gameId, setGameId] = useState('');

  const handleGameIdChange = (event) => {
    setGameId(event.target.value);
  };

  const handleJoinGameClick = () => {
    console.log('join');
    setJoiningGame(true);
  };

  const handleJoinWithGameId = () => {
    console.log('Joining game with ID:', gameId);
    router.push(`/chess/${gameId}`);
  };

  const socket = useSocket();
  const { username, id } = useUser();
  let showOnline = true;

  useEffect(() => {
    if (!socket) return;
    socket.emit('username', username);
  }, [username, socket]);

  useEffect(() => {
    if (!socket) return;
    function gotogame(gameId: string) { // Specify the type for gameId
      router.push('/chess/' + gameId);
    }
    socket.on('game id', gotogame);
    socket.emit('get-users');
    socket.on('get-users', _users => {
      setOnlineUsers(_users);
    });
    return () => {
      socket.off('game id', gotogame);
      socket.off('get-users');
    };
  }, [socket]);

  return (
 
     
    <div   style={{
    backgroundImage: "url('chess-bg.jpg')",
    backgroundSize: 'cover', // or any other value like 'contain'
    backgroundRepeat: 'no-repeat',
    width: '100vw', // set your desired width
    height: '100vh', // set your desired height
    marginLeft:'-10.3rem'
  }}>
    <div className={styles['menu-container']} >
    
    <div className="smoke-wrap">
     <Image className={styles['smoke']} src="/smoke.png" alt="" width={700} height={700} />
    </div>
    <div className="smoke-wrap">
     <Image className={styles['smoke']} src="/smoke.png" alt="" width={700} height={800} />
    </div>

    <div className="smoke-wrap">
    <Image className={styles['smoke2']}  src="/smoke.png" alt="" width={200} height={1} />
    </div>
    <div className="smoke-wrap">
    <Image className={styles['smoke3']}  src="/smoke.png" alt="" width={200} height={1} />
    </div>
    <div className="smoke-wrap">
    <Image className={styles['smoke2']}  src="/smoke.png" alt="" width={200} height={1} />
    </div>
  
      <div className={styles['menu-card']}>
        
        {loading ? <Loader /> :
          <>
          
          <div className={styles['menu-buttons']}>
      <button
        onClick={() => {
          setLoading(true);
          socket?.emit('create');
        }}
        className={styles['menu-button']}
      >
        Private Game
      </button>
      <button
        onClick={() => {
          setLoading(true);
           socket?.emit('waitlist', username);
        }}
        className={`${styles['menu-button']} ${styles['menu-button-secondary']}`}
      >
        Random Opponent
      </button>
      <button
        onClick={handleJoinGameClick}
        className={`${styles['menu-button']} ${styles['menu-button-secondary']}`}
      >
        Join Game
      </button>
      {joiningGame && (
        <div>
          <input
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={handleGameIdChange}
          />
          <button onClick={handleJoinWithGameId}>Join with Game ID</button>
        </div>
      )}
    </div>
           
            {showOnline && (
              <div className={styles['menu-buttons-1']}>
                Online: {onlineUsers.length}
              </div>
            )}
            {inDevelopment && (
              <div className={styles['menu-dev-message']}>
                Development in process. Sorry for any inconvenience.
              </div>
            )}
          </>
        }
        
      </div>
   
    <div className="smoke-wrap">
    <Image className={styles['smoke2']}  src="/smoke.png" alt="" width={200} height={125} />
    </div>
    <div className="smoke-wrap">
    <Image className={styles['smoke3']}  src="/smoke.png" alt="" width={700} height={800} />
    </div>
    <div className="smoke-wrap">
    <Image className={styles['smoke2']}  src="/smoke.png" alt="" width={700} height={700} />
    </div>
    <div className="smoke-wrap">
    <Image className={styles['smoke3']}  src="/smoke.png" alt="" width={700} height={700} />
    </div>
      </div>
      </div>
  
  
  );
}

