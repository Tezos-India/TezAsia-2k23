import React, { useEffect, useRef, useState } from 'react'
import { ClipboardIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Loader from './Loader'

import { useGame } from '@/contexts/GamesContext'
import { copyToClipboard } from '@/helpers'

function symbol(str, white) {
  if(typeof str !== 'string') return
  let key = {
    'K': '♚',
    'Q': '♛',
    'R': '♜',
    'B': '♝',
    'N': '♞'
  }
  // let key = white ? sw : sb
  let slicePoint = key[str[0]] ? 1 : 0
  return (
    <span>
      { key[str[0]] && <span style={{fontSize: '20px', color: white ? 'white' : 'black'}}>{key[str[0]]}</span> }
      { str.slice(slicePoint) }
    </span>
  )
}

export default function PGNViewer() {
  const [selectedMove, setSelectedMove] = useState()
  const [scroll, setScroll] = useState(true)
  const { game, moves, fen, setMove, gameOver } = useGame()
  const scrollRef = useRef()

  useEffect(() => {
    if(selectedMove == null) return
    setMove(selectedMove)
    if(scrollRef.current && scroll) {
      scrollRef.current.scrollIntoView()
    }
  }, [selectedMove])

  useEffect(() => {
    if(!moves) return
    move(moves.length - 1, true)
  }, [moves])

  function move(index, scroll) {
    if(moves == null || !gameOver) return
    setSelectedMove(Math.min(Math.max(0, index), moves.length - 1))
    setScroll(scroll)
  }

  return (
    <div className='sidebar-item' style={{padding: '1em'}}>
      { !game ? <Loader /> : 
        <>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1em'}}>
          <h3 style={{display: 'inline'}}>Moves</h3>
          {
            moves && moves.length > 0 &&
            <button onClick={() => copyToClipboard(game.pgn())}>copy pgn</button>
          }
        </div>
        
        <div className='game-pgn'>
          { moves && 
            moves.reduce((clumped, move, i) => {
              if(i % 2 === 1) {
                clumped[clumped.length - 1].push(move)
              }else {
                clumped.push([move])
              }
              return clumped
            }, []).map(((a, i) => {
              let rMove = Math.floor(selectedMove / 2)
              let white = selectedMove % 2 === 0
              
              return (
                <div className={`game-move ${rMove === i && 'outlined'}`} key={i} ref={rMove === i ? scrollRef : null}>
                  <span>{i + 1}.</span>
                  <span 
                    onClick={() => move(i * 2, false)}
                    className={rMove === i && white ? 'highlighted' : ''}>{symbol(a[0], true)}</span>
                  <span 
                    onClick={() => move(i * 2 + 1, false)}
                    className={rMove === i && !white ? 'highlighted' : ''}>{symbol(a[1])}</span>
                </div>
              )
            }))
          }
          <div ref={selectedMove == null ? scrollRef : null}></div>
        </div>
        {
          gameOver &&
          <div className='pgn-buttons'>
            <div onClick={() => move(0, true)}><ChevronDoubleLeftIcon /></div>
            <div onClick={() => move(selectedMove - 1, true)}><ChevronLeftIcon /></div>
            <div onClick={() => move(selectedMove + 1, true)}><ChevronRightIcon /></div>
            <div onClick={() => move(moves.length - 1, true)}><ChevronDoubleRightIcon /></div>
          </div>
        }
        </>
      }
    </div>
  )
}