const ChatConnection = require("./ChatConnection");
const GameConnection = require("./GameConnection");

function connectionHandler(io) {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    new GameConnection(io, socket);
    new ChatConnection(io, socket);
  });
}
module.exports = connectionHandler;
