import mongoose from 'mongoose';
const { Schema } = mongoose;

const preferenceProfileSchema = new Schema({
  preferredTypes:    [String],
  preferredCities:   [String],
  priceRange: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
  },
  bedroomPreference: [Number],
  amenityWeights: {
    parking:    { type: Number, min: 0, max: 1, default: 0 },
    garden:     { type: Number, min: 0, max: 1, default: 0 },
    pool:       { type: Number, min: 0, max: 1, default: 0 },
    gym:        { type: Number, min: 0, max: 1, default: 0 },
    elevator:   { type: Number, min: 0, max: 1, default: 0 },
  },
  lastUpdated: Date,
}, { _id: false });

const userSchema = new Schema({
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String },
  provider:     { type: String, enum: ['local', 'google'], default: 'local' },
  googleId:     { type: String, sparse: true, unique: true },
  avatarUrl:    { type: String },
  role:         { type: String, enum: ['user', 'agent', 'admin'], default: 'user' },
  isVerified:   { type: Boolean, default: false },
  savedProperties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  preferenceProfile: { type: preferenceProfileSchema, default: () => ({}) },
}, { timestamps: true });

// Note: Ensure this matches the collection Better Auth uses for users
export const User = mongoose.model('User', userSchema, 'user');
