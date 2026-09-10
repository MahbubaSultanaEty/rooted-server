import app from '../server.js';
import { connectDB } from '../db/connect.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error('[Vercel] MongoDB connection failed:', err.message);
    return res.status(503).json({ error: 'Database unavailable', detail: err.message });
  }

  return app(req, res);
}
