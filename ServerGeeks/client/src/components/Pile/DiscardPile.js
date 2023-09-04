import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useDrop } from "react-dnd";
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

function DiscardPile() {
  const { id } = useParams();
  const discardCard = useSelector((state) => state.game.TopCard);
  const colorChosen = useSelector((state) => state.game.isColorChosen);
  const currIndex = useSelector((state) => state.game.currentPlayer);

  const dispatch = useDispatch();
  const { classes } = useStyles();

  const [, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) =>
      socket.emit("move", { roomID: id, card: item.card, player: item.player }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    //checks if the top card is a wild card and prevents other users from choosing color with colorChosen
    if (
      (discardCard.type === "Wild4" || discardCard.type === "Wild") &&
      colorChosen === false
    ) {
      socket.emit("wild_move", {
        roomID: id,
        currPlayerIndex: currIndex,
        isWild: true,
      });
    } else {
      socket.emit("wild_move", {
        roomID: id,
        currPlayerIndex: currIndex,
        isWild: false,
      });
    }
  }, [colorChosen, currIndex, discardCard.type, dispatch, id]);

  return (
    <div ref={drop}>
      <img
        draggable="false"
        className={classes.img}
        src={discardCard.src}
        alt="uno card"
      />
    </div>
  );
}

export default DiscardPile;
