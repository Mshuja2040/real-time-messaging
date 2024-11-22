import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true, // Optional for group chats
      validate: {
        len: { args: [3, 100], msg: "Chat name must be between 3 and 100 characters" },
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    paranoid: true, // Enable soft deletes
    timestamps: true, // Include createdAt, updatedAt, and deletedAt
    indexes: [
      {
        fields: ["created_by"], // Optimize queries by user
      },
    ],
  }
);

export default Chat;
