
import { useRef, useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import Loader from './Loader'
import Timer from './Timer'
import { useSocket } from '@/contexts/SocketContext';
import { copyToClipboard } from '@/helpers';
import { useUser } from '@/contexts/UserContext';
import { useGame } from '@/contexts/GamesContext';
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  margin: '0',
  padding: '0',
} 
export default function Game({ gameId }) {
  const chessboardRef = useRef();
  const { game, fen, makeMove, orientation, players, turn, gameOver, lastMove, publicGame, timeLeft } = useGame()
  const [moveFrom, setMoveFrom] = useState('');
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [lastMoveSquares, setLastMoveSquares] = useState({})
  const [inCheck, setInCheck] = useState({})
  const socket = useSocket()
  const { id, username } = useUser()
  const [chessboardSize, setChessboardSize] = useState()
  
  const get_piece_positions = (piece) => { 
    return [].concat(...game.board()).map((p, index) => {
      if (p !== null && p.type === piece.type && p.color === piece.color) {
        return index
      }
    }).filter(Number.isInteger).map((piece_index) => {
      const row = 'abcdefgh'[piece_index % 8]
      const column = Math.ceil((64 - piece_index) / 8)
      return row + column
    })
  }
  
  useEffect(() => {
    function handleResize() {
      const display = document.getElementsByClassName('board-container')[0];
      let w = display.offsetWidth
      let h = window.innerHeight
      let s = Math.min(w, h, 800)
      setChessboardSize(s - s / 5);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if(!socket) return
    socket.emit('join game', gameId, username ? username : 'Guest')
  }, [socket])

  useEffect(() => {
    if(lastMove == null) return setLastMoveSquares({})
    let squares = {}
    let color = '#ff09'
    squares[lastMove.from] = { background: color }
    squares[lastMove.to] = { background: color }
    setLastMoveSquares(squares)
  }, [lastMove])

  useEffect(() => {
    if(!game) return
    if(game.in_check()) {
      let pieces = get_piece_positions({ color: game.turn(), type: 'k' })
      setInCheck(pieces.reduce((obj, square) => {
        obj[square] = {
          background: 'radial-gradient(#f00, #f000)'
        }
        return obj
      }, {}))
    }else {
      setInCheck({})
    }
  }, [game])

  function getMoveOptions(square) {
    if(!turn || gameOver) return
    
    const moves = game.moves({
      square,
      verbose: true
    });
    if (moves.length === 0) {
      return;
    }

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      };
      return move;
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    };
    setOptionSquares(newSquares);
  }

  function onSquareClick(square) {
    setRightClickedSquares({});

    function resetFirstMove(square) {
      setMoveFrom(square);
      getMoveOptions(square);
    }

    // from square
    if (!moveFrom || game.turn() !== orientation[0]) {
      resetFirstMove(square);
      return;
    }

    const move = makeMove({
      from: moveFrom,
      to: square,
      promotion: 'q'
    })
    
    if (!move) {
      resetFirstMove(square);
      return;
    }

    socket.emit('move', move.san, Date.now())

    setMoveFrom('');
    setOptionSquares({});
  }

  function onSquareRightClick(square) {
    const colour = 'rgba(0, 0, 255, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    });
  }
  return (!game || !orientation) ? <Loader color="#fff" size="70px"/> : (
    players.length === 2 ? 
    <>
      <div className='player-name'>
        <span>{ players.find(p => p.id !== id).username }</span>
        { <Timer running={!gameOver && orientation && game.turn() !== orientation[0]} time={orientation === 'white' ? timeLeft[1] : timeLeft[0]} /> }
      </div>
      <div className='board'>
        <Chessboard
          id="ClickToMove"
          animationDuration={200}
          arePiecesDraggable={false}
          position={fen}
          boardWidth={chessboardSize}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          boardOrientation={orientation}
          customBoardStyle={{
            borderRadius: '4px'
          }}
          customSquareStyles={{
            ...lastMoveSquares,
            ...optionSquares,
            ...inCheck
          }}
          ref={chessboardRef}
        />
      </div>
      <div className='player-name'>
        <span>{ username || 'Guest' }</span>
        { <Timer running={!gameOver && orientation && game.turn() === orientation[0]} time={orientation === 'white' ? timeLeft[0] : timeLeft[1]} /> }
      </div>
    </> :
    <div>
      <h1 style={{marginBottom: '1em'}}>To invite a friend to the game, send the friend this URL</h1> 
      <h1 style={{marginBottom: '1em'}}>Waiting for opponent...</h1>
      { publicGame ? 
        <span style={{fontSize: '16px', fontFamily: 'monospace', color: '#aaa'}}>
          the next person that joins will play against you
        </span> :
        <button onClick={() => copyToClipboard(window.location.href)}>Copy URL to clipboard</button>
      }
    </div>
  )
}