import { Chat, User, Message } from "../models/index.js";



class ChatService {
  static async createChat(data) {
    const chat = await Chat.create({
      name: data.name || null,
      created_by: data.user_id,
    });
    return chat;
  }

  static async getChatMessages(chat_id, { limit, offset }) {
    const chat = await Chat.findByPk(chat_id, {
      include: [
        {
          model: Message,
          include: [{ model: User, attributes: ["username"] }],
          limit,
          offset,
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    if (!chat) throw new Error("Chat not found");
    return chat.Messages;
  }

  static async sendMessage(data) {
    const message = await Message.create({
      chat_id: data.chat_id,
      sender_id: data.sender_id,
      content: data.content,
      type: data.type,
    });

    return message;
  }

  static async updateMessageStatus(message_id, status) {
    const message = await Message.findByPk(message_id);
  
    if (!message) {
      throw new Error("Message not found");
    }
  
    if (status === "read") {
      message.is_read = true;
    }
  
    await message.save();
    return message;
  }
  
}

export default ChatService;
