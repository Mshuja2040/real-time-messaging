import ChatService from "../services/ChatService.js";

class ChatController {
  static async create(req, res) {
    try {
      const { name } = req.body;

      // Input validation
      if (!name) {
        return res.status(400).json({ error: "Chat name is required" });
      }

      const chat = await ChatService.createChat({
        name,
        user_id: req.user.id,
      });
      res.status(201).json({ message: "Chat created successfully", chat });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getMessages(req, res) {
    try {
      const { id } = req.params;
      const { limit = 10, offset = 0 } = req.query;

      // Validate chat ID
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid chat ID" });
      }

      const messages = await ChatService.getChatMessages(id, {
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
      res.status(200).json({ messages });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  static async sendMessage(req, res) {
    try {
      const { chat_id, content, type = "text" } = req.body;

      if (!chat_id || !content) {
        return res.status(400).json({ error: "Chat ID and content are required" });
      }

      const message = await ChatService.sendMessage({
        chat_id,
        sender_id: req.user.id,
        content,
        type,
      });
      res.status(201).json({ message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async updateMessageStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!id || !status) {
        return res.status(400).json({ error: "Message ID and status are required" });
      }

      const updatedMessage = await ChatService.updateMessageStatus(id, status);
      res.status(200).json({ message: "Message status updated", updatedMessage });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default ChatController;
