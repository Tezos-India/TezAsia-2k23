import express from 'express';
import http from 'http';
import userRoutes from './api/user/user.routes';
import { setupSocketIO } from './config/socketio';

const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
const app = express();
const server = http.createServer(app);

// Setup Socket.IO
setupSocketIO(server);

// Middleware
=======
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  // Add any other CORS-related configurations here if needed
};


const prisma = new PrismaClient();
const app = express();
const port = 5001;

app.use(cors());
>>>>>>> a59bd1b (basic ui)
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
