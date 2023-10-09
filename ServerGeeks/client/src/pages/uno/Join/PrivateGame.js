import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import {
  createStyles,
  TextInput,
  Title,
  Space,
  Paper,
  Group,
  useMantineTheme,
  Text,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { EyeCheck, EyeOff } from "tabler-icons-react";
import socket from "../../../app/socket";
import {connectWallet, disconnectWallet, getAccount} from "../../../utils/wallet";
import { buyTicketOperation, endGameOperation } from "../../../utils/operation";

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
}));

function PrivateGame() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [staked, isStaked] = useState(false);
  const [account, setAccount] = useState("");

  const form = useForm({
    initialValues: {
      roomCode: "",
      name: "",
      password: "",
    },
    validate: {
      roomCode: (value) =>
        value.trim().length === 16 ? null : "room code must be 16 characters.",
      name: (value) =>
        value.trim().length >= 2 && value.trim().length <= 6
          ? null
          : "Name must include at least 2 characters and max 6 characters",

      password: (value) =>
        value !== ""
          ? null
          : "You must enter a password if you want to play in a private game",
    },
  });

  useEffect(() => {
    (async () => {
        const account = await getAccount();
        setAccount(account);        
        console.log(account)
    })();
  }, []);

  const onBuyTicket = async () => {
    try {
      setLoading(true);
      const res = await buyTicketOperation();
      alert("Your TEZOS is now on stake")
      isStaked(true);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
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

  function handleSubmit(values) {
    const joinInfo = {
      room: values.roomCode,
      name: values.name,
      password: values.password,
    };

    socket.emit("join_room", joinInfo);
  }

  return (
    <div>
      <div className={classes.background}>
        <div className={classes.container}>
          <Paper p="md" shadow="xs" radius="xl" withBorder>
            <Title
              sx={{
                color: `${theme.colors.blue[6]}`,
                display: "flex",
                justifyContent: "center",
              }}
              order={1}
            >
              Join Private Game
            </Title>
            <Space h="xl" />
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Group position="center" direction="column" grow>
                <TextInput
                  required
                  placeholder="room"
                  label="Room  Code"
                  radius="xl"
                  size="md"
                  {...form.getInputProps("roomCode")}
                />

                <TextInput
                  required
                  placeholder="your name"
                  label="Nickname"
                  radius="xl"
                  size="md"
                  {...form.getInputProps("name")}
                />
                <PasswordInput
                  required
                  label="Game Password"
                  radius="xl"
                  placeholder="Change visibility toggle icon"
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
                  }
                  {...form.getInputProps("password")}
                  size="md"
                />
                {error && (
                  <Text weight={500} color="red">
                    {error}
                  </Text>
                )}
              </Group>
              <Space h="xl" />
              <Group position="apart">
                <Button
                  size="md"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </Button>
                <Button
                      color="dark"
                      size="md"
                      onClick={() => {
                        onBuyTicket();
                      }}
                      disabled={staked ? true : false}
                    >
                      {loading ? "transacting...." : "Stake to Play"}
                </Button>
                <Button type="submit" size="md" disabled={staked ? false : true}>
                  Join
                </Button>
              </Group>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default PrivateGame;
