import express from "express";
import ChatController from "../controllers/ChatController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// Create a chat room
router.post("/create", authMiddleware, ChatController.create);

// Retrieve messages for a specific chat room
router.get("/:id/messages", authMiddleware, ChatController.getMessages);

// Update message status
router.patch(
  "/message/:id/status",
  authMiddleware,
  ChatController.updateMessageStatus
);

// Send a message
router.post("/message/send", authMiddleware, ChatController.sendMessage);

export default router;
