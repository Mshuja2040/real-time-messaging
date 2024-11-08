import express from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import db from './models/index.js'; // Import your Sequelize instance
import userRoutes from './routes/userRoutes.js'; // Import user routes
// import messageRoutes from './routes/messageRoutes.js'; // Import message routes

// Load environment variables
dotenvConfig();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/', (res, req) => {
  req.send('API is running!!')
});
// app.use('/api/messages', messageRoutes);

// Test database connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));

export default app;
