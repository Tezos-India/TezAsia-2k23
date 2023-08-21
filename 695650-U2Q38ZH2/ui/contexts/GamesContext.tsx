import React, { useState, useEffect, useContext, useRef } from "react";
import { Socket } from "socket.io-client";
import Chess from "@/lib/chess";
import { useSocket } from "./SocketContext";
import { useUser } from "./UserContext";


type GameContextType = {
  game?: typeof Chess;
  createGame?: (data: any) => void;
  makeMove?: (move: any) => any;
  moves?: any[];
  players?: any[];
  orientation?: string;
  turn?: boolean;
  gameOver?: any;
  fen?: string;
  setMove?: (index: number) => void;
  lastMove?: any;
  publicGame?: boolean;
  makePublic?: () => void;
  initGame?: (gameData: any) => void;
  opponent?: any;
  timeLeft?: number[];
};

const GamesContext = React.createContext<GameContextType>({});

export function useGame() {
  return useContext(GamesContext);
}

interface GamesProviderProps {
  children: React.ReactNode;
}

export function GamesProvider({ children }: GamesProviderProps) {
  const socket = useSocket() as Socket;

  const [game, setGame] = useState<any | null>(null);



  const [moves, setMoves] = useState<string[]>([]);
  const [orientation, setOrientation] = useState<string>("");
  const [players, setPlayers] = useState<any[]>([]);
  const [turn, setTurn] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<any | null>(null); // Adjust the type here
  const [fen, setFen] = useState<string>("");
  const [fenArr, setFenArr] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<any | null>(null); // Adjust the type here
  const [publicGame, setPublicGame] = useState<boolean>(false);
  const [opponent, setOpponent] = useState<any | null>(null); // Adjust the type here
  const [timeLeft, setTimeLeft] = useState<number[]>([1000, 1000]);

  const moveSoundRef = useRef<HTMLAudioElement | null>(null);
  const captureSoundRef = useRef<HTMLAudioElement | null>(null);
  const playerJoinedRef = useRef<HTMLAudioElement | null>(null);

  const { id } = useUser();

  useEffect(() => {
    if (!socket) return;
    socket.on("game", initGame);
    socket.on("players", (_players) => {
      setPlayers(_players);
      playerJoinedRef.current!.currentTime = 0;
      playerJoinedRef.current!.play();
    });
    socket.on("gameover", (data) => {
      setGameOver(data);
      console.log("GAME OVER!!!!");
    });
    socket.on("time-left", (time, sentAt) => {
      let tick = Date.now() - sentAt;
      setTimeLeft(time.map((t:any) => t - tick));
    });
    return () => {
      socket.off("game");
      socket.off("players");
    };
  }, [socket]);

  useEffect(() => {
    console.log("time", timeLeft);
  }, [timeLeft]);

  function initGame(gameData: any) {
    const g: Chess = new Chess(gameData.initialFEN); // Explicitly annotate the type
    const fenHistory: string[] = [];
    let _lastMove: any | null = null; // Adjust the type here
    for (var i = 0; i < gameData.moves.length; i++) {
      _lastMove = g.move(gameData.moves[i]);
      fenHistory.push(g.fen());
    }
    setLastMove(_lastMove);
    setFenArr(fenHistory);
    setPublicGame(gameData.isPublic);
    let _orientation: string =
      gameData.players.findIndex((p: { id: string | null }) => p.id === id) === 0 ? "white" : "black";
    setOrientation(_orientation);
    setMoves(gameData.moves);
    setTurn(g.turn() === _orientation[0]);
    setPlayers(gameData.players);
    setFen(g.fen());
    setGame(g);
    setGameOver(gameData.gameOver);
    setTimeLeft(gameData.time);
  }

  useEffect(() => {
    if (!socket) return;
    socket.on("move", makeMove);
    return () => {
      socket.off("move");
    };
  }, [socket, game, moves]);

  useEffect(() => {
    if (!game || !orientation) return;
    setTurn(game.turn() === orientation[0]);
  }, [game, orientation]);

  function getGameOver(game: Chess) {
    if (!game.game_over()) return;
    let obj: any = {};
    if (game.in_checkmate()) {
      obj.reason = "checkmate";
      obj.winner = game.turn() === "w" ? 1 : 0;
      obj.result = obj.winner === "white" ? "1-0" : "0-1";
    } else {
      if (game.in_threefold_repetition()) {
        obj.reason = "threefold repetition";
      } else if (game.insufficient_material()) {
        obj.reason = "insufficient material";
      }
      obj.result = "½-½";
    }
    return obj;
  }
  

  useEffect(() => {
    if (!game) return;
    if (game.game_over()) {
      setGameOver(getGameOver(game));
    }
  }, [game]);

  function createGame(data: any) {
    socket.emit("create", data);
  }

  function makePublic() {
    setPublicGame(true);
  }

  const setMove = (index: number) => {
    if (index < 0 || index >= fenArr.length) return;
    setLastMove(null);
    setFen(fenArr[index]);
  }

  function makeMove(move: any) {
    if (!game) return;
    if (game.game_over()) return;
    const saveGame = { ...game };
    let testMove = saveGame.move(move);
    if (testMove) {
      setMoves((prev) => [...prev, testMove.san]);
      setGame(saveGame);
      setFenArr((prev) => [...prev, saveGame.fen()]);
      setFen(saveGame.fen());
      setLastMove(testMove);
      if (/x/.test(testMove.san)) {
        captureSoundRef.current!.currentTime = 0;
        captureSoundRef.current!.play();
      } else {
        moveSoundRef.current!.currentTime = 0;
        moveSoundRef.current!.play();
      }
      if (saveGame.game_over()) {
        socket.emit("gameover", getGameOver(saveGame));
      }
    }
    return testMove;
  }

  function safeGameMutate(modify: (update: typeof Chess) => void) {
    setGame((g:any) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function rematch() {
    let g = new Chess();
    setGame(null);
    setOrientation(orientation === "white" ? "black" : "white");
    setMoves([]);
    setLastMove(g.fen());
    setGameOver(null);
    setFen(g.fen());
  }

  const value: GameContextType = {
    game,
    createGame,
    makeMove,
    moves,
    players,
    orientation,
    turn,
    gameOver,
    fen,
    setMove,
    lastMove,
    publicGame,
    makePublic,
    initGame,
    opponent,
    timeLeft,
  };

  return (
    <GamesContext.Provider value={value}>
      <audio src="/move.mp3" ref={moveSoundRef}></audio>
      <audio src="/alert.mp3" ref={playerJoinedRef}></audio>
      <audio src="/capture.mp3" ref={captureSoundRef}></audio>
      {children}
    </GamesContext.Provider>
  );
}
