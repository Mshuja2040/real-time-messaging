import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Username cannot be empty" },
        len: { args: [3, 50], msg: "Username must be between 3 and 50 characters" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password cannot be empty" },
      },
    },
    mfa_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    indexes: [
      {
        fields: ["username", "email"], // Query optimization
        unique: true,
      },
    ],
  }
);

export default User;
