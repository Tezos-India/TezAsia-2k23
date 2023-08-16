import React, { useState, useEffect, useContext, ReactNode } from "react";
import { Socket, io } from "socket.io-client";
import { useUser } from "./UserContext";

interface SocketContextProps {
  children: ReactNode;
}

const SocketContext = React.createContext<Socket | undefined>(undefined);

export function useSocket(): Socket | undefined {
  return useContext(SocketContext);
}

export function SocketProvider({ children }: SocketContextProps): JSX.Element {
  const { username, id } = useUser();
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    if (!id) return;
    const newSocket = io("http://localhost:5000", {
      query: { id },
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
      return undefined;
    };
  }, [id]);

  useEffect(() => {
    if (!socket || !username) return;
    socket.emit("username", username);
  }, [socket, username]);

  useEffect(() => {
    if (!socket) return;

    socket.on("disconnect", () => {
      console.error("socket disconnected");
      alert("You have been disconnected from the server. Refresh the page.");
    });
    socket.on("connect_error", (err: Error) => {
      console.log("Connection error due to " + err.message);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
