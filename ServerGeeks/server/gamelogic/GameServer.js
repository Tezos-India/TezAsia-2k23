const { v4 } = require("uuid");
const { shuffle } = require("./utils/utils");

class GameServer {
  constructor({ room, maxPlayers, password, publicGameCheck, gamestate, stakeAmt }) {
    this.roomID = v4().substring(0, 16);
    this.roomName = room;
    this.maxPlayers = Number(maxPlayers);
    this.password = password;
    this.publicGameCheck = publicGameCheck;
    this.gamestate = gamestate;
    this.stakeAmt = Number(stakeAmt);
  }

  joinRoom({ socket, name, password }) {
    const players = this.gamestate.players;
    if (players.length >= this.maxPlayers) {
      return { status: "failure", error: "room is full." };
    } else if (
      (this.publicGameCheck === "public" || this.password === password) &&
      !this.gamestate.gameStart
    ) {
      const player = this.createPlayer({ id: socket.id, name: name });

      players.push(player);

      socket.join(this.roomID);

      return { status: "success", error: "none" };
    } else {
      const error = this.gamestate.gameStart
        ? "uno game has already started"
        : "password not correct.";

      return { status: "failure", error: error };
    }
  }

  leaveRoom(socket) {
    //remove the leaving player's cards and add to deck

    if (this.gamestate.gameStart) {
      const player = this.gamestate.players.find(
        (player) => player.id === socket.id
      );

      this.gamestate.deck.push(...player.hand);

      socket.to(this.roomID).emit("update_deck", player.hand);
    }
    this.gamestate.players = this.gamestate.players.filter(
      (player) => player.id !== socket.id
    );

    this.gamestate.switchPlayers("leave_game");

    socket.leave(this.roomID);
  }

  startGame() {
    this.gamestate.gameStart = true;
    let randomId;
    let deck = this.gamestate.getDeck();

    while (true) {
      randomId = Math.floor(Math.random() * deck.length);

      if (
        deck[randomId].type === "Wild" ||
        deck[randomId].type === "Wild4" ||
        deck[randomId].type === "draw" ||
        deck[randomId].type === "reverse" ||
        deck[randomId].type === "skip"
      ) {
        continue;
      } else {
        break;
      }
    }

    let topCard = deck.splice(randomId, 1)[0];
    this.gamestate.setTopCard(topCard);

    this.gamestate.players.forEach((player) => {
      for (let i = 0; i < 7; i++) {
        player.hand.push(deck.pop());
      }
    });

    this.gamestate.players = shuffle(this.gamestate.players);

    this.gamestate.deck = [...deck];

    return {
      roomName: this.roomName,
      deck: deck,
      players: this.gamestate.players,
      topCard: topCard,
    };
  }
  //remove player from room

  createPlayer({ id, name }) {
    let avatarID = this.gamestate.getAvatarID();
    return {
      id: id,
      name: name,
      hand: [],
      avatarID: avatarID,
    };
  }
}
module.exports = GameServer;
