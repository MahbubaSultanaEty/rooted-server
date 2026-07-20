import mongoose from 'mongoose';
const { Schema } = mongoose;

const geoJsonSchema = new Schema({
  type:        { type: String, enum: ['Point'], required: true, default: 'Point' },
  coordinates: { type: [Number], required: true }, // [longitude, latitude]
}, { _id: false });

const locationSchema = new Schema({
  address:     { type: String, required: true },
  area:        { type: String },
  city:        { type: String, required: true, index: true },
  division:    { type: String },
  country:     { type: String, default: 'Bangladesh' },
  coordinates: { type: geoJsonSchema },
}, { _id: false });

const specsSchema = new Schema({
  size:          { type: Number },
  bedrooms:      { type: Number, min: 0 },
  bathrooms:     { type: Number, min: 0 },
  floors:        { type: Number },
  floorNumber:   { type: Number },
  parkingSpots:  { type: Number, default: 0 },
  yearBuilt:     { type: Number },
  furnishing:    { type: String, enum: ['furnished', 'semi-furnished', 'unfurnished'] },
  facing:        { type: String, enum: ['north', 'south', 'east', 'west'] },
}, { _id: false });

const amenitiesSchema = new Schema({
  lift:          { type: Boolean, default: false },
  generator:     { type: Boolean, default: false },
  security:      { type: Boolean, default: false },
  cctv:          { type: Boolean, default: false },
  gym:           { type: Boolean, default: false },
  pool:          { type: Boolean, default: false },
  garden:        { type: Boolean, default: false },
  rooftopAccess: { type: Boolean, default: false },
  gasLine:       { type: Boolean, default: false },
  waterSupply:   { type: Boolean, default: false },
  internetReady: { type: Boolean, default: false },
  petFriendly:   { type: Boolean, default: false },
}, { _id: false });

const statsSchema = new Schema({
  views:       { type: Number, default: 0 },
  saves:       { type: Number, default: 0 },
  avgRating:   { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
}, { _id: false });

const propertySchema = new Schema({
  title:            { type: String, required: true, trim: true },
  slug:             { type: String, required: true, unique: true, lowercase: true },
  shortDescription: { type: String, required: true },
  description:      { type: String, required: true },

  listedBy:         { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status:           { type: String, enum: ['active', 'sold', 'rented', 'draft'], default: 'active' },
  listingType:      { type: String, enum: ['sale', 'rent'], required: true },
  propertyType:     { type: String, enum: ['apartment', 'house', 'villa', 'office', 'plot', 'shop'], required: true },

  price:            { type: Number, required: true, min: 0 },
  priceUnit:        { type: String, enum: ['total', 'per_month', 'per_sqft'], default: 'total' },
  isNegotiable:     { type: Boolean, default: false },

  location:         { type: locationSchema, required: true },
  specs:            { type: specsSchema },
  amenities:        { type: amenitiesSchema, default: () => ({}) },

  images:           [{ type: String }],
  videoUrl:         { type: String },

  aiTags:           [{ type: String }],
  aiSummary:        { type: String },

  stats:            { type: statsSchema, default: () => ({}) },
}, { timestamps: true });

propertySchema.index({ 'location.coordinates': '2dsphere' });
propertySchema.index({ status: 1, listingType: 1, propertyType: 1 });
propertySchema.index({ 'location.city': 1, price: 1 });
propertySchema.index({ 'specs.bedrooms': 1 });
propertySchema.index({ 'stats.avgRating': -1, 'stats.views': -1 });
propertySchema.index({ createdAt: -1 });
propertySchema.index({ title: 'text', description: 'text', 'location.area': 'text' });

export const Property = mongoose.model('Property', propertySchema);
