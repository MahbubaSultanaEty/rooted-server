import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const globalForMongo = globalThis;

async function getDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
  }

  if (!globalForMongo._authMongoClient) {
    globalForMongo._authMongoClient = new MongoClient(process.env.MONGODB_URI);
  }

  const client = globalForMongo._authMongoClient;
  await client.connect();
  return client.db();
}

const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

export const auth = process.env.MONGODB_URI
  ? betterAuth({
      database: mongodbAdapter(await getDb()),

      baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
      secret: process.env.BETTER_AUTH_SECRET || 'dev-only-change-me-min-32-characters!',

      emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
      },

      socialProviders,

      user: {
        additionalFields: {
          role: {
            type: 'string',
            defaultValue: 'user',
            input: false,
          },
          avatarUrl: {
            type: 'string',
            required: false,
          },
        },
      },

      session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
          enabled: true,
          maxAge: 60 * 5,
        },
      },

      trustedOrigins: [
        frontendUrl,
        'http://localhost:3000',
        'https://rooted-client.vercel.app',
      ],
    })
  : null;
