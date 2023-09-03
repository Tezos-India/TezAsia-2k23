import React from "react";
import { useDrag } from "react-dnd";
import { createStyles } from "@mantine/core";
import { BACKCARD } from "../../utils/constants";

const useStyles = createStyles((theme) => ({
  img: {
    width: "145px",
    height: "215px",

    "@media (min-width: 180px) and (max-width: 299px)": {
      width: "70px",
      height: "100px",
    },

    "@media (min-width: 300px) and (max-width: 576px)": {
      width: "100px",
      height: "135px",
    },
    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        width: "140px",
        height: "190px",
      },
  },
}));

function Card({ card, playerID, back }) {
  const { classes } = useStyles();
  const [, drag] = useDrag(() => ({
    type: "image",
    item: { card: card, player: playerID },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  if (back) {
    return (
      <img
        draggable="false"
        className={classes.img}
        src={BACKCARD}
        alt="Back Uno Card"
      />
    );
  } else {
    return (
      <img ref={drag} className={classes.img} src={card.src} alt="Uno Card" />
    );
  }
}

export default Card;
