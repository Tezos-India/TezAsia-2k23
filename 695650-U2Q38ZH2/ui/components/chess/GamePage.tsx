import React, { useState, useEffect } from "react";
import Game from "./Game";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useSocket } from "@/contexts/SocketContext";
import { useGame } from "@/contexts/GamesContext";
import { useAccount } from "@/contexts/AccountContext";

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

  // Get id from AccountContext
  const { avatarId } = useAccount();
  const userId = avatarId;

  console.log(`DEBUG: AvatarId from context: ${userId}`);

  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [popup, setPopup] = useState<Popup | null>(null);

  const socket = useSocket();
  const router = useRouter();
  const { gameId } = router.query;
  const { gameOver, orientation, players } = useGame() || {};
  const [hasUpdatedStats, setHasUpdatedStats] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const updateUserStats = async (result: any) => {
    console.log("Attempting to update user stats");

    if (!userId) {
      console.error("UserId not found in AccountContext");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/gameStats/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          result,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user stats");
      }

      const data = await response.json();
      console.log("Game stats updated:", data);
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  };

  useEffect(() => {
    if (!orientation || !gameOver) return;

    let message, result;
    const winnerName = gameOver.winner === 0 ? "white" : "black";

    if (gameOver.winner != null) {
      message = orientation === winnerName ? "You Win!" : `${winnerName} wins`;
      result = orientation === winnerName ? "win" : "loss";
    } else {
      message = "Draw";
      result = "draw";
    }

    setShowConfetti(true);
    setPopup({
      message,
      extra: `Congratulations, ${winnerName}! Wins by ${gameOver.reason}. ${winnerName}'s wallet is now credited with 9ꜩ`,
      element: (
        <button
          onClick={() => router.push("/Game")}
          className={styles["copy-button"]}
        >
          Game Page
        </button>
      ),
    });

    console.log(
      `DEBUG: ${message}, user id is ${userId}, has updated stats= ${hasUpdatedStats}`
    );

    if (userId && !hasUpdatedStats) {
      setHasUpdatedStats(true);
      updateUserStats(result);
    }
  }, [gameOver, orientation]);

  useEffect(() => {
    if (!socket) return;

    const handlers = {
      leave: () => router.push("/"),
      "player left": () => {
        setPopup({
          message: "Your opponent left.",
          extra: "9ꜩ have been added to your wallet",
          element: (
            <button
              onClick={() => router.push("/Game")}
              className={styles["copy-button"]}
            >
              Game Page
            </button>
          ),
        });
      },
      rematch: () => setHasUpdatedStats(false),
    };

    for (const [event, handler] of Object.entries(handlers)) {
      socket.on(event, handler);
    }

    return () => {
      for (const [event, handler] of Object.entries(handlers)) {
        socket.off(event, handler);
      }
    };
  }, [socket]);

  return (
    <div className={styles["smokeDarkTheme"]}>
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="game-container">
        <div className="board-container">
          {gameId && <Game gameId={gameId as string} />}
        </div>
        {players && players.length === 2 && (
          <Sidebar gameId={Array.isArray(gameId) ? gameId[0] : gameId || ""} />
        )}
        {popup && socket && (
          <Modal onClose={() => setPopup(null)}>
            <Modal.Header>{popup.message}</Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: "1em" }}>{popup.extra}</div>
              {popup.element}
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
}
