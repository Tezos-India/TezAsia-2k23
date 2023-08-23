import React, { useState, useEffect } from "react";
import Game from "./Game";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useSocket } from "@/contexts/SocketContext";
import { useGame } from "@/contexts/GamesContext";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import Modal from "./Modal";
import styles from "./Game.module.css";
export default function GamePage() {
  type Popup = {
    message: string;
    extra: string;
    element: JSX.Element;
  };

  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const socket = useSocket();
  const [popup, setPopup] = useState<Popup | null>(null);
  const router = useRouter();
  const { gameId } = router.query;

  const { gameOver, orientation } = useGame();
  const [isRematch, setIsRematch] = useState(0);
  const [hasUpdatedStats, setHasUpdatedStats] = useState(false);

  const updateUserStats = async (result: any) => {
    try {
      const userIdString = localStorage.getItem("userid");
      if (!userIdString) {
        throw new Error("UserId not found in localStorage");
      }

      // Convert userId from string to number
      const userId = parseInt(userIdString);

      const response = await fetch("http://localhost:5000/gameStats/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId, // use the numeric userId
          result: result,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user stats");
      }

      const data = await response.json();
      console.log("Game stats updated:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!orientation) return;

    if (gameOver != null) {
      let message, result;

      if (gameOver.winner != null) {
        if (
          (gameOver.winner === 0 && orientation === "white") ||
          (gameOver.winner === 1 && orientation === "black")
        ) {
          message = "You Win!";
          result = "win";
        } else {
          message = (gameOver.winner === 0 ? "white" : "black") + " wins";
          result = "loss";
        }
      } else {
        message = "Draw";
        result = "draw";
      }
      setShowConfetti(true)
      setPopup({
        message,
        extra: "by " + gameOver.reason,
        element: (
       <></>
        ),
      });
      setIsRematch(0);

      const userId = localStorage.getItem("userid");
      console.log(`DEBUG: ${message}, user id is${userId}`);

      if (userId && !hasUpdatedStats) {
        setHasUpdatedStats(true);
        updateUserStats(result);
      }
    } else {
      setPopup(null);
    }
  }, [gameOver, orientation]);

  useEffect(() => {
    if (!socket) return;

    const leaveHandler = () => {
      router.push("/");
    };

    const gotogame = () => {
      router.push("/Game");
    };

    const playerLeftHandler = () => {
      
      setPopup({
        message: "Your opponent left.",
        extra: "",
        element: <>
        <button onClick={gotogame} >Game Page</button>
        </>, // Replace with the appropriate JSX element
      });
    };

    const rematchHandler = () => {
      setIsRematch(1);
    };

    socket.on("leave", leaveHandler);
    socket.on("player left", playerLeftHandler);
    socket.on("rematch", rematchHandler);

    return () => {
      socket.off("leave", leaveHandler);
      socket.off("player left", playerLeftHandler);
      socket.off("rematch", rematchHandler);
    };
  }, [socket]);

  return (
    <div className={styles["smokeDarkTheme"]}>
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="game-container">
        <div className="board-container">
          {gameId && <Game gameId={gameId as string} />}
        </div>
        <Sidebar
          gameId={gameId ? (Array.isArray(gameId) ? gameId[0] : gameId) : ""}
        />

        {popup && socket && (
          <>
          <Modal onClose={() => setPopup(null)}>
            <Modal.Header>{popup.message}</Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: "1em" }}>{popup.extra}</div>
              {popup.element}
            </Modal.Body>
          </Modal>
          </>
        )}
      </div>
    </div>
  );
}
