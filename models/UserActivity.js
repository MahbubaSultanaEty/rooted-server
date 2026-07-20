import mongoose from 'mongoose';
const { Schema } = mongoose;

const ACTIVITY_WEIGHTS = { view: 1, search: 1, save: 3, unsave: -1, contact: 5, share: 4 };

const userActivitySchema = new Schema({
  userId:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventType:  {
    type: String,
    enum: ['view', 'save', 'unsave', 'search', 'contact', 'share'],
    required: true,
  },
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property' },

  searchQuery: { type: Schema.Types.Mixed },

  weight: {
    type: Number,
    required: true,
    enum: Object.values(ACTIVITY_WEIGHTS),
  },

  sessionId: { type: String },

  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 90 },
}, {
  timestamps: false
});

userActivitySchema.index({ userId: 1, createdAt: -1 });
userActivitySchema.index({ propertyId: 1 });
userActivitySchema.index({ eventType: 1 });

export const UserActivity = mongoose.model('UserActivity', userActivitySchema);
