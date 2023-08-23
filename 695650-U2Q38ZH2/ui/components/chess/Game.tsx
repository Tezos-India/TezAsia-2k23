import React, {  useState, useEffect } from 'react';
import { useRef } from 'react'
import PropTypes from 'prop-types';
import { Chessboard } from 'react-chessboard';
import Loader from './Loader';
import Timer from './Timer';
import styles from './Game.module.css';
import { useSocket } from '@/contexts/SocketContext';
import { copyToClipboard } from '@/helpers';
import { useUser } from '@/contexts/UserContext';
import { useGame } from '@/contexts/GamesContext';
import { BoardOrientation } from 'react-chessboard/dist/chessboard/types';
interface GameProps {
  gameId: string;
}

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  margin: '0',
  padding: '0',
};

export default function Game({ gameId }: GameProps) {
  const chessboardRef = useRef<any>();


  const { game, fen, makeMove, orientation, players, turn, gameOver, lastMove, publicGame, timeLeft } = useGame() || {};

  const [moveFrom, setMoveFrom] = useState('');
  const [rightClickedSquares, setRightClickedSquares] = useState<Record<string, React.CSSProperties | undefined>>({});
  const [optionSquares, setOptionSquares] = useState({});
  const [lastMoveSquares, setLastMoveSquares] = useState({});
  const [inCheck, setInCheck] = useState({});
  const socket = useSocket();
  const { id, username } = useUser();
  const [chessboardSize, setChessboardSize] = useState<number | undefined>();
  
  const get_piece_positions = (piece: { color: string; type: string }) => {
    if (!game) {
      // Handle the case when game is undefined
      return [];
    }
  
    return [].concat(...game.board()).map((p: { type: string; color: string }, index) => {
      if (p !== null && p.type === piece.type && p.color === piece.color) {
        return index;
      }
      return -1;
    }).filter((index) => index !== -1).map((piece_index) => {
      const row = 'abcdefgh'[piece_index % 8];
      const column = Math.ceil((64 - piece_index) / 8);
      return row + column;
    });
  };

  
  
useEffect(() => {
  function handleResize() {
    const display = document.getElementsByClassName('board-container')[0] as HTMLElement;
    let w = display.offsetWidth;
    let h = window.innerHeight;
    let s = Math.min(w, h, 800);
    setChessboardSize(s - s / 5);
  }

  window.addEventListener('resize', handleResize);
  handleResize();
  return () => window.removeEventListener('resize', handleResize);
}, []);

  
  useEffect(() => {
    if (!socket) return;
    socket.emit('join game', gameId, username ? username : 'Guest');
  }, [socket]);

  useEffect(() => {
    if (!lastMove) return setLastMoveSquares({});
    let squares: Record<string, React.CSSProperties> = {}; // Explicitly define the type
    let color = '#ff09';
    squares[lastMove.from] = { background: color };
    squares[lastMove.to] = { background: color };
    setLastMoveSquares(squares);
}, [lastMove]);


  useEffect(() => {
    if (!game) return;
  if (game?.in_check()) {
      let pieces = get_piece_positions({ color: game.turn(), type: 'k' });
      setInCheck(
        pieces.reduce((obj: Record<string, React.CSSProperties>, square) => {
          obj[square] = {
            background: 'radial-gradient(#f00, #f000)',
          };
          return obj;
        }, {})
      );
    } else {
      setInCheck({});
    }
  }, [game]);

  function getMoveOptions(square: string) {
    if (!turn || gameOver) return;

    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      return;
    }

    const newSquares: Record<string, React.CSSProperties> = {};
    moves.map((move: { to: string }) => {
      const targetSquare = game.get(move.to);
  
      newSquares[move.to] = {
          background:
              targetSquare && targetSquare.color !== game.get(square)?.color
                  ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
                  : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
          borderRadius: '50%'
      };
      return move;
  });
  
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };
    setOptionSquares(newSquares);
  }

 function onSquareClick(square: string) {
  setRightClickedSquares({});

  function resetFirstMove(square: string) {
    setMoveFrom(square);
    getMoveOptions(square);
  }

  if (!moveFrom || !makeMove || game.turn() !== orientation![0]) {
    resetFirstMove(square);
    return;
  }

  const move = makeMove({
    from: moveFrom,
    to: square,
    promotion: 'q',
  });

  if (!move) {
    resetFirstMove(square);
    return;
  }

  if (socket && move.san) { // Check if socket is defined
    socket.emit('move', move.san, Date.now());
  }

  setMoveFrom('');
  setOptionSquares({});
}
  

  function onSquareRightClick(square: string) {
    const colour = 'rgba(0, 0, 255, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] && rightClickedSquares[square]?.backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
  }
  return (
    
    !game || !orientation) ? <Loader color="#fff" size="70px" /> : (
    players && players.length === 2 ? (
      <>
        <div className='player-name' >
          <span>{ players.find(p => p.id !== id)?.username }</span>
          {<Timer
  running={!!(!gameOver && orientation && game?.turn() !== orientation[0])}
  time={orientation === 'white' ? timeLeft?.[1] || 0 : timeLeft?.[0] || 0}
/> }
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
            boardOrientation={orientation as BoardOrientation}
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
        <div className='player-name' style={{color:"white"}} >
          <span>{ username || 'Guest' }</span>
          {<Timer
  running={!!(!gameOver && orientation && game?.turn() !== orientation[0])}
  time={orientation === 'white' ? timeLeft?.[1] || 0 : timeLeft?.[0] || 0}
/>}
        </div>
      </> ):
      <>
  <div className={styles.body}>
      <a href="#" className={styles['animated-button']}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div>
          <div className={styles['waiting-content']}>

            <div>
            
            {publicGame ? (
              <>
             
             <h1> The next person that joins will play against you</h1>
              
               <h1>Waiting for opponent...</h1>
              
               </>
            ) : (
              <>
              <h1>Invite a Friend to the Game</h1>
              <h1>Your Game Id {gameId}</h1>
              <h1>Waiting for opponent...</h1>
              <button onClick={() => copyToClipboard(gameId)}>
                  Copy GameID to Clipboard
                </button>
                </>
            )}
            </div>
          </div>
        </div>
      </a>
    </div>
   
    </>
  );
  
}

Game.propTypes = {
  gameId: PropTypes.string.isRequired,
};