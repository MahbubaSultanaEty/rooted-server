import mongoose from 'mongoose';
const { Schema } = mongoose;

const recommendationResultSchema = new Schema({
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  score:      { type: Number, min: 0, max: 100, required: true },
  reasoning:  { type: String, required: true },
  rank:       { type: Number, required: true },
}, { _id: false });

const recommendationSchema = new Schema({
  userId:        { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  results:       [recommendationResultSchema],
  generatedAt:   { type: Date, required: true },
  activityCount: { type: Number, default: 0 },
  modelUsed:     { type: String },
  promptVersion: { type: String },
  expiresAt:     { type: Date, required: true, index: { expireAfterSeconds: 0 } },
}, { timestamps: true });

export const Recommendation = mongoose.model('Recommendation', recommendationSchema);
