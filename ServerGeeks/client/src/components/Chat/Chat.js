import { ActionIcon, createStyles, Indicator } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrandHipchat } from "tabler-icons-react";
import ChatBox from "./ChatBox";
import { resetUnreadCount, updateChatBoxOpen } from "../../feature/chatSlice";
import socket from "../../app/socket";

const useStyles = createStyles((theme) => ({
  chatButton: {
    position: "absolute",
    top: "80%",
    left: "35%",

    "@media (max-width: 868px)": {
      left: "35%",
    },

    "@media (max-width: 444px)": {
      left: "54%",
    },

    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        top: "55%",
        left: "70%",
      },
  },
}));

function Chat() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const unreadMessages = useSelector((state) => state.chat.unreadMessagesCount);

  const [opened, setOpened] = useState(false);

  function handleOpenChatBox() {
    setOpened((o) => !o);
    socket.emit("display_chat_box", opened);
  }

  useEffect(() => {
    socket.on("reset_unreadMessage", () => {
      dispatch(resetUnreadCount());
    });

    socket.on("update_box_open", (opened) => {
      dispatch(updateChatBoxOpen(opened));
    });
  }, [dispatch]);

  return (
    <>
      {opened && <ChatBox />}

      <Indicator
        color="green"
        className={classes.chatButton}
        inline
        label={unreadMessages}
        size={16}
      >
        <ActionIcon
          color="dark"
          size="xl"
          radius="xl"
          variant="filled"
          onClick={handleOpenChatBox}
        >
          <BrandHipchat />
        </ActionIcon>
      </Indicator>
    </>
  );
}

export default Chat;
