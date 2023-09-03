import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { endGameOperation } from "../../utils/operation";

import {
  useMantineTheme,
  Modal,
  Button,
  Space,
  Center,
  Text,
  Group,
  createStyles,
} from "@mantine/core";
import { useSelector } from "react-redux";
import NameTag from "../NameTag/NameTag";
import logo from "../../assets/logo.png";
import socket from "../../app/socket";

const useStyles = createStyles((theme) => ({
  img: {
    height: "70px",
    width: "70px",
  },
}));

function Win() {
  const { id } = useParams();
  const [opened, setOpened] = useState(true);
  const [userName, setUserName] = useState(true);
  const [transSuccess, setTransSuccess] = useState(false);
  const winner = useSelector((state) => state.game.winner);
  const score = useSelector((state) => state.game.winnerScore);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const playersList = useSelector((state) => state.game.players);
  const [loading, setLoading] = useState(false);

  function handleClick() {
    socket.emit("leave_game_room", id);
    navigate("/");
  }

  const onEndGame = async () => {
    try {
      setLoading(true);
      await endGameOperation();
      alert("Game Ended")
      setTransSuccess(true);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };
  

  useEffect(() => {
    // console.log();
    setUserName((playersList.find((player) => player.id === socket.id)).name)
  }, [])

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(true)}
        hideCloseButton
        styles={{
          title: { color: `${theme.colors.blue[8]}`, fontWeight: "bold" },
          modal: {
            backgroundColor: `${theme.colors.red[8]}`,
            border: `5px solid ${theme.colors.dark[8]}`,
          },
        }}
      >
        <Center>
          <Group position="center" direction="column">
            <Text color={theme.colors.yellow[2]} size="xl" weight={800}>
              WINNER!
            </Text>

            <NameTag id={winner.avatarID} />

            <Text color={theme.colors.blue[2]} size="xl" weight={800}>
              Score:{" "}
              <span
                style={{
                  color: `${theme.colors.dark[9]}`,
                  textDecoration: "underline",
                }}
              >
                {score}{" "}
              </span>
            </Text>

            <Text color="dark" weight={700} size="lg">
              <span
                style={{
                  color: `${theme.colors.gray[0]}`,
                  textDecoration: "underline",
                }}
              >
                {winner.name}
              </span>{" "}
              has won{" "}
              <img src={logo} alt="Uno Game Logo" className={classes.img} />
            </Text>
          </Group>
        </Center>
        <Space h="lg" />
        <Center>
        {
          (userName === winner.name) && (!transSuccess) ? (
            <Button color="blue" radius="xs" onClick={onEndGame}>
              {loading ? "transacting...." : "Claim Your Reward"}
            </Button>
          ) : ("")
        }
          
          <Button color="blue" radius="xs" onClick={handleClick}>
            End Game
          </Button>
        </Center>
      </Modal>
    </>
  );
}

export default Win;
