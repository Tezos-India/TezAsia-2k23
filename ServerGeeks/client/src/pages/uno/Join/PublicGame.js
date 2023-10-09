import { useEffect, useState } from "react";

import {
  createStyles,
  useMantineTheme,
  Paper,
  Table,
  ScrollArea,
  Text,
  Title,
  Space,
  Button,
  Center,
  Modal,
  Group,
} from "@mantine/core";
import { Refresh } from "tabler-icons-react";
import socket from "../../../app/socket";
import PublicForm from "../../../components/PublicForm/PublicForm";
import { generatePath, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor: theme.colors.dark[6],
    width: "100vw",
    height: "100vh",
  },

  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  },

  paper: {
    backgroundColor: theme.colors.gray[6],
  },
}));
function PublicGame() {
  //show all available public games
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [publicGames, setPublicGames] = useState([]);
  const [error, setError] = useState("");
  const [roomID, setRoomID] = useState("");
  const [stakedAmt, setStakedAmt] = useState();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    socket.emit("get_public_games", (response) => {
      if (response) {
        setPublicGames(response);
        console.log(response)
      }
    });

    socket.on("join_error", (error) => {
      setError(error);
    });

    socket.on("join_success", (roomCode) => {
      const waitingRoomPath = generatePath("/uno/WaitingRoom/gameroom=:id", {
        id: roomCode,
      });
      navigate(waitingRoomPath);
    });
  }, [navigate]);

  useEffect(() => {
    socket.on("remove_room", (room) => {
      setPublicGames(publicGames.filter((game) => game.roomID !== room));
    });
  }, [publicGames]);

  const games = publicGames.map((game) => (
    <tr key={game.roomID} onClick={() => handleRoomClick(game.roomID, game.stakeAmt)}>
      <td
        style={{
          fontWeight: "bold",
        }}
      >
        {game.roomName}
      </td>
      <td
        style={{
          fontWeight: "bold",
        }}
      >
        {game.playersLength}/{game.maxPlayers}
      </td>
    </tr>
  ));

  function refreshPage() {
    window.location.reload();
  }

  function handleRoomClick(id, stakeAmt) {
    setRoomID(id);
    setStakedAmt(stakeAmt);
    setOpened(true);
  }

  function handleModalClick() {
    setOpened(false);
    setError("");
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <Modal opened={opened} onClose={handleModalClick}>
          <Title
            sx={{
              color: `${theme.colors.dark[6]}`,
              display: "flex",
              justifyContent: "center",
            }}
            order={1}
          >
            Join Game
          </Title>
          <PublicForm roomID={roomID} stakeAmt={stakedAmt} />

          {error && (
            <Text weight={500} color="red">
              {error}
            </Text>
          )}
        </Modal>

        <Paper
          className={classes.paper}
          p="lg"
          shadow="xs"
          radius="xl"
          withBorder
        >
          <Title
            style={{
              whiteSpace: "nowrap",
              color: theme.colors.gray[0],
              fontWeight: "700px",
            }}
            order={1}
          >
            Available Public Games
          </Title>

          <Space h="md" />

          {publicGames.length ? (
            <ScrollArea style={{ height: 250 }} type="auto" scrollbarSize={18}>
              <Table horizontalSpacing="xl" highlightOnHover fontSize="md">
                <thead>
                  <tr>
                    <th
                      style={{
                        color: theme.colors.yellow[5],
                        fontWeight: "bold",
                        fontSize: "17px",
                      }}
                    >
                      Room:
                    </th>
                    <th
                      style={{
                        color: theme.colors.yellow[5],
                        fontWeight: "bold",
                        fontSize: "17px",
                      }}
                    >
                      Number of Players:
                    </th>
                  </tr>
                </thead>

                <tbody>{games}</tbody>
              </Table>
            </ScrollArea>
          ) : (
            <Center>
              <Text
                size="lg"
                style={{ color: theme.colors.blue[7], fontWeight: "bold" }}
              >
                No public games available
              </Text>
            </Center>
          )}
          <Space h="md" />

          <Group position="apart">
            <Button color="dark" onClick={refreshPage}>
              <Refresh size={20} />
              Update
            </Button>
            <Button
              color="dark"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
          </Group>
        </Paper>
      </div>
    </div>
  );
}

export default PublicGame;
