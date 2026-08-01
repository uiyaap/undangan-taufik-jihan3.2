import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import rsvpRoutes from './routes/rsvpRoutes.js';
import wishRoutes from './routes/wishRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiter (Mencegah Spam Submission)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Menit
  max: 100, // Maksimal 100 request per IP
  message: { error: 'Terlalu banyak permintaan dari IP ini. Silakan coba lagi nanti.' }
});

app.use('/api/', apiLimiter);
app.use(express.json());

// API Routes
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/wishes', wishRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Terjadi kesalahan pada server backend.' });
});

export default app;