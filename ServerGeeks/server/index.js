const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {
  Server
} = require("socket.io");
const connectionHandler = require("./Connections/ConnectionHandler");

app.use(cors());
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const io = new Server(server, {
  cors: {
    // origin: "https://uno-react.netlify.app",
    methods: ["GET", "POST"],
  },
});

connectionHandler(io);

server.listen(3002, () => {
  console.log("SERVER RUNNING");
});