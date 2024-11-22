import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        customValidator(value) {
          if (this.type === "text" && !value) {
            throw new Error("Text messages must have content");
          }
        },
      },
    },
    type: {
      type: DataTypes.ENUM("text", "image", "video"),
      defaultValue: "text",
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    indexes: [
      {
        fields: ["chat_id"], // Optimize retrieval by chat
      },
      {
        fields: ["sender_id"], // Optimize retrieval by sender
      },
    ],
  }
);

export default Message;
