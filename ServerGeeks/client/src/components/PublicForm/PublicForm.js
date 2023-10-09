import React, { useState, useEffect } from "react";
import { Button, Center, Group, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import socket from "../../app/socket";
import {connectWallet, disconnectWallet, getAccount} from "../../utils/wallet";
import { buyTicketOperation, endGameOperation } from "../../utils/operation";

function PublicForm({ roomID, stakeAmt }) {
  const [loading, setLoading] = useState(false);
  const [staked, isStaked] = useState(false);
  const [account, setAccount] = useState("");
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) =>
        value.trim().length >= 2 && value.trim().length <= 6
          ? null
          : "Name must include at least 2 characters and max 6 characters",
    },
  });

  function joinRoom(values) {
    const joinInfo = {
      room: roomID,
      name: values.name,
      password: "",
    };
    socket.emit("join_room", joinInfo);
  }

  useEffect(() => {
    console.log(stakeAmt);
    (async () => {
        const account = await getAccount();
        setAccount(account);        
        console.log(account)
    })();
  }, []);

  const onBuyTicket = async () => {
    try {
      setLoading(true);
      const res = await buyTicketOperation(stakeAmt);
      alert("Your TEZOS is now on stake")
      isStaked(true);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(joinRoom)}>
        <Group position="center" direction="column" grow>
          <TextInput
            required
            placeholder="nickname"
            label="your name"
            radius="xl"
            size="sm"
            {...form.getInputProps("name")}
          />
        </Group>
        <Space h="md" />
        <Center>
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
          <Button type="submit" color="dark" size="md" disabled={staked ? false : true}>
            Join Game
          </Button>
        </Center>
      </form>
    </>
  );
}

export default PublicForm;
