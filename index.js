import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import chatRoutes from "./src/routes/chat.js";
import { createServer } from "http";
import { Server } from "socket.io";
import sequelize from "./src/config/database.js";
import chatHandlers from "./src/sockets/chat.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.NODE_ENV === "development" ? "*" : "your-production-url.com" }));

// Routes
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.get("/", (req, res) => res.send('api is running'));


// Initialize HTTP and Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === "development" ? "*" : "your-production-url.com",
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  chatHandlers(io, socket);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Sync Database and Start Server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Server is running on port ${PORT}`);
});
