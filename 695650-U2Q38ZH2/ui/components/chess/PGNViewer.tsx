import React, { useEffect, useRef, useState } from "react";
import {
  ClipboardIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import Loader from "./Loader";

import { useGame } from "@/contexts/GamesContext";
import { copyToClipboard } from "@/helpers";

function symbol(str, white = true) {
  if (typeof str !== "string") return null;

  const key = {
    K: "♚",
    Q: "♛",
    R: "♜",
    B: "♝",
    N: "♞",
  };
  const pieceSymbol = key[str[0]];
  return (
    <span>
      {pieceSymbol && (
        <span style={{ fontSize: "20px", color: white ? "white" : "black" }}>
          {pieceSymbol}
        </span>
      )}
      {pieceSymbol ? str.slice(1) : str}
    </span>
  );
}

export default function PGNViewer() {
  const [selectedMove, setSelectedMove] = useState();
  const [scroll, setScroll] = useState(true);
  const { game, moves, fen, setMove, gameOver } = useGame();
  const scrollRef = useRef();

  useEffect(() => {
    if (selectedMove === null || !setMove) return;
    setMove(selectedMove);
    if (scrollRef.current && scroll) {
      scrollRef.current.scrollIntoView();
    }
  }, [selectedMove, setMove, scroll]);

  useEffect(() => {
    if (!moves || moves.length === 0) return;
    move(moves.length - 1, true);
  }, [moves]);

  function move(index, scroll) {
    if (!moves || !gameOver) return;
    setSelectedMove(Math.min(Math.max(0, index), moves.length - 1));
    setScroll(scroll);
  }

  const clumpedMoves = moves?.reduce((acc, move, i) => {
    if (i % 2 === 1) {
      acc[acc.length - 1].push(move);
    } else {
      acc.push([move]);
    }
    return acc;
  }, []);

  return (
    <div className="sidebar-item" style={{ padding: "1em" }}>
      {!game ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1em",
            }}
          >
            <h3 style={{ display: "inline" }}>Moves</h3>
            {moves && moves.length > 0 && (
              <button
                onClick={() => copyToClipboard(game.pgn())}
                aria-label="Copy PGN"
              >
                Copy PGN
              </button>
            )}
          </div>

          <div className="game-pgn">
            {clumpedMoves &&
              clumpedMoves.map((pair, i) => {
                const rMove = Math.floor(selectedMove / 2);
                const white = selectedMove % 2 === 0;
                return (
                  <div
                    className={`game-move ${rMove === i ? "outlined" : ""}`}
                    key={i}
                    ref={rMove === i ? scrollRef : null}
                  >
                    <span>{i + 1}.</span>
                    <span
                      onClick={() => move(i * 2, false)}
                      className={rMove === i && white ? "highlighted" : ""}
                    >
                      {symbol(pair[0], true)}
                    </span>
                    <span
                      onClick={() => move(i * 2 + 1, false)}
                      className={rMove === i && !white ? "highlighted" : ""}
                    >
                      {symbol(pair[1], false)}
                    </span>
                  </div>
                );
              })}
            <div ref={selectedMove === null ? scrollRef : null}></div>
          </div>

          {gameOver && (
            <div className="pgn-buttons">
              <div onClick={() => move(0, true)} aria-label="Move to start">
                <ChevronDoubleLeftIcon />
              </div>
              <div
                onClick={() => move(selectedMove - 1, true)}
                aria-label="Move back"
              >
                <ChevronLeftIcon />
              </div>
              <div
                onClick={() => move(selectedMove + 1, true)}
                aria-label="Move forward"
              >
                <ChevronRightIcon />
              </div>
              <div
                onClick={() => move(moves.length - 1, true)}
                aria-label="Move to end"
              >
                <ChevronDoubleRightIcon />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
