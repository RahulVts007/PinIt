import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import dotenv from 'dotenv';
import 'express-async-errors';
import sequelize from './config/sequelize.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalLimiter, apiLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';
import organizationRoutes from './routes/organizationRoutes.js';
import postRoutes from './routes/postRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============ SECURITY MIDDLEWARE ============
// Helmet - Set security HTTP headers
app.use(helmet());

// HPP - Prevent Parameter Pollution
app.use(hpp());

// Compression - Compress responses
app.use(compression());

// CORS - Cross-Origin Resource Sharing
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'http://localhost:3000'
    : 'http://localhost:5173',
  credentials: true,
}));

// Rate Limiting - General rate limiter
app.use('/api/', generalLimiter);

// ============ BODY PARSING MIDDLEWARE ============
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ============ ROUTES ============
app.use('/api/auth', authRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✓ Database connection established');

    // Sync database schema
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✓ Database schema synchronized');

    const server = app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('✓ Security: Helmet, Rate Limiting, HPP enabled');
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('✗ Uncaught Exception:', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('✗ Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('✓ SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('✓ Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
