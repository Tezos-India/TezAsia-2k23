import { ActionIcon, Alert, createStyles, Loader } from "@mantine/core";
import { DoorExit, LetterX } from "tabler-icons-react";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { useDispatch } from "react-redux";
import { start } from "../../feature/gameSlice";

import Background from "../../components/Background/Background";
import socket from "../../app/socket";
import Lobby from "../../components/Lobby/Lobby";
import Error from "../../components/Error/Error";

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  },
  icon: {
    position: "absolute",
    top: "5%",
    left: "90%",
  },
}));

function WaitRoom() {
  const { id } = useParams();

  const [waitingPlayers, setWaitingPlayers] = useState(0);
  const [found, setFound] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [maxRoomLength, setMaxRoomLength] = useState(0);
  const [playersList, setPlayersList] = useState([]);

  const navigate = useNavigate();
  const { classes } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // navigate back
    window.onpopstate = (e) => {
      socket.emit("wait_room_leave", id);
      navigate("/", { replace: true });
    };

    window.onbeforeunload = (e) => {
      if (found) {
        socket.emit("wait_room_leave", id);
      }
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, [found, id, navigate]);

  useEffect(() => {
    socket.emit("get_players_in_wait", id, (response) => {
      if (response) {
        setRoomName(response.roomName);
        setMaxRoomLength(response.maxPlayers);
        setWaitingPlayers(response.players.length);
        setPlayersList(response.players);
      }
    });

    socket.on("player_join", (newPlayersList) => {
      setWaitingPlayers(newPlayersList.length);
      setPlayersList(newPlayersList);
    });

    //when player leaves room, update other players in waiting room
    socket.on("wait_room_user_leave", ({ message, newPlayersList }) => {
      setPlayersList(newPlayersList);
      setWaitingPlayers(newPlayersList.length);
      setMessage(message);
    });

    socket.on("start_game", (data) => {
      dispatch(start(data.info));

      const gameRoomPath = generatePath("/uno/Game/gameroom=:id", {
        id: data.id,
      });

      const gameTimer = setTimeout(() => navigate(gameRoomPath), 650);
      return () => {
        setFound("");
        clearTimeout(gameTimer);
      };
    });
  }, [dispatch, id, navigate]);

  useEffect(() => {
    setFound(playersList.find((player) => player.id === socket.id));
    const timer = setTimeout(() => setLoading(false), 70);

    return () => {
      setFound("");
      clearTimeout(timer);
    };
  }, [playersList]);

  return (
    <div>
      <div className={classes.container}>
        {isLoading ? (
          <Loader color="indigo" />
        ) : found ? (
          <div>
            <Lobby
              id={id}
              roomName={roomName}
              playersList={playersList}
              waitingPlayers={waitingPlayers}
              maxRoomLength={maxRoomLength}
            />
            {message && (
              <Alert
                icon={<DoorExit size={16} />}
                radius="md"
                title="Player Left!"
              >
                <ActionIcon
                  className={classes.icon}
                  onClick={() => setMessage("")}
                >
                  <LetterX size={13} />
                </ActionIcon>
                {message}
              </Alert>
            )}
          </div>
        ) : (
          <Error />
        )}
      </div>
      <Background />
    </div>
  );
}

export default WaitRoom;
