import { Group, Modal, Space, Text, useMantineTheme } from "@mantine/core";
import React from "react";

function Credits({ openInfo, setOpenInfo }) {
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        overlayOpacity={0.55}
        overlayBlur={1}
        opened={openInfo}
        onClose={() => setOpenInfo(false)}
        styles={{
          modal: {
            backgroundColor: `${theme.colors.dark[8]}`,
          },
          body: {
            color: `${theme.colors.gray[0]}`,
          },
        }}
        sx={(theme) => ({ a: { color: theme.colors.blue[3] } })}
      >
        <Text
          sx={(theme) => ({
            color: theme.colors.blue[5],
          })}
          size="xl"
          align="center"
        >
          --Credits--
        </Text>

        <Space h="md" />

        <Text size="md" align="center" underline transform="uppercase">
          Programmed By:
        </Text>

        <Space h="md" />

        <Text
          size="md"
          align="center"
          weight={700}
          sx={(theme) => ({
            color: theme.colors.green[5],
          })}
        >
          Amari Byrd
        </Text>

        <Space h="md" />
        <Text underline size="md" align="center" transform="uppercase">
          assets by:
        </Text>

        <Space h="sm" />

        <Text
          size="sm"
          sx={(theme) => ({
            color: theme.colors.green[5],
          })}
        >
          Avatar Credits:
        </Text>

        <Space h="sm" />

        <Group position="center" direction="row">
          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/101724/penguin"
              rel="noreferrer"
            >
              Penguin
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>

          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/P7vVMRB25WEC/flamingo"
              rel="noreferrer"
            >
              Flamingo
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>

          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/101728/unicorn"
              rel="noreferrer"
            >
              Unicorn
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>

          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/101705/bee"
              rel="noreferrer"
            >
              Bee
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>

          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/101721/pig"
              rel="noreferrer"
            >
              Pig
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>

          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/101712/dog"
              rel="noreferrer"
            >
              Dog
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>

          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/101706/cat"
              rel="noreferrer"
            >
              Cat
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>

          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/bJ_EPaHOlIJt/octopus"
              rel="noreferrer"
            >
              Octopus
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>

          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/xtp_K8TJSIbw/crab"
              rel="noreferrer"
            >
              Crab
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>

          <Text size="sm">
            <a
              target="_blank"
              href="https://icons8.com/icon/101717/elephant"
              rel="noreferrer"
            >
              Elephant
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com" rel="noreferrer">
              Icons8
            </a>
          </Text>
        </Group>

        <Space h="sm" />

        <Text
          size="sm"
          sx={(theme) => ({
            color: theme.colors.green[5],
          })}
        >
          Logo Credits:
        </Text>

        <Space h="sm" />

        <Text size="sm" align="center">
          Uno logo by{" "}
          <a
            target="_blank"
            href="https://www.pngaaa.com/detail/4113531"
            rel="noreferrer"
          >
            pngaaa
          </a>
        </Text>

        <Space h="sm" />

        <Text
          size="sm"
          sx={(theme) => ({
            color: theme.colors.green[5],
          })}
        >
          Cards Credits:
        </Text>

        <Space h="sm" />

        <Text size="sm" align="center">
          Uno cards by{" "}
          <a
            target="_blank"
            href="https://alexder.itch.io/uno-card-game-asset-pack"
            rel="noreferrer"
          >
            alexder.itch.io
          </a>
        </Text>
      </Modal>
    </>
  );
}

export default Credits;
