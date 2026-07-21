import 'dotenv/config';
import mongoose from 'mongoose';
import { Property } from './models/Property.js';

const PROPERTY_TYPES = ['apartment', 'house', 'villa', 'office', 'plot', 'shop'];
const CITIES = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal'];
const LISTING_TYPES = ['rent', 'sale'];
const IMAGES = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  'https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?w=600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
  'https://images.unsplash.com/photo-1604014237800-1c9102c19b4a?w=600&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
];

const MOCK_PROPERTIES = [];

// Helper to get random item
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
// Helper to get random number between min and max
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate 25 unique properties
for (let i = 1; i <= 25; i++) {
  const propertyType = getRandom(PROPERTY_TYPES);
  const listingType = getRandom(LISTING_TYPES);
  const city = getRandom(CITIES);
  
  let price, priceUnit, bedrooms;
  
  if (propertyType === 'plot' || propertyType === 'shop' || propertyType === 'office') {
    bedrooms = 0;
  } else {
    bedrooms = getRandomInt(1, 5);
  }

  if (listingType === 'rent') {
    price = getRandomInt(10, 100) * 1000;
    priceUnit = 'per_month';
  } else {
    price = getRandomInt(50, 500) * 100000;
    priceUnit = 'total';
  }

  MOCK_PROPERTIES.push({
    title: `${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} in ${city} - Unit ${i}`,
    slug: `${propertyType}-in-${city.toLowerCase()}-unit-${i}`,
    shortDescription: `A beautiful ${propertyType} available for ${listingType} in ${city}.`,
    description: `This spacious ${propertyType} is perfect for anyone looking to settle down or start a business in the vibrant city of ${city}. It comes with modern amenities and a great location.`,
    price,
    priceUnit,
    listingType,
    propertyType,
    location: { 
      address: `Road ${getRandomInt(1, 20)}, Sector ${getRandomInt(1, 14)}`, 
      area: 'Central', 
      city, 
      coordinates: { type: 'Point', coordinates: [90.0 + Math.random(), 23.0 + Math.random()] } 
    },
    specs: { bedrooms, size: getRandomInt(500, 5000) },
    images: [getRandom(IMAGES)],
    listedBy: new mongoose.Types.ObjectId(),
    createdAt: new Date(Date.now() - getRandomInt(0, 30) * 24 * 60 * 60 * 1000) // Random dates within last 30 days for sorting
  });
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Property.deleteMany({});
    console.log('Cleared existing properties');
    
    await Property.insertMany(MOCK_PROPERTIES);
    console.log(`Successfully seeded ${MOCK_PROPERTIES.length} properties`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
