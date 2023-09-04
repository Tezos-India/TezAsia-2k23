import { useEffect, useState } from "react";
import { createStyles } from "@mantine/core";
import NameTag from "../NameTag/NameTag";
import Card from "../Card/Card";

const useStyles = createStyles((theme) => ({
  position: {
    position: "absolute",
    top: "95%",
    left: "48%",
    transform: "translateX(-50%) translateY(-50%)",
  },
  area: {
    width: "900px",
    height: "145px",
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

    "@media (min-width: 390px) and (max-width: 599px)": {
      width: "500px",
      height: "125px",
    },
    "@media (min-width: 600px) and (max-width: 820px)": {
      width: "600px",
      height: "125px",
    },

    "@media (min-width: 825px) and (max-width: 1300px)": {
      width: "700px",
      height: "125px",
    },
  },
  text: {
    position: "absolute",
    top: "5%",
    left: "45%",
    color: "black",
  },
  tag: {
    position: "absolute",
    top: "1%",
    left: "85%",
    transform: "translateX(-50%) translateY(-50%) ",
    "@media (min-width: 375px) and (max-width: 676px)": {
      top: "4%",
      left: "85%",
    },
    "@media (min-width: 677px) and (max-width: 1500px)": {
      top: "-14%",
      left: "90%",
    },
  },
  cards: {
    display: "flex",
    position: "absolute",
    top: "20%",
    left: "13%",
  },
  lessCard: {
    marginLeft: "-4rem",

    "&:not(:first-of-type)": {
      marginLeft: "-6.2rem",
    },
    "&:hover": {
      transform: "translateY(-1rem)",
    },

    "@media (min-width: 180px) and (max-width: 299px)": {
      marginLeft: "-0rem",

      "&:not(:first-of-type)": {
        marginLeft: "-3.6rem",
      },
    },

    "@media (min-width: 300px) and (max-width: 389px)": {
      marginLeft: "-1rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5.27rem",
      },
    },

    "@media (min-width: 390px) and (max-width: 575px)": {
      marginLeft: "-0.1rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5rem",
      },
    },

    "@media (min-width: 576px) and (max-width: 700px)": {
      marginLeft: "-2rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.8rem",
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
    "&:hover": {
      transform: "translateY(-2rem)",
    },
    "@media (min-width: 180px) and (max-width: 299px)": {
      marginLeft: "-0rem",

      "&:not(:first-of-type)": {
        marginLeft: "-3.9rem",
      },
    },

    "@media (min-width: 300px) and (max-width: 389px)": {
      marginLeft: "-1rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5.55rem",
      },
    },

    "@media (min-width: 390px) and (max-width: 575px)": {
      marginLeft: "-0rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5.36rem",
      },
      "&:hover": {
        transform: "translateY(-1.5rem)",
      },
    },
    "@media (min-width: 576px) and (max-width: 700px)": {
      marginLeft: "-2.5rem",
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
      marginLeft: "-3.3rem",
      "&:hover": {
        transform: "translateY(-1.5rem)",
      },
    },
  },
}));

function PlayerHand({ player }) {
  const { classes } = useStyles();
  const [cardsLength, setCardLength] = useState(0);

  useEffect(() => {
    setCardLength(player.hand.length);
  }, [player.hand.length]);

  return (
    <div className={classes.position}>
      <div className={classes.area}></div>
      <div className={classes.tag}>
        <NameTag playerID={player.id} id={player.avatarID} />
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
              <Card key={card.id} card={card} playerID={player.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlayerHand;
