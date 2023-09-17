import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Pile from "../../components/Pile/Pile";
import { useSelector, useDispatch } from "react-redux";

import {
  ActionIcon,
  Alert,
  Button,
  createStyles,
  Group,
  Loader,
  Modal,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";

import TopHand from "../../components/Hand/TopHand";
import PlayerHand from "../../components/Hand/PlayerHand";
import RightHand from "../../components/Hand/RightHand";
import LeftHand from "../../components/Hand/LeftHand";
import ColorChooser from "../../components/ColorChooser/ColorChooser";
import Win from "../../components/Win/Win";

import socket from "../../app/socket";
import Exit from "../../components/Exit/Exit";
import {
  updatePlayers,
  move,
  setWildCard,
  colorChange,
  draw,
  WinGame,
  updateDeck,
} from "../../feature/gameSlice";
import { DoorExit, LetterX } from "tabler-icons-react";
import Error from "../../components/Error/Error";
import Chat from "../../components/Chat/Chat";
import { addMessage, updateUnreadCount } from "../../feature/chatSlice";
import { endGameOperation } from "../../utils/operation";

const useStyles = createStyles((theme) => ({
  icon: {
    position: "absolute",
    top: "5%",
    left: "90%",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  },
}));

function Game() {
  const { id } = useParams();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [found, setFound] = useState("");
  const [playerLeaveMessage, setPlayerLeaveMessage] = useState("");
  const [opened, setOpened] = useState(true);
  const [transLoading, setTransLoading] = useState(false);
  const [transSuccess, setTransSuccess] = useState(false);

  const playersList = useSelector((state) => state.game.players);
  const isWildCard = useSelector((state) => state.game.isWild);
  const isWin = useSelector((state) => state.game.isWin);

  const positions = [TopHand, RightHand, LeftHand];

  const onEndGame = async () => {
    try {
      setTransLoading(true);
      await endGameOperation();
      alert("Game Ended")
      setTransSuccess(true);
    } catch (error) {
      setTransSuccess(true);
      throw error;
    }
    setTransLoading(false);
  };

  useEffect(() => {
    // navigate back
    window.onpopstate = function () {
      socket.emit("leave_game_room", id);
      navigate("/", { replace: true });
    };
    window.history.pushState({}, "");

    window.onbeforeunload = (e) => {
      if (found) {
        socket.emit("leave_game_room", id);
      }
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, [found, id, navigate]);

  useEffect(() => {
    const moveListener = (data) => {
      notifications.showNotification({
        autoClose: 1650,
        color:
          data.cardPlayed.color === "random"
            ? "dark"
            : data.cardPlayed.color.toLowerCase(),
        message: `A ${data.cardPlayed.name} was played! `,
      });

      dispatch(move(data));
    };

    const drawListener = (drawInfo) => {
      dispatch(draw(drawInfo));
    };

    const deckListener = (playerHand) => {
      dispatch(updateDeck(playerHand));
    };

    const colorListener = (colorInfo) => {
      notifications.showNotification({
        autoClose: 1500,
        color: colorInfo.color.toLowerCase(),
        message: `Color ${colorInfo.color} was Chosen!`,
      });

      dispatch(colorChange(colorInfo));
    };

    const wildListener = (isWild) => {
      dispatch(setWildCard(isWild));
    };

    const messageListener = (messageInfo) => {
      dispatch(addMessage(messageInfo));
    };

    const unreadMessageListener = () => {
      //chatbox is not open, count the # of unread messages
      dispatch(updateUnreadCount());
    };

    socket.on("recieve_message", messageListener);

    socket.on("game_end_error", (message) => {
      setMessage(message);
    });

    socket.on("update_draw_move", drawListener);

    socket.on("update_move", moveListener);

    socket.on("update_wild_move", wildListener);

    socket.on("update_deck", deckListener);

    socket.on("update_current_color", colorListener);

    socket.on("winner", (winnerData) => {
      dispatch(WinGame(winnerData));
    });

    socket.on("update_unread_count", unreadMessageListener);

    socket.on(
      "game_room_user_leave",
      ({ message, playerID, currentPlayerIndex, nextPlayerIndex }) => {
        setPlayerLeaveMessage(message);

        dispatch(
          updatePlayers({
            id: playerID,
            currPlayer: currentPlayerIndex,
            nextPlayer: nextPlayerIndex,
          })
        );
      }
    );

    return () => {
      socket.off("recieve_message", messageListener);
      socket.off("update_current_color", colorListener);
      socket.off("update_unread_count", unreadMessageListener);
      socket.off("update_move", moveListener);
      socket.off("update_draw_move", drawListener);
      socket.off("update_wild_move", wildListener);
    };
  }, [dispatch, notifications]);

  useEffect(() => {
    setFound(playersList.find((player) => player.id === socket.id));
    const timer = setTimeout(() => setLoading(false), 50);

    return () => {
      setFound("");
      clearTimeout(timer);
    };
  }, [playersList]);

  function handleLeaveGame() {
    socket.emit("leave_game", id);
    navigate("/", { replace: true });
  }

  return (
    <div
      style={{
        margin: "0px",
        padding: "0px",
        height: "100vh",
        width: "100%",
        position: "absolute",
        bottom: "0",
        overflow: "hidden",
        backgroundSize: "100%",

        background: `radial-gradient(circle at center, ${theme.colors.orange[8]}, ${theme.colors.red[8]}, ${theme.colors.red[8]})`,
      }}
    >
      {isLoading ? (
        <div className={classes.center}>
          <Loader color="indigo" />
        </div>
      ) : found ? (
        <div>
          <Pile />

          {playersList.map((player) => {
            if (player.id === socket.id) {
              return <PlayerHand key={player.id} player={player} />;
            }

            //places each player around the board (removes 1 element at index 0 in positions array)
            return positions.splice(0, 1).map((Component) => {
              return <Component key={player.id} player={player} />;
            });
          })}

          {isWildCard && <ColorChooser />}

          {isWin && <Win />}

          {message && (
            <Modal
              opened={opened}
              onClose={() => setOpened(true)}
              title="Game Error"
              withCloseButton={false}
              styles={{
                title: {
                  color: `${theme.colors.yellow[5]}`,
                },
                modal: {
                  backgroundColor: `${theme.colors.violet[8]}`,
                },
                body: {
                  color: `${theme.colors.gray[0]}`,
                },
              }}
            >
              <Group position="center">
                <Text>{message}</Text>
                <Button color="dark" onClick={handleLeaveGame} disabled={!transSuccess}>
                  Exit Game
                </Button>

                { 
                  <Button
                    color="dark"
                    size="md"
                    onClick={() => {
                      onEndGame();
                    }}
                    disabled={transSuccess}
                  >
                    {transLoading ? "transacting...." : "Claim Reward"}
                  </Button>
                }
                
              </Group>
            </Modal>
          )}

          {playerLeaveMessage && (
            <Alert
              className={classes.center}
              icon={<DoorExit size={16} />}
              radius="md"
              title="Player Left!"
            >
              <ActionIcon
                className={classes.icon}
                onClick={() => setPlayerLeaveMessage("")}
              >
                <LetterX size={13} />
              </ActionIcon>
              {playerLeaveMessage}
            </Alert>
          )}

          <Chat />

          <Exit />
        </div>
      ) : (
        <div className={classes.center}>
          <Error />
        </div>
      )}
    </div>
  );
}

export default Game;
