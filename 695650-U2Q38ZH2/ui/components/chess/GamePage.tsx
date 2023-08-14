import  { useState, useEffect } from 'react'

import Game from './Game'
import Sidebar from './Sidebar'

import { useRouter } from 'next/router';
import { useSocket } from '@/contexts/SocketContext';
import { useGame } from '@/contexts/GamesContext';
import { useUser } from '@/contexts/UserContext';
import Modal from './Modal';

export default function GamePage() {
  const socket = useSocket()
  const [popup, setPopup] = useState()
  const router = useRouter();
  const { gameId } = router.query;

  const { gameOver, orientation, initGame, players } = useGame()
  const { username } = useUser()
  const [isRematch, setIsRematch] = useState(0)

  useEffect(() => {
    if(!orientation) return
    if(gameOver != null) {
      let message = gameOver.winner != null ? ((gameOver.winner === 0 && orientation === 'white' || gameOver.winner === 1 && orientation === 'black') ? 'You Win!' : (gameOver.winner === 0 ? 'white' : 'black') + ' wins') : 'Draw'
      setPopup({
        message,
        extra: 'by ' + gameOver.reason,
        element: <button onClick={() => socket.emit('rematch', gameId)}>Rematch</button>
      })
      setIsRematch(0)
    }else {
      setPopup(null)
    }
  }, [gameOver, orientation])

  useEffect(() => {
    if(!socket) return
    return () => socket.emit('leave')
  }, [socket])

  useEffect(() => {
    if(!socket) return
    socket.on('leave', () => {
      router.push('/');
    })
    socket.on('player left', () => {
      setPopup({
        message: "Your oppenent left.",
        extra: "they may return..."
      })
    })
    socket.on('rematch', () => {
      setIsRematch(1)
    })
  }, [socket])


  return (
    <div className='game-container'>
    <div className='board-container'>
      {/* Pass 'gameId' to the Game component */}
      {gameId && <Game gameId={gameId} />}
    </div>
    <Sidebar gameId={gameId} />
    {popup && (
      <Modal onClose={() => setPopup(null)}>
        <Modal.Header>{popup.message}</Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: '1em' }}>{popup.extra}</div>
          {popup.element}
        </Modal.Body>
      </Modal>
    )}
  </div>
  )
}