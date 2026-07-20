import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  userId:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating:     { type: Number, required: true, min: 1, max: 5 },
  title:      { type: String, trim: true },
  body:       { type: String, required: true },
  isVisible:  { type: Boolean, default: true },
}, { timestamps: true });

reviewSchema.index({ propertyId: 1, userId: 1 }, { unique: true });
reviewSchema.index({ propertyId: 1 });
reviewSchema.index({ userId: 1 });

export const Review = mongoose.model('Review', reviewSchema);
