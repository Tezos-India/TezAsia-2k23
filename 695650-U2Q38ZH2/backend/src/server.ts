import express from "express";
import http from "http";
import userRoutes from "./api/user/user.routes";
import gameRoutes from "./api/gameStats/gameStats.routes";
import { setupSocketIO } from "./config/socketio";
import cors from "cors";
import { mintRook } from "./config/organizer"

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
setupSocketIO(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(gameRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

mintRook("tz1MRhZjNxhRY4qkKX3mPAbkcLpZvGX4R18M")