import { useState } from "react";
import {
  ActionIcon,
  Button,
  createStyles,
  Popover,
  useMantineTheme,
} from "@mantine/core";
import { DoorExit } from "tabler-icons-react";

import socket from "../../app/socket";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  exitButton: {
    position: "absolute",
    top: "80%",
    left: "45%",

    "@media screen and (max-width: 444px) and (orientation:portrait)": {
      left: "68.5%",
    },
    "@media screen and (orientation:landscape) and (max-device-width: 930px)": {
      top: "70%",
      left: "70%",
    },
  },
}));

function Exit() {
  const { id } = useParams();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  function handleLeave() {
    socket.emit("leave_game_room", id);
    navigate("/", { replace: true });
  }

  return (
    <>
      <Popover
        className={classes.exitButton}
        opened={opened}
        onClose={() => setOpened(false)}
        target={
          <ActionIcon
            color="dark"
            size="xl"
            radius="xl"
            variant="filled"
            onClick={() => setOpened((o) => !o)}
          >
            <DoorExit />
          </ActionIcon>
        }
        width={125}
        position="top"
        placement="center"
        withArrow
        styles={{
          body: {
            backgroundColor: theme.colors.dark[8],
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button size="sm" onClick={handleLeave}>
            Leave Game
          </Button>
        </div>
      </Popover>
    </>
  );
}

export default Exit;
