import { Server as ServerSocket, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { generateId } from "../chess/helpers";
import Game from "../chess/Game";
import initializeTezos from "./organizer";
let games: Game[] = [];
let waitlistGameId: string | null = null;
interface User {
  username: string;
  inGame: boolean;
}
let dev_users: { [playerId: string]: User } = {};
export const setupSocketIO = (server: HttpServer) => {
  // const io = new ServerSocket(server);
  const io = new ServerSocket(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    const playerId: string = socket.handshake.query.id as string;
    let currentGameId: string | null = null;
    let username: string;

    socket.on("username", (_username) => {
      console.log("socket username", _username);
      if (!_username) return;
      username = _username;
      dev_users[playerId] = { username: _username, inGame: false };
    });

    console.log("Client connected: " + playerId);

    function createGame(options?: { id: string; isPublic?: boolean }): string {
      let id = (options && options.id) || generateId();
      let game = new Game(options && options.isPublic);
      games.push(game);
      socket.emit("game id", game.id);
      return game.id;
    }

    function joinGame(gameId: string, username: string): boolean {
      if (!username) username = "Guest";
      let gameIndex = games.findIndex((g) => g.id === gameId);
      if (gameIndex === -1) {
        socket.emit("leave");
        return false;
      }
      let game = games[gameIndex];
      socket.join(game.id);
      let joined = game.join(playerId, username);
      if (!joined) {
        socket.emit("leave");
        return false;
      }
      currentGameId = game.id;
      game.onGameOver = function (data) {
        console.log("the game is over");
        if (currentGameId) {
          io.in(currentGameId).emit("gameover", data);
        }
      };


      socket.emit("game", game.data());
      if (game.players.length === 2) {
        game.start();
        if (currentGameId) {
          io.in(currentGameId).emit("players", game.players);
        }
      }
      return true;
    }

    async function leave(): Promise<void> {
      let gameIndex = games.findIndex((g) => g.id === currentGameId);
      if (gameIndex === -1) return;
      let game = games[gameIndex];
      let pIndex = game.players.findIndex((p) => p.id === playerId);
       const { wingame } = await initializeTezos();
    
          if(pIndex==1){
            pIndex=0;
            const winnerString = pIndex.toString();
            const result = await wingame(currentGameId, winnerString);
          }
          else{
            pIndex=1;
            const winnerString = pIndex.toString();
            const result = await wingame(currentGameId, winnerString);
          }
      
      game.active[pIndex] = false;
      games = games.filter((g) => g.active.find((a) => !!a));
      if (currentGameId === waitlistGameId) {
        waitlistGameId = null;
      }
    
      // Leave all rooms
      await Promise.all([...socket.rooms].map(async (room) => {
        if (room !== socket.id) {
          await socket.leave(room);
        }
      }));
    
      if (currentGameId) {
        socket.broadcast.to(currentGameId).emit("player left");
      }
      currentGameId = null;
    }
    socket.on("create", (data) => {
      console.log("socket create");
      createGame(data);
    });

    socket.on("join game", (id, username) => {
      console.log("socket join");
      joinGame(id, username);
    });

    socket.on("waitlist", (_username) => {
      if (waitlistGameId) {
        socket.emit("ramdom id", waitlistGameId);
        console.log("User " + _username + " joined game as black");
        waitlistGameId = null;
      } else {
        console.log("User " + _username + " joined game as white");
        waitlistGameId = createGame({ id: generateId(), isPublic: true });
      }
    });

    socket.on("gameover", async (data) => {
      const { wingame,drawgame } = await initializeTezos();
      const gameIndex = games.findIndex((g) => g.id === currentGameId);
      if (gameIndex === -1) return;
      const game = games[gameIndex];
      const gameId = game.id;
      const gameId_ = gameId.toString()
      if (game.gameOver !== null) {

        if(game.gameOver.winner === undefined){
          const result = await drawgame(gameId_);
                  }

        else{  
          const winner = game.gameOver.winner;
          const winnerString = winner.toString();
          
          const result = await wingame(gameId_, winnerString);
          if (result) {
            console.log("Wingame transaction successful!");
          } else {
            console.log("Wingame transaction failed!");
          }
        }}
      game.setGameOver(data);
    });
    socket.on("move", (move, sentAt) => {
      const gameIndex = games.findIndex((g) => g.id === currentGameId);
      if (gameIndex === -1) return;
      const game = games[gameIndex];
      game.move(move, sentAt);
      socket.broadcast.to(currentGameId!).emit("move", move, Date.now());
      io.in(currentGameId!).emit("time-left", game.timer.time, Date.now());
    });

    socket.on("message", (data) => {
      socket.broadcast.to(currentGameId!).emit("message", data);
    });

    socket.on("rematch", (gameId) => {
      const gameIndex = games.findIndex((g) => g.id === currentGameId);
      if (gameIndex === -1) return;
      const game = games[gameIndex];
      if (game.rematch) {
        game.rematch = null;
        game.runRematch();
        game.start();
        io.in(gameId).emit("game", game.data());
      } else {
        game.rematch = playerId;
      }
    });

    socket.on("leave", () => {
      leave();
    });

    socket.on("disconnect", () => {
      console.log("socket disconnect");
      console.log("Client disconnected: " + playerId, username);
      leave();
      delete dev_users[playerId];
    });
  });

  setInterval(() => {
    io.emit("get-users", Object.values(dev_users));
    io.emit("get-games", games.filter((g) => g.players.length === 2).length);
  }, 200);
};

