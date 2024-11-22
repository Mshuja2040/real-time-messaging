import { Message } from "../models/index.js";

const chatHandlers = (io, socket) => {
  // Handle joining a chat room
  socket.on("join_chat", (chat_id) => {
    console.log(`Socket ${socket.id} joined chat room ${chat_id}`);
    socket.join(chat_id);
  });

  // Handle sending a message
  socket.on("send_message", async (data) => {
    try {
      const { chat_id, sender_id, content, type } = data;

      // Save the message in the database
      const message = await Message.create({
        chat_id,
        sender_id,
        content,
        type,
      });

      // Broadcast the message to all users in the chat room
      console.log("send_message event received:", data);
      io.to(chat_id).emit("new_message", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Handle typing indicators
  socket.on("typing", (data) => {
    const { chat_id, user_id } = data;

    // Broadcast typing status to others in the chat room
    console.log("typing event received:", data);
    socket.to(chat_id).emit("user_typing", { user_id });
  });

  // Handle message read receipts
  socket.on("read_message", async (data) => {
    try {
      const { message_id, user_id } = data;

      // Update the message's read status in the database
      const message = await Message.findByPk(message_id);
      if (message) {
        message.is_read = true;
        await message.save();

        // Notify other users in the chat room
        console.log("read_message event received:", data);
        io.to(message.chat_id).emit("message_read", {
          message_id: message.id,
          user_id,
        });
      }
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  });
};

export default chatHandlers;
