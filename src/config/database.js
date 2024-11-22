import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: console.log, // Enable logging for development (or customize as needed)
    pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0,  // Minimum number of connections in the pool
        acquire: 30000, // Maximum time, in milliseconds, Sequelize will try to connect before throwing an error
        idle: 30000 // Maximum time, in milliseconds, a connection can be idle before being released
    },
});

export default sequelize;
