import { sequelize } from "../models/index.js";

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Warning: Deletes all data and recreates tables
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();
