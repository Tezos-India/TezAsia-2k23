import React, { useCallback, useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { getAccount } from "../../utils/wallet";

import {
  createStyles,
  TextInput,
  Title,
  Space,
  Paper,
  Group,
  Modal,
  Radio,
  RadioGroup,
  useMantineTheme,
  Checkbox,
  Text,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { EyeCheck, EyeOff } from "tabler-icons-react";
import socket from "../../app/socket";
import { buyTicketOperation, endGameOperation } from "../../utils/operation";

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor: theme.colors.red[6],
    width: "100vw",
    height: "100vh",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  },
  radio: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function CreateGame() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(true);
  const [roomID, setRoomID] = useState("");
  const [loading, setLoading] = useState(false);
  const [staked, isStaked] = useState(false);
  const [stakeAmt, setStakeAmt] = useState(false);
  const [isPrivateGame, setIsPrivateGame] = useState(false);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const clipboard = useClipboard({ timeout: 500 });

  const form = useForm({
    initialValues: {
      roomName: "",
      name: "",
      numOfPlayers: "2",
      checked: false,
      password: "",
    },

    validate: {
      roomName: (value) =>
        value.trim().length >= 2 && value.trim().length <= 8
          ? null
          : "room name must include at least 2 characters and max 8 characters",
      name: (value) =>
        value.trim().length >= 2 && value.trim().length <= 6
          ? null
          : "Name must include at least 2 characters and max 6 characters",

      password: (password, values) =>
        (values.checked === true && password !== "") ||
        (values.checked === false && password === "") ||
        (values.checked === false && password !== "")
          ? null
          : "You must enter a password if you want your game to be private",
    },
  });

  useEffect(() => {
    return () => {
      setIsPrivateGame(false);
    };
  }, []);

  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
        const account = await getAccount();
        setAccount(account);        
        console.log(account)
    })();
  }, []);

  useEffect(() => {
    //resets password field when the private game checkbox is not clicked
    if (form.values.checked === false && form.values.password !== "") {
      form.setFieldValue("password", "");
    }
  }, [form, form.values.checked, form.values.password]);

  const handleNavigate = useCallback(
    (id) => {
      const waitingRoomPath = generatePath(`/uno/WaitingRoom/gameroom=:id`, {
        id: id,
      });
      console.log(waitingRoomPath);
      navigate(waitingRoomPath);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("private_game_created", (roomName) => {
      setIsPrivateGame(true);
      setRoomID(roomName);
    });

    socket.on("public_game_created", (roomName) => {
      setIsPrivateGame(false);
      handleNavigate(roomName);
    });
  }, [handleNavigate, navigate]);

  function handleRoomCodeClick() {
    handleNavigate(roomID);
  }

  const onBuyTicket = async () => {
    if(stakeAmt > 0 && stakeAmt < 10) {
      try {
        setLoading(true);
        const res = await buyTicketOperation(stakeAmt);
        alert("Your TEZOS is now on stake")
        isStaked(true);
      } catch (error) {
        throw error;
      }
      setLoading(false);
    } else {
      alert("Invalid Amount")
    }
  };

  const onEndGame = async () => {
    try {
      setLoading(true);
      await endGameOperation();
      alert("Game Ended")
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };


  function joinRoom(values) {
    console.log(stakeAmt);
    const gameInfo = {
      room: values.roomName,
      name: values.name,
      maxPlayers: values.numOfPlayers,
      password: values.password,
      publicGameCheck: values.checked ? "private" : "public",
      stakeAmt: stakeAmt,
    };
    console.log(gameInfo);
    socket.emit("create_game", gameInfo);
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <Paper p="md" shadow="xs" radius="xl" withBorder>
          <Title
            sx={{
              color: `${theme.colors.dark[6]}`,
              display: "flex",
              justifyContent: "center",
            }}
            order={1}
          >
            Create Game
          </Title>

          <Space h="xl" />

          <form onSubmit={form.onSubmit(joinRoom)}>
            <Group position="center" direction="column" grow>
              <TextInput
                required
                placeholder="room"
                label="Room Name"
                radius="xl"
                size="md"
                {...form.getInputProps("roomName")}
              />

              <TextInput
                required
                placeholder="your name"
                label="Nickname"
                radius="xl"
                size="md"
                {...form.getInputProps("name")}
              />

              <TextInput
                required
                placeholder="Amount to be Staked (1-9 TEZ)"
                label="TEZ to be Staked"
                radius="xl"
                size="md"
                type="number"
                min={1}
                max={9}
                {...form.getInputProps("stakedAmt")}
                onChange={(e) => setStakeAmt(e.target.value)}
              />

              <RadioGroup
                required
                className={classes.radio}
                label="Select number of players in the game."
                size="lg"
                color="red"
                {...form.getInputProps("numOfPlayers", { type: "radiogroup" })}
              >
                <Radio value="2" label={2} />
                {/* <Radio value="3" label={3} />

                <Radio value="4" label={4} /> */}
              </RadioGroup>

              <Group>
                <Text size="xl" weight={700}>
                  Private Game?{" "}
                </Text>

                <Checkbox
                  {...form.getInputProps("checked", {
                    type: "checkbox",
                  })}
                  label={form.values.checked ? "Yes" : "No"}
                />
              </Group>

              {form.values.checked ? (
                <PasswordInput
                  required
                  label="Game Password"
                  placeholder="Change visibility toggle icon"
                  description="Do not forget to give your opponents this password. Remember it is a secret :)."
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
                  }
                  {...form.getInputProps("password")}
                  size="sm"
                  radius="xl"
                />
              ) : (
                ""
              )}
            </Group>

            <Space h="xl" />

            <Group position="apart">
              <Button
                color="dark"
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

              {/* <Button
                color="dark"
                size="md"
                onClick={() => {
                  onEndGame();
                }}
              >
                {loading ? "transacting...." : "End Game"}
              </Button> */}

              <Button type="submit" color="dark" size="md" disabled={staked ? false : true}>
                Create
              </Button>
              
            </Group>
          </form>
        </Paper>

        {isPrivateGame && (
          <div>
            <Modal
              opened={opened}
              onClose={() => setOpened(true)}
              title="Room Code (Private Game)!"
              hideCloseButton
              styles={{
                title: {
                  color: `${theme.colors.orange[8]}`,
                  fontWeight: "bold",
                },
              }}
            >
              <Text>
                Don't forget to copy the room code down below, in able for other
                players to join your game:
              </Text>

              <Group position="center" direction="column">
                <Text color="orange">{roomID}</Text>

                <Group>
                  <Button
                    size="xs"
                    color={clipboard.copied ? "teal" : "blue"}
                    onClick={() => clipboard.copy(roomID)}
                  >
                    {clipboard.copied ? "Copied" : "Copy"}
                  </Button>

                  <Button size="xs" onClick={handleRoomCodeClick}>
                    ok
                  </Button>
                </Group>
              </Group>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateGame;
