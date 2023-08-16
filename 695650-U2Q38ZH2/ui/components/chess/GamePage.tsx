import { useState, useEffect } from "react";

import Game from "./Game";
import Sidebar from "./Sidebar";

import { useRouter } from "next/router";
import { useSocket } from "@/contexts/SocketContext";
import { useGame } from "@/contexts/GamesContext";
import { useUser } from "@/contexts/UserContext";
import Modal from "./Modal";
import { Socket } from "socket.io-client";

type PopupType = {
  message?: string;
  extra?: string;
  element?: JSX.Element;
};

export default function GamePage() {
  const socket = useSocket() as Socket;
  const [popup, setPopup] = useState<PopupType | null>(null);
  const router = useRouter();
  const gameId = router.query.gameId as string | undefined;

  const { gameOver, orientation } = useGame();
  const { username } = useUser();
  const [isRematch, setIsRematch] = useState<number>(0);

  useEffect(() => {
    if (!orientation || !gameOver) return;
    let message =
      gameOver?.winner !== null
        ? (gameOver.winner === 0 && orientation === "white") ||
          (gameOver.winner === 1 && orientation === "black")
          ? "You Win!"
          : (gameOver.winner === 0 ? "white" : "black") + " wins"
        : "Draw";
    setPopup({
      message,
      extra: "by " + gameOver?.reason,
      element: (
        <button onClick={() => gameId && socket.emit("rematch", gameId)}>
          Rematch
        </button>
      ),
    });
    setIsRematch(0);
  }, [gameOver, orientation, gameId, socket]);

  useEffect(() => {
    if (!socket) return;
    const onLeave = () => router.push("/");
    const onPlayerLeft = () => {
      setPopup({
        message: "Your oppenent left.",
        extra: "they may return...",
      });
    };
    const onRematch = () => setIsRematch(1);

    socket.on("leave", onLeave);
    socket.on("player left", onPlayerLeft);
    socket.on("rematch", onRematch);

    return () => {
      socket.off("leave", onLeave);
      socket.off("player left", onPlayerLeft);
      socket.off("rematch", onRematch);
      socket.emit("leave");
    };
  }, [socket, router]);

  return (
    <div className="game-container">
      <div className="board-container">
        {gameId && <Game gameId={gameId} />}
      </div>
      <Sidebar gameId={gameId} />
      {popup && (
        <Modal onClose={() => setPopup(null)}>
          <Modal.Header>{popup.message}</Modal.Header>
          <Modal.Body>
            <div style={{ marginBottom: "1em" }}>{popup.extra}</div>
            {popup.element}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
