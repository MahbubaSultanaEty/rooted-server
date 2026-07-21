import 'dotenv/config';
import mongoose from 'mongoose';
import { Property } from './models/Property.js';

const MOCK_PROPERTIES = [
  {
    title: 'Sunny 2-Bed with Lake View', slug: 'sunny-2-bed-lake-view',
    shortDescription: 'A beautifully designed apartment overlooking Gulshan Lake with modern amenities.',
    description: 'This stunning 2-bedroom apartment sits on the 12th floor of a premium residential tower in Gulshan 2...',
    price: 45000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment',
    location: { address: 'Tower 7, Road 35', area: 'Gulshan 2', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.4125, 23.8103] } },
    specs: { bedrooms: 2, size: 1200 },
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'],
    listedBy: new mongoose.Types.ObjectId(), // Fake user ID for now
  },
  {
    title: 'Modern Studio in Banani', slug: 'modern-studio-banani',
    shortDescription: 'Sleek and modern studio perfect for professionals.',
    description: 'Located in the heart of Banani, this studio offers convenience and luxury...',
    price: 25000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment',
    location: { address: 'Block C, Road 11', area: 'Banani', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.4043, 23.7940] } },
    specs: { bedrooms: 1, size: 650 },
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'],
    listedBy: new mongoose.Types.ObjectId(),
  },
  {
    title: 'Spacious Villa with Garden', slug: 'spacious-villa-garden',
    shortDescription: 'A massive 4-bedroom villa with a private garden.',
    description: 'Perfect for large families, this villa in Uttara features a sprawling garden and high-end finishes...',
    price: 15000000, priceUnit: 'total', listingType: 'sale', propertyType: 'villa',
    location: { address: 'Sector 4', area: 'Uttara', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.3980, 23.8728] } },
    specs: { bedrooms: 4, size: 3200 },
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'],
    listedBy: new mongoose.Types.ObjectId(),
  },
  {
    title: 'Corner Office Space — Prime', slug: 'corner-office-prime',
    shortDescription: 'Premium corner office space in the business district.',
    description: 'Boost your business presence with this prime office space in Motijheel...',
    price: 60000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'office',
    location: { address: 'Dilkusha C/A', area: 'Motijheel', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.4183, 23.7275] } },
    specs: { bedrooms: 0, size: 1800 },
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'],
    listedBy: new mongoose.Types.ObjectId(),
  },
  {
    title: 'Cozy Family Apartment in Dhanmondi', slug: 'cozy-family-dhanmondi',
    shortDescription: 'Warm and inviting 3-bedroom apartment.',
    description: 'Situated near the lake, this apartment provides a serene environment for families...',
    price: 35000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment',
    location: { address: 'Road 8A', area: 'Dhanmondi', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.3752, 23.7461] } },
    specs: { bedrooms: 3, size: 1500 },
    images: ['https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?w=600&q=80'],
    listedBy: new mongoose.Types.ObjectId(),
  },
  {
    title: 'Luxury Penthouse with Rooftop', slug: 'luxury-penthouse-rooftop',
    shortDescription: 'The pinnacle of luxury living with exclusive rooftop access.',
    description: 'This penthouse offers unparalleled views and ultimate privacy...',
    price: 85000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment',
    location: { address: 'Avenue 2', area: 'Gulshan 1', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.4150, 23.7772] } },
    specs: { bedrooms: 3, size: 2400 },
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'],
    listedBy: new mongoose.Types.ObjectId(),
  },
  {
    title: 'Commercial Shop in Gazipur', slug: 'commercial-shop-gazipur',
    shortDescription: 'High-footfall commercial shop space.',
    description: 'Ideal for retail businesses looking to establish a presence in a busy area...',
    price: 18000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'shop',
    location: { address: 'Tongi Bazar', area: 'Tongi', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.3995, 23.8821] } },
    specs: { bedrooms: 0, size: 400 },
    images: ['https://images.unsplash.com/photo-1604014237800-1c9102c19b4a?w=600&q=80'],
    listedBy: new mongoose.Types.ObjectId(),
  },
  {
    title: 'New Build Plot in Purbachal', slug: 'new-build-plot-purbachal',
    shortDescription: '5 katha prime residential plot.',
    description: 'An excellent investment opportunity in the fast-developing Purbachal area...',
    price: 5000000, priceUnit: 'total', listingType: 'sale', propertyType: 'plot',
    location: { address: 'Sector 3', area: 'Purbachal', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.5050, 23.8300] } },
    specs: { bedrooms: 0, size: 5000 },
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80'],
    listedBy: new mongoose.Types.ObjectId(),
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Property.deleteMany({});
    console.log('Cleared existing properties');
    
    await Property.insertMany(MOCK_PROPERTIES);
    console.log('Successfully seeded properties');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
