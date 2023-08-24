import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import Loader from "./Loader";
import { inDevelopment } from "@/vars";
import styles from "./Menu.module.css";
import Image from "next/image";
import { addplayer1, addplayer2 } from "@/dapp/tezos";
import SmokeBackground from "./Particles";
import { useGame } from "@/contexts/GamesContext";
export default function Menu() {
  const router = useRouter();
  const [myGames, setMyGames] = useState<any[]>([]); // Specify the type for myGames
  const [loading, setLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean | undefined>(); // Specify the type for isPrivate
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // Specify the type for onlineUsers
  const [joiningGame, setJoiningGame] = useState(false);
  const [gameId, setGameId] = useState("");

  const { makest , makerg , makejg } = useGame() || {};

  const handleGameIdChange = (event) => {
    setGameId(event.target.value);
  };

  const handleJoinGameClick = () => {
    console.log("join");
    setJoiningGame(true);
  };

  const handleJoinWithGameId = async () => {
    makejg();
    setLoading(true)
    console.log("Joining game with ID:", gameId);
    await addplayer2(gameId).then((ans) => {
      if (ans) {
        router.push("/chess/" + gameId);
        setLoading(false)
      }
    });
  };

  const socket = useSocket();
  const { username, id } = useUser();
  let showOnline = true;

  useEffect(() => {
    if (!socket) return;
    socket.emit("username", username);
  }, [username, socket]);

  useEffect(() => {
    if (!socket) return;
    async function gotogame(gameId: string) {
      await addplayer1(gameId).then((ans) => {
        if (ans) {
          router.push("/chess/" + gameId);
        }
      });
    }

    async function gotoram(gameId: string) {
      await addplayer2(gameId).then((ans) => {
        if (ans) {
          router.push("/chess/" + gameId);
        }
      });
    }


    socket.on("game id", gotogame);
    socket.on("ramdom id", gotoram);
    socket.emit("get-users");
    socket.on("get-users", (_users) => {
      setOnlineUsers(_users);
    });
    
    return () => {
      socket.off("game id", gotogame);
      socket.off("get-users");
    };
  }, [socket]);

  const handlePrivateGameClick = () => {
    makest()
    setLoading(true);
    socket?.emit("create");
    
  };
  const gotolib = () =>{
    router.push("/Library");
  }

  return (
    <>
    
    <div>
 
    <div
      className={styles["img"]}
    >
                 <div className={styles["slow-moving-text"]}>
                 A chess game on the Tezos blockchain where you can stake 5 ꜩ to start either a private game or a public chess match at random. Win and receive 9 ꜩ, but if you leave early, the other player gets the prize. Blockchain incentives and strategic gameplay in one fascinating package.
    </div>
          <div className={styles["parti"]} >
      <SmokeBackground   />
      </div>
     
      <div className={styles["menu-container"]}>
        <div className="smoke-wrap">
       
          <Image
            className={styles["smoke"]}
            src="/smoke.png"
            alt=""
            width={700}
            height={700}
          />
        </div>
        <div className="smoke-wrap">
          <Image
            className={styles["smoke"]}
            src="/smoke.png"
            alt=""
            width={700}
            height={800}
          />
        </div>

        <div className="smoke-wrap">
          <Image
            className={styles["smoke2"]}
            src="/smoke.png"
            alt=""
            width={200}
            height={1}
          />
        </div>
        
        <div className="smoke-wrap">
          <Image
            className={styles["smoke3"]}
            src="/smoke.png"
            alt=""
            width={200}
            height={1}
          />
        </div>
        <div className="smoke-wrap">
          <Image
            className={styles["smoke2"]}
            src="/smoke.png"
            alt=""
            width={200}
            height={1}
          />
        </div>

        <div className={styles["menu-card"]}>
          {loading ? (
            <Loader />
          ) : (
            <>
           
              <div className={styles["menu-buttons"]}>
                <button
                  onClick={handlePrivateGameClick}
                  className={styles["menu-button"]}
                >
                  Private Game
                </button>
                <button
                  onClick={() => {
                    setLoading(true);
                    socket?.emit("waitlist", username);
                    makerg();
                  }}
                  className={`${styles["menu-button"]} ${styles["menu-button-secondary"]}`}
                >
                  Random Opponent
                </button>
                <button
                  onClick={handleJoinGameClick}
                  className={`${styles["menu-button"]} ${styles["menu-button-secondary"]}`}
                >
                  Join Game
                </button>
                {joiningGame && (
        <div className={`menu-buttons-1  p-8 rounded-lg shadow-md w-full max-w-sm`}>
       <input
  type="text"
  placeholder="Enter Game ID"
  value={gameId}
  onChange={handleGameIdChange}
  className={` w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 shadow-white hover:shadow-lg`}
  required
/>
          <button
            onClick={handleJoinWithGameId}
            className={` ${styles["menu-button"]}   mt-4 w-full p-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300`}
          >
            Join with Game ID
          </button>
          {loading && <Loader />}
        </div>
      )}

                
              </div>

              {showOnline && (
                <div className={styles["menu-buttons-1"]}>
                  Online: {onlineUsers.length}
                </div>
                
              )}
              <div>
              <button
                  onClick={gotolib}
                  className={`${styles["menu-button_2"]} ${styles["menu-button-secondary"]}`}
                >
                  Library
                </button>
              </div>
              
              {inDevelopment && (
                <div className={styles["menu-dev-message"]}>
                  Development in process. Sorry for any inconvenience.
                </div>
              )}
            </>
          )}
        </div>

        <div className="smoke-wrap">
          <Image
            className={styles["smoke2"]}
            src="/smoke.png"
            alt=""
            width={200}
            height={125}
          />
        </div>
        <div className="smoke-wrap">
          <Image
            className={styles["smoke3"]}
            src="/smoke.png"
            alt=""
            width={700}
            height={800}
          />
        </div>
        <div className="smoke-wrap">
          <Image
            className={styles["smoke2"]}
            src="/smoke.png"
            alt=""
            width={700}
            height={700}
          />
        </div>
        <div className="smoke-wrap">
          <Image
            className={styles["smoke3"]}
            src="/smoke.png"
            alt=""
            width={700}
            height={700}
          />
        </div>
        
      </div>
     
      
    </div>
    </div>
    </>
  );
}
