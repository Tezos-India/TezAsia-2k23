import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useGame } from "@/contexts/GamesContext";

export default function TapMessages({ gameId }) {
  const socket = useSocket();
  let alertRef = useRef();
  const { opponent } = useGame();
  let messagesArr = [
    "Hello",
    "Still there?",
    "I'm thinking...",
    "Good Move",
    "Thanks",
    "Yes",
    "Oops",
    "Good Game",
    "Noooo",
    "I resign",
    "Gotta go",
    "lol",
    "heyyy",
    "there's a glitch",
  ];
  let [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (message) => {
      setAlerts((prev) => [...prev, message]);
      alertRef.current.currentTime = 0;
      alertRef.current.play();
      let timeout = setTimeout(() => {
        setAlerts((prev) => prev.slice(1));
        clearTimeout(timeout);
      }, 10000);
    });
    return () => socket.off("message");
  }, [socket]);

  function sendMessage(message) {
    socket.emit("message", message, gameId);
    setAlerts((prev) => [...prev, "Sent!"]);
  }

  return (
    <div style={{ padding: "1em" }}>
      <audio src="/new-alert.mp3" ref={alertRef} />
      {alerts.map((alert, index) => {
        return (
          <div key={index} className="message-alert">
            {alert}
          </div>
        );
      })}
      <div className="tap-messages">
        {messagesArr.map((message, index) => {
          return (
            <div
              key={index}
              className="tap-message"
              onClick={() => sendMessage(message)}
            >
              {message}
            </div>
          );
        })}
      </div>
    </div>
  );
}
