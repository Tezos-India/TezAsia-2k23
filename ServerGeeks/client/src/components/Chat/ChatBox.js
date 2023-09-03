import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Send, Dots } from "tabler-icons-react";
import {
  ActionIcon,
  Paper,
  Badge,
  Center,
  Container,
  createStyles,
  Group,
  ScrollArea,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import socket from "../../app/socket";
import { v4 } from "uuid";

const useStyles = createStyles((theme) => ({
  chatbox: {
    position: "absolute",
    top: "54.5%",
    left: "60%",

    "@media (max-width: 1280px)": {
      top: "46.5%",
    },

    "@media (max-width: 1024px)": {
      top: "28.7%",
    },

    "@media (max-width: 988px)": {
      left: "64.6%",
    },
    "@media (max-width: 952px)": {
      left: "60%",
    },

    "@media (max-width: 816px)": {
      top: "15%",
      left: "15%",
    },

    "@media (max-width: 450px)": {
      top: "10%",
      left: "5%",
    },
  },

  border: {
    border: `2px solid ${theme.colors.dark[8]}`,
  },

  borderSm: {
    border: `1.3px solid ${theme.colors.dark[8]}`,
  },

  redColor: {
    backgroundColor: theme.colors.red[1],
  },

  inputContainer: {
    display: "flex",
    paddingLeft: "0",
  },

  inputBox: {
    paddingRight: "6px",
    flexDirection: "row",
    flexWrap: "nowrap",
  },

  messageContainer: {
    backgroundColor: theme.colors.red[4],
  },

  messageBox: {
    display: "flex",
    marginBottom: "15px",
  },

  right: {
    float: "right",
  },

  left: {
    float: "left",
  },

  firstPerson: {
    backgroundColor: theme.colors.blue[8],
    color: theme.colors.gray[0],
  },
}));

function ChatBox() {
  const { id } = useParams();
  const { classes, cx } = useStyles();

  const roomName = useSelector((state) => state.game.roomName);
  const players = useSelector((state) => state.game.players);
  const messages = useSelector((state) => state.chat.messages);

  const form = useForm({
    initialValues: {
      message: "",
    },

    validate: {
      message: (value) =>
        value !== "" ? null : "need to enter a message to send",
    },
  });

  function sendMessage(values) {
    const author = players.find((player) => player.id === socket.id);
    const time = new Date();

    const messageInfo = {
      roomID: id,
      messageID: v4(),
      authorID: socket.id,
      author: author.name,
      message: values.message,
      time: time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };
    socket.emit("send_message", messageInfo);
    form.setFieldValue("message", "");
  }

  return (
    <>
      <Paper
        className={cx(classes.chatbox, classes.border)}
        shadow="xl"
        radius="md"
        withBorder
      >
        <Container
          className={cx(
            classes.titleContainer,
            classes.border,
            classes.redColor
          )}
        >
          <Group>
            <Dots size={35} strokeWidth={4.5} color={"#bf4540"} />

            <Center>
              <Text
                size="xl"
                weight={700}
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                <Text color="blue" inherit component="span">
                  {roomName}
                </Text>{" "}
                Chatbox
              </Text>
            </Center>
          </Group>
        </Container>

        <Container className={cx(classes.messageContainer, classes.borderSm)}>
          <ScrollArea
            style={{ height: 300, width: 300 }}
            type="auto"
            scrollbarSize={18}
          >
            {messages.map((messageContent) => {
              return (
                <Paper
                  key={messageContent.messageID}
                  radius="xl"
                  p="md"
                  className={
                    messageContent.authorID === socket.id
                      ? cx(
                          classes.firstPerson,
                          classes.right,
                          classes.messageBox
                        )
                      : cx(classes.left, classes.messageBox)
                  }
                >
                  <Group>
                    <Badge>{messageContent.author}</Badge>

                    <Text
                      weight={500}
                      align="center"
                      style={{ wordBreak: "break-word" }}
                    >
                      {messageContent.message}
                    </Text>

                    <Text align="right">{messageContent.time}</Text>
                  </Group>
                </Paper>
              );
            })}
          </ScrollArea>
        </Container>

        <Container
          className={cx(
            classes.inputContainer,
            classes.border,
            classes.redColor
          )}
        >
          <form onSubmit={form.onSubmit(sendMessage)}>
            <Group className={classes.inputBox}>
              <Textarea
                style={{ paddingRight: "15px" }}
                placeholder="Your message"
                size="lg"
                required
                {...form.getInputProps("message")}
              />

              <Center>
                <ActionIcon
                  size="xl"
                  color="red"
                  variant="filled"
                  type="submit"
                >
                  <Send />
                </ActionIcon>
              </Center>
            </Group>
          </form>
        </Container>
      </Paper>
    </>
  );
}

export default ChatBox;
