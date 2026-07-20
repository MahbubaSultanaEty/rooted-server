import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';

import { connectDB } from './db/connect.js';
import { auth } from './lib/auth.js';

import propertiesRouter from './routes/properties.js';
import reviewsRouter from './routes/reviews.js';
import activityRouter from './routes/activity.js';
import recommendationsRouter from './routes/recommendations.js';
import chatRouter from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS ──────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true, // required for Better Auth session cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── Better Auth — must be mounted BEFORE express.json() ───────
// Better Auth handles its own body parsing for auth routes
app.all('/api/auth/*splat', toNodeHandler(auth));

// ── Body Parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── API Routes ────────────────────────────────────────────────
app.use('/api/properties', propertiesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/activity', activityRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/chat', chatRouter);

// ── Health Check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 Handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// ── Start ─────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🌿 Rooted server running on http://localhost:${PORT}`);
  });
});
