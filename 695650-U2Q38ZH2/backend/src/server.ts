import express from 'express';
import http from 'http';
import userRoutes from './api/user/user.routes';
import { setupSocketIO } from './config/socketio';

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
setupSocketIO(server);

// Middleware
app.use(express.json());

// Routes
app.use(userRoutes);

// Home Route
app.get('/', (req, res) => {
  res.send('Hello World!')
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
});
