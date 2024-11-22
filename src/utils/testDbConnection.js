import sequelize from "../config/database.js";

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();
