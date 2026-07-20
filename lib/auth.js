import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

// Better Auth uses the native MongoDB driver (not Mongoose)
// Our Mongoose models handle app data; Better Auth handles auth collections
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  // ── Base URL ────────────────────────────────────────────────
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
  secret: process.env.BETTER_AUTH_SECRET,

  // ── Email & Password ────────────────────────────────────────
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  // ── Google OAuth ────────────────────────────────────────────
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  // ── Additional user fields stored in Better Auth's user table
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        input: false, // not settable by user on register
      },
      avatarUrl: {
        type: 'string',
        required: false,
      },
    },
  },

  // ── Session config ──────────────────────────────────────────
  session: {
    expiresIn: 60 * 60 * 24 * 7,        // 7 days
    updateAge: 60 * 60 * 24,             // refresh if older than 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,                    // 5 min client-side cache
    },
  },

  // ── Trusted origins (for CORS during auth flows) ────────────
  trustedOrigins: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],
});
