import db from '../models/index.js';

const { Message } = db;

export const storeMessage = async (data) => {
  try {
    const newMessage = await Message.create({
      content: data.content,
      senderId: data.senderId,
      receiverId: data.receiverId,
    });
    return newMessage;
  } catch (error) {
    console.error('Error storing message:', error.message);
  }
};
