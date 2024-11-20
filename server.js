import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import db from './models/index.js';
import { storeMessage } from './controllers/messageController.js';

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', async (data) => {
    const storedMessage = await storeMessage(data); // Store the message in the database
    io.emit('message', storedMessage); // Broadcast the stored message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Sync database and start server
db.sequelize.sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error starting server:', err);
  });
