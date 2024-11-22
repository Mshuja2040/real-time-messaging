import sequelize from "../config/database.js";
import User from "./User.js";
import Chat from "./Chat.js";
import Message from "./Message.js";

// Define relationships
User.hasMany(Chat, { foreignKey: "created_by", onDelete: "CASCADE" });
Chat.belongsTo(User, { foreignKey: "created_by" });

Chat.hasMany(Message, { foreignKey: "chat_id", onDelete: "CASCADE" });
Message.belongsTo(Chat, { foreignKey: "chat_id" });

User.hasMany(Message, { foreignKey: "sender_id", onDelete: "CASCADE" });
Message.belongsTo(User, { foreignKey: "sender_id" });

export { sequelize, User, Chat, Message };
