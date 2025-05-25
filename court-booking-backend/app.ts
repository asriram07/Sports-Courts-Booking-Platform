import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth';
import bookingRoutes from './routes/bookings';
import courtRoutes from './routes/courts';
import profileRoutes from './routes/profile';
import paymentRoutes from './routes/payment';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Secure HTTP headers
app.use(helmet());

// CORS setup
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Body and cookie parsing
app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/payment', paymentRoutes);

// Global error handler
app.use(errorHandler);

export default app;
