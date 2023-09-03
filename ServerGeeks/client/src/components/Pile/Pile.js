import React from "react";
import { createStyles, Text, Group } from "@mantine/core";

import DeckPile from "./DeckPile";
import DiscardPile from "./DiscardPile";

import { useSelector } from "react-redux";

const useStyles = createStyles((theme, { color }) => ({
  container: {
    display: "flex",

    border: ` ${theme.colors.blue[4]} solid 10px `,
    backgroundColor: ` ${theme.colors.blue[4]} `,
    borderRadius: "15px",

    width: "480px",

    gap: "5px",
    alignItems: "center",
    justifyContent: "center",
    contain: "content",

    position: "absolute",
    top: "48%",
    left: "48%",
    transform: "translateX(-50%) translateY(-50%)",

    "@media screen and (max-device-width: 375px)": {
      flexDirection: "column",
      width: "110px",
      top: "46%",
      left: "48%",
    },

    "@media (min-width: 380px) and (max-width: 576px)": {
      flexDirection: "column",
      width: "110px",
    },
    "@media (min-width: 577px) and (max-width: 700px)": {
      width: "350px",
    },

    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        width: "300px",
        top: "50%",
        left: "48%",
      },

    "@media screen and (orientation: landscape) and (max-device-width: 653px)":
      {
        width: "230px",
        top: "50%",
        left: "48%",
      },
  },
  background: {
    backgroundColor: ` ${theme.colors.gray[0]}`,
  },
  //Design taken from https://css-tricks.com/the-shapes-of-css/
  diamond: {
    width: "0",
    height: "0",
    border: "50px solid transparent",

    borderBottomColor:
      color === "random"
        ? ` ${theme.colors.gray[4]}`
        : `${theme.colors[color][4]} `,

    position: "relative",
    top: "-50px",

    "&:after": {
      content: "''",
      position: "absolute",
      left: "-50px",
      top: "50px",
      width: "0",
      height: "0",
      border: "50px solid transparent",
      borderTopColor:
        color === "random"
          ? ` ${theme.colors.gray[4]}`
          : `${theme.colors[color][4]} `,
    },

    "@media screen and (orientation: landscape) and (max-device-width: 653px)":
      {
        border: "25px solid transparent",
        top: "-25px",
        borderBottomColor:
          color === "random"
            ? ` ${theme.colors.gray[4]}`
            : `${theme.colors[color][4]} `,

        "&:after": {
          left: "-25px",
          top: "25px",
          border: "25px solid transparent ",
          borderTopColor:
            color === "random"
              ? ` ${theme.colors.gray[4]}`
              : `${theme.colors[color][4]} `,
        },
      },
  },
}));

function Pile() {
  const currentColor = useSelector((state) => state.game.currentColor);

  const color = currentColor.toLowerCase();

  const { classes } = useStyles({ color });

  return (
    <>
      <div className={classes.container}>
        <DeckPile />
        <DiscardPile />
        <Group
          position="center"
          direction="column"
          className={classes.background}
        >
          <Text weight={700}>Current Color:</Text>
          <div className={classes.diamond}></div>
        </Group>
      </div>
    </>
  );
}

export default Pile;
