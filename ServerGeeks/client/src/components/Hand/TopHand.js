import React, { useState, useEffect } from "react";

import { createStyles } from "@mantine/core";

import NameTag from "../NameTag/NameTag";
import Card from "../Card/Card";

const useStyles = createStyles((theme) => ({
  position: {
    position: "absolute",
    top: "6.5%",
    left: "48%",
    transform: "translateX(-50%) translateY(-50%) rotate(180deg)",

    "@media screen and (orientation: portrait) and (max-device-width: 930px)": {
      top: "4%",
    },
  },
  area: {
    width: "900px",
    height: "125px",
    backgroundColor: `${theme.colors.red[4]}`,
    borderTopLeftRadius: "400px",
    borderTopRightRadius: "400px",
    borderBottom: "0",
    boxSizing: "border-box",
    "@media (min-width: 180px) and (max-width: 299px)": {
      width: "350px",
      height: "100px",
    },

    "@media (min-width: 300px) and (max-width: 389px)": {
      width: "400px",
      height: "125px",
    },

    "@media (min-width: 390px) and (max-width: 676px)": {
      width: "500px",
      height: "125px",
    },
    "@media (min-width: 677px) and (max-width: 820px)": {
      width: "600px",
      height: "125px",
    },

    "@media (min-width: 820px) and (max-width: 1300px)": {
      width: "700px",
      height: "125px",
    },
  },
  text: {
    position: "absolute",
    top: "5%",
    left: "45%",
    color: "black",
    transform: "rotate(180deg)",
  },
  tag: {
    position: "absolute",
    top: "47%",
    left: "108%",
    transform: "translateX(-50%) translateY(-50%) rotate(180deg)",
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      top: "5%",
      left: "78.5%",
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      top: "1%",
      left: "78.5%",
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      top: "1%",
      left: "79.5%",
    },
  },
  cards: {
    display: "flex",
    position: "absolute",
    top: "20%",
    left: "13%",
  },
  lessCard: {
    marginLeft: "-3rem",

    "&:not(:first-of-type)": {
      marginLeft: "-6.2rem",
    },

    "@media (min-width: 180px) and (max-width: 299px)": {
      marginLeft: "-0rem",

      "&:not(:first-of-type)": {
        marginLeft: "-3.6rem",
      },
    },

    "@media (min-width: 300px) and (max-width: 389px)": {
      marginLeft: "-0.6rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5.27rem",
      },
    },

    "@media (min-width: 390px) and (max-width: 575px)": {
      marginLeft: "-1rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5rem",
      },
    },
    "@media (min-width: 576px) and (max-width: 700px)": {
      marginLeft: "-1.5rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.9rem",
      },
    },

    "@media (min-width: 701px) and (max-width: 819px)": {
      marginLeft: "-2rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.5rem",
      },
    },
    "@media (min-width: 820px) and (max-width: 1199px)": {
      marginLeft: "-3rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7rem",
      },
    },
    "@media (min-width: 1200px) and (max-width: 1300px)": {
      marginLeft: "-3rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7rem",
      },
    },
  },

  moreCard: {
    marginLeft: "-4rem",
    "&:not(:first-of-type)": {
      marginLeft: "-7.6rem",
    },

    "@media (min-width: 180px) and (max-width: 299px)": {
      marginLeft: "-0rem",

      "&:not(:first-of-type)": {
        marginLeft: "-3.9rem",
      },
    },

    "@media (min-width: 300px) and (max-width: 389px)": {
      marginLeft: "-0.3rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5.6rem",
      },
    },

    "@media (min-width: 390px) and (max-width: 575px)": {
      marginLeft: "-1rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5.36rem",
      },
    },

    "@media (min-width: 576px) and (max-width: 700px)": {
      marginLeft: "-1rem",
      "&:not(:first-of-type)": {
        marginLeft: "-8rem",
      },
    },

    "@media (min-width: 701px) and (max-width: 819px)": {
      marginLeft: "-2rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.9rem",
      },
    },
    "@media (min-width: 820px) and (max-width: 1199px)": {
      marginLeft: "-3rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.77rem",
      },
    },
    "@media (min-width: 1200px) and (max-width: 1300px)": {
      marginLeft: "-4.5rem",
    },
  },
}));

function TopHand({ player }) {
  const { classes } = useStyles();
  const [cardsLength, setCardLength] = useState(0);

  useEffect(() => {
    setCardLength(player.hand.length);
  }, [player.hand.length]);

  return (
    <div className={classes.position}>
      <div className={classes.area}></div>
      <div className={classes.tag}>
        <NameTag
          playerName={player.name}
          playerID={player.id}
          id={player.avatarID}
        />
      </div>
      <div className={classes.cards}>
        {player.hand.map((card, index) => {
          return (
            <div
              key={index}
              className={
                cardsLength >= 16 ? classes.moreCard : classes.lessCard
              }
            >
              <Card
                key={card.id}
                card={card}
                playerID={player.id}
                back={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopHand;
