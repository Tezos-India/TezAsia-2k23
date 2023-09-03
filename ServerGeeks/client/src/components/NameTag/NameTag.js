import { Avatar, Badge } from "@mantine/core";
import { useSelector } from "react-redux";
import { AVATARS } from "../../utils/constants";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, { isCurrentPlayer }) => ({
  badge: {
    paddingLeft: 0,
    height: "50px",
    width: "200px",
    fontSize: "15px",

    "@media (min-width: 180px) and (max-width: 299px)": {
      fontSize: "6px",
      width: "88px",
      height: "30px",
    },

    "@media (min-width: 300px) and (max-width: 576px)": {
      fontSize: "8px",
      width: "100px",
      height: "30px",
    },

    "@media (min-width: 578px) and (max-width: 884px)": {
      fontSize: "9px",
      width: "112px",
      height: "40px",
    },
    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        fontSize: "8px",
        width: "100px",
        height: "30px",
      },
  },
  avatar: {
    border: `${theme.colors.dark[8]} solid 2px`,
    borderRadius: "50%",
    backgroundColor: isCurrentPlayer
      ? `${theme.colors.blue[3]}`
      : `${theme.colors.gray[0]}`,
    width: "45px",
    height: "45px",

    "@media (min-width: 180px) and (max-width: 300px)": {
      width: "5px",
      height: "30px",
    },

    "@media (min-width: 301px) and (max-width: 884px)": {
      width: "15px",
      height: "30px",
    },

    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        width: "5px",
        height: "30px",
      },
  },
  currentPlayerAvatar: {
    border: `${theme.colors.dark[8]} solid 2px`,
    borderRadius: "50%",
    backgroundColor: isCurrentPlayer
      ? `${theme.colors.blue[3]}`
      : `${theme.colors.gray[0]}`,
    width: "80px",
    height: "80px",

    "@media (min-width: 180px) and (max-width: 300px)": {
      width: "20px",
      height: "30px",
    },

    "@media (min-width: 301px) and (max-width: 676px)": {
      width: "50px",
      height: "50px",
    },

    "@media (min-width: 677px) and (max-width: 576px)": {
      width: "50px",
      height: "45px",
    },
    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        width: "50px",
        height: "50px",
      },
  },
}));

function NameTag({ playerName, playerID, id }) {
  const playerList = useSelector((state) => state.game.players);
  const currIndex = useSelector((state) => state.game.currentPlayer);

  let isCurrentPlayer = playerList[currIndex].id === playerID;
  const { classes } = useStyles({ isCurrentPlayer });

  const avatar = (
    <Avatar
      className={classes.avatar}
      alt="Animal Avatar for nametag"
      mr={5}
      src={AVATARS[id]}
    />
  );

  return (
    <div>
      {playerName ? (
        <Badge
          className={classes.badge}
          radius="xl"
          color=""
          leftSection={avatar}
        >
          {playerName}
        </Badge>
      ) : (
        <Avatar
          className={classes.currentPlayerAvatar}
          src={AVATARS[id]}
          alt="Animal Avatar for nametag"
        />
      )}
    </div>
  );
}

export default NameTag;
