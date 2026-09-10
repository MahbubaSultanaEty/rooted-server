import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';

import { connectDB } from './db/connect.js';
import { auth, initAuth } from './lib/auth.js';

import propertiesRouter from './routes/properties.js';
import reviewsRouter from './routes/reviews.js';
import activityRouter from './routes/activity.js';
import recommendationsRouter from './routes/recommendations.js';
import chatRouter from './routes/chat.js';
import usersRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'https://rooted-client.vercel.app',
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Auth is initialised lazily — the proxy will forward calls once ready.
// Register the handler unconditionally; it self-checks at request time.
app.all('/api/auth/*', async (req, res, next) => {
  const resolvedAuth = await initAuth();
  if (!resolvedAuth) {
    return res.status(503).json({ error: 'Auth is not configured (missing MONGODB_URI)' });
  }
  return toNodeHandler(resolvedAuth)(req, res, next);
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/properties', propertiesRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/activity', activityRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/chat', chatRouter);

app.get('/', (_req, res) => {
  res.json({
    name: 'Rooted API',
    status: 'ok',
    health: '/api/health',
    properties: '/api/properties',
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

if (!process.env.VERCEL) {
  Promise.all([connectDB(), initAuth()])
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🌿 Rooted server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ Startup failed:', err.message);
      process.exit(1);
    });
}

export default app;
