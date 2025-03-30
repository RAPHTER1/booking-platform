import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { httpLogger } from './middlewares/loggerMiddleware.js';

const app = express();

// Logger
app.use(httpLogger());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;