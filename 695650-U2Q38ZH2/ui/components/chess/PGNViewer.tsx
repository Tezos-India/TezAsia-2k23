// @ts-ignore
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

interface PGNViewerProps {}

function symbol(str: string, white?: boolean) {
  if (typeof str !== "string") return null;
  const key: Record<string, string> = {
    K: "♚",
    Q: "♛",
    R: "♜",
    B: "♝",
    N: "♞",
  };

  const slicePoint = key[str[0]] ? 1 : 0;

  return (
    <span>
      {key[str[0]] && (
        <span style={{ fontSize: "20px", color: white ? "white" : "black" }}>
          {key[str[0]]}
        </span>
      )}
      {str.slice(slicePoint)}
    </span>
  );
}

export default function PGNViewer(props: PGNViewerProps) {
  const [selectedMove, setSelectedMove] = useState<number | undefined>(undefined);
  const [scroll, setScroll] = useState<boolean>(true);
  const { game, moves, setMove, gameOver } = useGame();
  const scrollRef = useRef<HTMLDivElement>(null);
  
 useEffect(() => {
  if (selectedMove == null) return;
  (setMove as (index: number) => void)(selectedMove);
  if (scrollRef.current && scroll) {
    scrollRef.current.scrollIntoView();
  }
}, [selectedMove]);

  useEffect(() => {
    if (!moves) return;
    move(moves.length - 1, true);
  }, [moves]);

  function move(index: number, scroll: boolean) {
    if (moves == null || !gameOver) return;
    setSelectedMove(Math.min(Math.max(0, index), moves.length - 1));
    setScroll(scroll);
  }

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
              <button onClick={() => copyToClipboard(game.pgn())}>
                copy pgn
              </button>
            )}
          </div>

          <div className="game-pgn">
            {moves &&
              moves
                .reduce<string[][]>((clumped, move, i) => {
                  if (i % 2 === 1) {
                    clumped[clumped.length - 1].push(move);
                  } else {
                    clumped.push([move]);
                  }
                  return clumped;
                }, [])
                .map((a, i) => {
                  const rMove = Math.floor((selectedMove || 0) / 2);
                  const white = (selectedMove || 0) % 2 === 0;

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
                        {symbol(a[0], true)}
                      </span>
                      <span
                        onClick={() => move(i * 2 + 1, false)}
                        className={rMove === i && !white ? "highlighted" : ""}
                      >
                        {symbol(a[1])}
                      </span>
                    </div>
                  );
                })}
            <div ref={selectedMove == null ? scrollRef : null}></div>
          </div>
          {gameOver && (
            <div className="pgn-buttons">
              <div onClick={() => move(0, true)}>
                <ChevronDoubleLeftIcon />
              </div>
              <div onClick={() => move((selectedMove || 0) - 1, true)}>
                <ChevronLeftIcon />
              </div>
              <div onClick={() => move((selectedMove || 0) + 1, true)}>
                <ChevronRightIcon />
              </div>
              <div onClick={() => move((moves || []).length - 1, true)}>
                <ChevronDoubleRightIcon />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
