const GameState = require("../gamelogic/GameState");
const GameServer = require("../gamelogic/GameServer");
const {
  addGame,
  getGame,
  getAllGames,
  deleteGame,
} = require("../gamelogic/GameData");

class GameConnection {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;

    socket.on("create_game", (roomInfo) => this.createGame(roomInfo));

    socket.on("join_room", (roomInfo) => this.joinGame(roomInfo));

    socket.on("get_public_games", (callback) =>
      this.getAllPublicGames(callback)
    );

    socket.on("get_players_in_wait", (roomID, callback) =>
      this.getPlayersInWaitRoom(roomID, callback)
    );

    socket.on("move", (moveInfo) => this.Move(moveInfo));

    socket.on("draw", (drawInfo) => this.Draw(drawInfo));

    socket.on("wild_move", (wildInfo) => this.updateWildMove(wildInfo));

    socket.on("change_current_color", (colorInfo) =>
      this.updateCurrentColor(colorInfo)
    );

    socket.on("wait_room_leave", (roomID) => this.leaveWaitRoom(roomID));

    socket.on("leave_game_room", (roomID) => this.leaveGameRoom(roomID));

    //last player to leave the room before a player has won
    socket.on("leave_game", (roomID) => this.removeLastPlayerInGame(roomID));

    socket.on("disconnect", () => this.disconnect());
  }

  createGame({ room, name, maxPlayers, publicGameCheck, password }) {
    //create gamestate to keep state of uno game

    const gamestate = new GameState();
    const newRoomInfo = {
      room: room,
      maxPlayers: maxPlayers,
      password: password,
      publicGameCheck: publicGameCheck,
      gamestate: gamestate,
    };

    //create new server connection
    const newServer = new GameServer(newRoomInfo);

    const { status, error } = newServer.joinRoom({
      socket: this.socket,
      name: name,
      password: password,
    });

    if (status === "success") {
      addGame(newServer);
      if (publicGameCheck === "public") {
        this.socket.emit("public_game_created", newServer.roomID);
      } else {
        this.socket.emit("private_game_created", newServer.roomID);
      }
    } else {
      //display error to client
      this.socket.emit("error_join", error);
    }
  }

  joinGame({ room, name, password }) {
    const gameServer = getGame(room);

    if (gameServer) {
      const { status, error } = gameServer.joinRoom({
        socket: this.socket,
        name: name,
        password: password,
      });

      if (status === "success") {
        this.socket.emit("join_success", gameServer.roomID);
        this.socket
          .to(gameServer.roomID)
          .emit("player_join", gameServer.gamestate.players);

        if (gameServer.maxPlayers === gameServer.gamestate.players.length) {
          //set up start game
          const startGameInfo = gameServer.startGame();

          this.io.in(gameServer.roomID).emit("start_game", {
            info: startGameInfo,
            id: room,
          });
        }

        if (gameServer.publicGameCheck === "public") {
          this.socket.broadcast.emit("remove_room", room);
        }
      } else {
        this.socket.emit("join_error", error);
      }
    } else {
      this.socket.emit("join_error", "game room does not exist.");
    }
  }

  getAllPublicGames(callback) {
    const publicGames = [];
    const games = getAllGames();
    games.forEach((value, key) => {
      const game = {
        roomID: key,
        roomName: value.roomName,
        maxPlayers: value.maxPlayers,
        playersLength: value.gamestate.players.length,
      };
      if (value.publicGameCheck === "public" && !value.gamestate.gameStart) {
        publicGames.push(game);
      }
    });
    callback(publicGames);
  }

  getPlayersInWaitRoom(roomID, callback) {
    //when either a player creates a game and or joins the waiting room for the first time
    const server = getGame(roomID);
    if (server) {
      callback({
        roomName: server.roomName,
        maxPlayers: server.maxPlayers,
        players: server.gamestate.players,
      });
    }
  }

  //when either player tries to play a card in their hand.
  //Also checks for if the current player has played their last card( has won game)
  Move({ roomID, card, player }) {
    const server = getGame(roomID);
    if (server) {
      const gamestate = server.gamestate;

      const moveInfo = {
        io: this.io,
        roomID: roomID,
        playerID: player,
        cardPlayed: card,
      };

      const updatedInfo = gamestate.Move(moveInfo);

      if (updatedInfo.status === "success") {
        this.io.in(roomID).emit("update_move", updatedInfo);

        if (gamestate.Win(player)) {
          gamestate.isWin = true;
          const score = gamestate.getWinnerScore();

          this.io.in(roomID).emit("winner", { playerID: player, score: score });
        }
      }
    }
  }

  Draw({ roomID, playerID }) {
    const server = getGame(roomID);
    if (server) {
      const gamestate = server.gamestate;

      const gameInfo = {
        io: this.io,
        roomID: roomID,
        playerID: playerID,
      };

      const drawInfo = gamestate.Draw(gameInfo);
      if (drawInfo.status === "success") {
        this.io.in(roomID).emit("update_draw_move", drawInfo);
      }
    }
  }

  //checks whether a wild card was played or not (if it is, color picker is displayed to current player)
  updateWildMove({ roomID, currPlayerIndex, isWild }) {
    const server = getGame(roomID);

    if (server) {
      const gamestate = server.gamestate;

      const currPlayerID = gamestate.players[currPlayerIndex].id;
      gamestate.isWild = isWild;

      if (isWild) {
        this.io.to(currPlayerID).emit("update_wild_move", isWild);
      } else {
        this.io.in(roomID).emit("update_wild_move", isWild);
      }
    }
  }

  //when wild card is played. current player picks new color
  //current color and current and next player is updated
  updateCurrentColor({ roomID, color }) {
    const server = getGame(roomID);

    if (server) {
      const gamestate = server.gamestate;

      const { updatedCurrentPlayerIndex, nextPlayerIndex } =
        gamestate.WildMove(color);

      this.io.in(roomID).emit("update_current_color", {
        color: color,
        updatedCurrentPlayerIndex: updatedCurrentPlayerIndex,
        nextPlayerIndex: nextPlayerIndex,
      });
    }
  }

  //when players leave the wait room before the game has started
  leaveWaitRoom(roomID) {
    const server = getGame(roomID);

    if (server) {
      if (server.gamestate.players.length === 1) {
        this.socket.leave(roomID);
        deleteGame(roomID);
      } else {
        const player = server.gamestate.players.find(
          (player) => player.id === this.socket.id
        );

        if (player) {
          const message = `Player: ${player.name} has left the game lobby.`;
          server.leaveRoom(this.socket);
          this.socket.to(roomID).emit("wait_room_user_leave", {
            message: message,
            newPlayersList: server.gamestate.players,
          });
        }
      }
    }
  }

  //player leaves game with more than 2 players or when game is won(removed from game and room)
  //updates current players in game
  leaveGameRoom(roomID) {
    const server = getGame(roomID);

    if (server) {
      const player = server.gamestate.players.find(
        (player) => player.id === this.socket.id
      );

      if (player) {
        //when a player has won the game and rest of players have left the room
        if (server.gamestate.players.length == 1) {
          server.leaveRoom(this.socket);
          deleteGame(roomID);
        } else {
          if (server.gamestate.players.length == 2 && !server.gamestate.isWin) {
            this.socket
              .to(roomID)
              .emit(
                "game_end_error",
                "UNO Game has ended. You are the last player and have no other players to play with :("
              );
          }

          const message = `Player: ${player.name} has left the game.`;
          server.leaveRoom(this.socket);

          this.socket.to(roomID).emit("game_room_user_leave", {
            message: message,
            playerID: player.id,
            currentPlayerIndex: server.gamestate.currentPlayerIndex,
            nextPlayerIndex: server.gamestate.nextPlayerIndex,
          });
        }
      }
    }
  }

  //last player to leave the room before a player has won
  removeLastPlayerInGame(roomID) {
    const server = getGame(roomID);

    if (server) {
      this.socket.leave(roomID);
      deleteGame(roomID);
    }
  }

  disconnect() {
    console.log("User Disconnected", this.socket.id);
  }
}

module.exports = GameConnection;
