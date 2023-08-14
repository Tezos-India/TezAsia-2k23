import React from 'react'

 import Messages from './Messages'
import PGNViewer from './PGNViewer'
import TapMessages from './TapMessages'
import { useGame } from '@/contexts/GamesContext'
import { allowLiveChat } from '@/vars'


export default function Sidebar({ gameId }) {
  const { game, gameOver, publicGame } = useGame()
  return (
    <React.Fragment>
      <div className='sidebar-header'>
        <h3 
          style={{textAlign: 'center'}}>
          {gameOver ? 'Game Over ' + gameOver.result : game && game.turn() === 'w' ? "White to move" : "Black to move"}
        </h3>
      </div>
      <div className='game-sidebar'>
        <PGNViewer />
        {
          publicGame && !allowLiveChat ? <TapMessages gameId={gameId} /> : <Messages gameId={gameId} />
        }
      </div>
    </React.Fragment>
  )
}