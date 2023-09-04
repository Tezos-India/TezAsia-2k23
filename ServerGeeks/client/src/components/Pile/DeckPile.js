import React from "react";

import { BACKCARD } from "../../utils/constants";
import { createStyles } from "@mantine/core";
import socket from "../../app/socket";
import { useParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  img: {
    width: "180px",
    height: "230px",
    "@media (min-width: 180px) and (max-width: 299px)": {
      width: "100px",
      height: "120px",
    },

    "@media (min-width: 300px) and (max-width: 700px)": {
      width: "115px",
      height: "140px",
    },
    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        width: "100px",
        height: "120px",
      },

    "@media screen and (orientation: landscape) and (max-device-width: 653px)":
      {
        width: "50px",
        height: "90px",
      },
  },
}));

function DeckPile() {
  const { classes } = useStyles();
  const { id } = useParams();

  return (
    <img
      draggable="false"
      className={classes.img}
      src={BACKCARD}
      alt="uno back card"
      onClick={() => {
        socket.emit("draw", { roomID: id, playerID: socket.id });
      }}
    />
  );
}

export default DeckPile;
