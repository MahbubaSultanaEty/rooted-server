import mongoose from 'mongoose';

const globalForMongoose = globalThis;

if (!globalForMongoose._mongoose) {
  globalForMongoose._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const cached = globalForMongoose._mongoose;

  if (cached.conn) return cached.conn;

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log('✅ MongoDB connected');
  return cached.conn;
}
