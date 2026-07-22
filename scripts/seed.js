import 'dotenv/config';
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Minimal inline schemas to avoid import issues
const propertySchema = new Schema({
  title:            { type: String, required: true },
  slug:             { type: String, required: true, unique: true, lowercase: true },
  shortDescription: { type: String, required: true },
  description:      { type: String, required: true },
  listedBy:         { type: Schema.Types.ObjectId, ref: 'User' },
  status:           { type: String, default: 'active' },
  listingType:      { type: String, enum: ['sale', 'rent'], required: true },
  propertyType:     { type: String, required: true },
  price:            { type: Number, required: true },
  priceUnit:        { type: String, default: 'total' },
  isNegotiable:     { type: Boolean, default: false },
  location: {
    address:  String,
    area:     String,
    city:     { type: String, required: true },
    country:  { type: String, default: 'Bangladesh' },
    coordinates: {
      type: { type: String, default: 'Point' },
      coordinates: [Number],
    },
  },
  specs: {
    bedrooms:   Number,
    bathrooms:  Number,
    size:       Number,
    furnishing: String,
    floorNumber: Number,
    yearBuilt:  Number,
  },
  amenities: {
    lift: Boolean, generator: Boolean, security: Boolean, cctv: Boolean,
    gym: Boolean, pool: Boolean, garden: Boolean, rooftopAccess: Boolean,
    gasLine: Boolean, waterSupply: Boolean, internetReady: Boolean, petFriendly: Boolean,
  },
  images:  [String],
  stats: {
    views: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

const SEED_PROPERTIES = [
  {
    title: 'Luxury 3-Bed Penthouse in Gulshan',
    slug: 'luxury-3-bed-penthouse-gulshan-001',
    shortDescription: 'Stunning rooftop penthouse with panoramic city views and premium finishes.',
    description: 'Experience unparalleled luxury in this stunning 3-bedroom penthouse located at the heart of Gulshan. This residence offers floor-to-ceiling windows with panoramic city views, a private rooftop terrace, and top-of-the-line finishes throughout. The open-plan living area is flooded with natural light, perfect for entertaining. Features include a chef-grade kitchen, master suite with walk-in wardrobe, and dedicated parking.',
    listingType: 'rent', propertyType: 'apartment', price: 120000, priceUnit: 'per_month',
    isNegotiable: true,
    location: { address: '12 Gulshan Avenue', area: 'Gulshan 2', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.4125, 23.7954] } },
    specs: { bedrooms: 3, bathrooms: 3, size: 3200, furnishing: 'furnished', floorNumber: 18, yearBuilt: 2022 },
    amenities: { lift: true, generator: true, security: true, cctv: true, gym: true, pool: true, rooftopAccess: true, waterSupply: true, internetReady: true },
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Cozy 2-Bed Apartment in Banani',
    slug: 'cozy-2-bed-apartment-banani-002',
    shortDescription: 'Modern 2-bedroom apartment in the heart of Banani with lake view.',
    description: 'A beautifully designed 2-bedroom apartment located in a prime location of Banani. The apartment offers a wonderful lake view from the living room and master bedroom. It comes fully furnished with modern appliances and tasteful décor. Walking distance to restaurants, cafes, and shopping centres. Ideal for young professionals or small families seeking comfortable urban living.',
    listingType: 'rent', propertyType: 'apartment', price: 55000, priceUnit: 'per_month',
    isNegotiable: false,
    location: { address: '45 Banani Road 11', area: 'Banani', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.4026, 23.7937] } },
    specs: { bedrooms: 2, bathrooms: 2, size: 1400, furnishing: 'furnished', floorNumber: 6, yearBuilt: 2019 },
    amenities: { lift: true, generator: true, security: true, waterSupply: true, internetReady: true },
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Spacious Villa with Garden in Dhanmondi',
    slug: 'spacious-villa-garden-dhanmondi-003',
    shortDescription: 'Exclusive 4-bedroom villa with lush private garden for sale.',
    description: 'This exceptional 4-bedroom villa in Dhanmondi offers a rare combination of space, privacy, and location. Set on a generous plot with a beautifully landscaped private garden, the property provides a serene escape in the city. The double-height living area and chef kitchen make it perfect for families who love to entertain. A true gem in one of Dhaka\'s most prestigious neighbourhoods.',
    listingType: 'sale', propertyType: 'villa', price: 18000000, priceUnit: 'total',
    isNegotiable: true,
    location: { address: '8 Dhanmondi Road 27', area: 'Dhanmondi', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.3742, 23.7461] } },
    specs: { bedrooms: 4, bathrooms: 4, size: 5000, furnishing: 'semi-furnished', floorNumber: 1, yearBuilt: 2018 },
    amenities: { security: true, cctv: true, garden: true, gasLine: true, waterSupply: true, generator: true, petFriendly: true },
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Studio Apartment Near Chittagong University',
    slug: 'studio-apartment-chittagong-university-004',
    shortDescription: 'Affordable modern studio perfect for students and young professionals.',
    description: 'A compact and well-designed studio apartment located just minutes from Chittagong University. Ideal for students or young professionals looking for an affordable yet quality living space. The unit features a modern kitchenette, built-in storage, and a comfortable study nook. Building amenities include 24/7 security and reliable power backup.',
    listingType: 'rent', propertyType: 'apartment', price: 12000, priceUnit: 'per_month',
    isNegotiable: true,
    location: { address: 'Block B, University Road', area: 'Hathazari', city: 'Chittagong', coordinates: { type: 'Point', coordinates: [91.8333, 22.3569] } },
    specs: { bedrooms: 1, bathrooms: 1, size: 450, furnishing: 'furnished', floorNumber: 3, yearBuilt: 2020 },
    amenities: { security: true, generator: true, waterSupply: true, internetReady: true },
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Commercial Office Space in Motijheel',
    slug: 'commercial-office-space-motijheel-005',
    shortDescription: 'Prime commercial office space in the business hub of Motijheel.',
    description: 'Strategically located commercial office space in the heart of Motijheel CBD. This fully furnished office spans 2,500 sqft and is ready for immediate occupation. Features include a modern boardroom, open workspace for 30+ employees, private cabins, server room, and a reception area. Excellent connectivity to public transport and amenities.',
    listingType: 'rent', propertyType: 'office', price: 90000, priceUnit: 'per_month',
    isNegotiable: true,
    location: { address: '29 Dilkusha Commercial Area', area: 'Motijheel', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.4153, 23.7298] } },
    specs: { bedrooms: 0, bathrooms: 3, size: 2500, furnishing: 'furnished', floorNumber: 8, yearBuilt: 2017 },
    amenities: { lift: true, generator: true, security: true, cctv: true, internetReady: true, waterSupply: true },
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'],
    status: 'active',
  },
  {
    title: '3-Bed Family Home in Sylhet',
    slug: '3-bed-family-home-sylhet-006',
    shortDescription: 'Beautiful family home in peaceful Sylhet with garden and parking.',
    description: 'A charming 3-bedroom family home nestled in the serene suburbs of Sylhet. This property boasts an open plan living and dining area, a modern kitchen, and a private garden perfect for children and pets. The master bedroom features an en-suite bathroom and built-in wardrobe. Located in a quiet, safe neighbourhood with excellent schools nearby.',
    listingType: 'sale', propertyType: 'house', price: 6500000, priceUnit: 'total',
    isNegotiable: false,
    location: { address: '15 Ambarkhana Road', area: 'Ambarkhana', city: 'Sylhet', coordinates: { type: 'Point', coordinates: [91.8623, 24.8998] } },
    specs: { bedrooms: 3, bathrooms: 2, size: 2000, furnishing: 'semi-furnished', floorNumber: 1, yearBuilt: 2016 },
    amenities: { garden: true, security: true, gasLine: true, waterSupply: true, petFriendly: true, cctv: true },
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Beachside Plot in Cox\'s Bazar',
    slug: 'beachside-plot-coxs-bazar-007',
    shortDescription: 'Rare seafront plot ideal for resort or luxury villa development.',
    description: 'An exceptional opportunity to acquire a prime seafront plot in Cox\'s Bazar — Bangladesh\'s premier beach destination. This 10 katha plot sits just 200 metres from the beach and is zoned for commercial resort or residential use. Infrastructure is in place with road access, water connection, and electricity. Ideal for investors looking to tap into Bangladesh\'s booming tourism sector.',
    listingType: 'sale', propertyType: 'plot', price: 25000000, priceUnit: 'total',
    isNegotiable: true,
    location: { address: 'Kolatoli Beach Road', area: 'Kolatoli', city: 'Cox\'s Bazar', coordinates: { type: 'Point', coordinates: [91.9779, 21.4272] } },
    specs: { size: 7200 },
    amenities: { waterSupply: true },
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Modern 1-Bed Flat in Khulna',
    slug: 'modern-1-bed-flat-khulna-008',
    shortDescription: 'Contemporary 1-bed flat with river view in Khulna city centre.',
    description: 'A sleek and modern 1-bedroom flat situated in the vibrant centre of Khulna city. The apartment offers a stunning view of the Bhairab River from the balcony. The unit is fully furnished with quality furniture, air conditioning, and high-speed internet. Perfect for professionals relocating to Khulna or as an investment property with strong rental yields.',
    listingType: 'rent', propertyType: 'apartment', price: 18000, priceUnit: 'per_month',
    isNegotiable: false,
    location: { address: '7 KDA Avenue', area: 'Boyra', city: 'Khulna', coordinates: { type: 'Point', coordinates: [89.5644, 22.8456] } },
    specs: { bedrooms: 1, bathrooms: 1, size: 750, furnishing: 'furnished', floorNumber: 4, yearBuilt: 2021 },
    amenities: { lift: true, security: true, generator: true, internetReady: true, waterSupply: true },
    images: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Retail Shop Space in Rajshahi',
    slug: 'retail-shop-space-rajshahi-009',
    shortDescription: 'Prime ground-floor retail space on main commercial street in Rajshahi.',
    description: 'An excellent retail opportunity in the heart of Rajshahi\'s main commercial district. This ground-floor shop spans 1,200 sqft with high ceilings and large display windows offering exceptional footfall visibility. The space is fitted out with electrical wiring, point-of-sale infrastructure, and CCTV. Suitable for clothing, electronics, or café businesses.',
    listingType: 'rent', propertyType: 'shop', price: 35000, priceUnit: 'per_month',
    isNegotiable: true,
    location: { address: 'Shaheb Bazar Main Road', area: 'Shaheb Bazar', city: 'Rajshahi', coordinates: { type: 'Point', coordinates: [88.6018, 24.3745] } },
    specs: { bedrooms: 0, bathrooms: 1, size: 1200, furnishing: 'unfurnished', floorNumber: 0, yearBuilt: 2015 },
    amenities: { security: true, cctv: true, generator: true, waterSupply: true },
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Premium 4-Bed Apartment in Uttara',
    slug: 'premium-4-bed-apartment-uttara-010',
    shortDescription: 'Expansive 4-bedroom family apartment in Uttara with gym and pool.',
    description: 'This premium 4-bedroom apartment in Uttara Sector 7 offers the ultimate in family living. The property is part of a luxury gated community featuring a rooftop pool, state-of-the-art gym, children\'s play area, and landscaped gardens. Each bedroom is spacious with built-in wardrobes. The gourmet kitchen features granite countertops and premium appliances.',
    listingType: 'rent', propertyType: 'apartment', price: 95000, priceUnit: 'per_month',
    isNegotiable: false,
    location: { address: 'House 14, Road 7, Sector 7', area: 'Uttara', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.3988, 23.8759] } },
    specs: { bedrooms: 4, bathrooms: 3, size: 3600, furnishing: 'furnished', floorNumber: 10, yearBuilt: 2023 },
    amenities: { lift: true, generator: true, security: true, cctv: true, gym: true, pool: true, garden: true, waterSupply: true, internetReady: true, petFriendly: true },
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Affordable House in Narsingdi',
    slug: 'affordable-house-narsingdi-011',
    shortDescription: 'Well-maintained 3-bedroom house for sale in peaceful Narsingdi.',
    description: 'A wonderfully maintained 3-bedroom house in the peaceful town of Narsingdi. Surrounded by greenery, this property offers a large backyard, separate servant\'s quarter, and ample parking. The house features quality tilework, large windows for ventilation, and a traditional yet functional kitchen. Excellent value for money and a great first home.',
    listingType: 'sale', propertyType: 'house', price: 3200000, priceUnit: 'total',
    isNegotiable: true,
    location: { address: 'Shingair Road', area: 'Narsingdi Sadar', city: 'Narsingdi', coordinates: { type: 'Point', coordinates: [90.7156, 23.9224] } },
    specs: { bedrooms: 3, bathrooms: 2, size: 1800, furnishing: 'unfurnished', floorNumber: 1, yearBuilt: 2013 },
    amenities: { garden: true, gasLine: true, waterSupply: true, security: true },
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80'],
    status: 'active',
  },
  {
    title: '2-Bed Smart Home in Bashundhara R/A',
    slug: '2-bed-smart-home-bashundhara-012',
    shortDescription: 'Fully automated smart home in Bashundhara with cutting-edge tech.',
    description: 'Welcome to the future of living! This 2-bedroom smart home in Bashundhara Residential Area features voice-controlled lighting, automated window blinds, a smart security system, and app-controlled appliances. The interior boasts Scandinavian-inspired design with natural materials and maximized storage. A truly unique property for tech-savvy urban dwellers.',
    listingType: 'rent', propertyType: 'apartment', price: 48000, priceUnit: 'per_month',
    isNegotiable: false,
    location: { address: 'Block B, Road 12', area: 'Bashundhara R/A', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.4260, 23.8141] } },
    specs: { bedrooms: 2, bathrooms: 2, size: 1600, furnishing: 'furnished', floorNumber: 5, yearBuilt: 2023 },
    amenities: { lift: true, generator: true, security: true, cctv: true, internetReady: true, waterSupply: true },
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Industrial Warehouse in Narayanganj',
    slug: 'industrial-warehouse-narayanganj-013',
    shortDescription: 'Large industrial warehouse space available for rent near port area.',
    description: 'A vast 10,000 sqft industrial warehouse strategically located near Narayanganj Port. The facility features 8-metre high ceilings, heavy-duty flooring, three loading bays, a mezzanine office area, and comprehensive CCTV security. Backup generator and full electrical three-phase supply available. Ideal for manufacturing, logistics, or warehousing operations.',
    listingType: 'rent', propertyType: 'office', price: 200000, priceUnit: 'per_month',
    isNegotiable: true,
    location: { address: 'Industrial Zone, Shiddhirganj', area: 'Shiddhirganj', city: 'Narayanganj', coordinates: { type: 'Point', coordinates: [90.4996, 23.6238] } },
    specs: { bedrooms: 0, bathrooms: 4, size: 10000, furnishing: 'unfurnished', floorNumber: 0, yearBuilt: 2016 },
    amenities: { security: true, cctv: true, generator: true, waterSupply: true },
    images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Hillside Bungalow in Bandarban',
    slug: 'hillside-bungalow-bandarban-014',
    shortDescription: 'Breathtaking hillside bungalow with panoramic views of the Chittagong Hills.',
    description: 'A one-of-a-kind hillside bungalow perched in the lush hills of Bandarban. This 3-bedroom retreat offers uninterrupted panoramic views of the Chittagong Hill Tracts, cool mountain air, and complete privacy. Built with local materials that blend with the natural environment, the property features a wrap-around veranda, traditional wooden interiors, and a vegetable garden. An ideal getaway home or eco-tourism property.',
    listingType: 'sale', propertyType: 'house', price: 8500000, priceUnit: 'total',
    isNegotiable: true,
    location: { address: 'Meghla Parjatan', area: 'Meghla', city: 'Bandarban', coordinates: { type: 'Point', coordinates: [92.2173, 22.1953] } },
    specs: { bedrooms: 3, bathrooms: 2, size: 1500, furnishing: 'furnished', floorNumber: 1, yearBuilt: 2020 },
    amenities: { garden: true, waterSupply: true, security: true, petFriendly: true, rooftopAccess: true },
    images: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Corner Plot in Rajuk Purbachal',
    slug: 'corner-plot-purbachal-015',
    shortDescription: '5 katha corner plot in Rajuk Purbachal New Town — ready for construction.',
    description: 'Prime corner plot available in Rajuk Purbachal New Town, one of Dhaka\'s fastest-growing satellite cities. The 5 katha plot is in a designated residential zone with all utilities available on site. Road access from two sides gives excellent construction flexibility. Registry is clear and all documentation is up to date. An outstanding investment opportunity.',
    listingType: 'sale', propertyType: 'plot', price: 12000000, priceUnit: 'total',
    isNegotiable: false,
    location: { address: 'Sector 18, Block E', area: 'Purbachal', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.5624, 23.8397] } },
    specs: { size: 3600 },
    amenities: { waterSupply: true },
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Duplex Apartment in Mirpur DOHS',
    slug: 'duplex-apartment-mirpur-dohs-016',
    shortDescription: 'Gorgeous 3-bed duplex with private terrace in secured DOHS area.',
    description: 'A stunning 3-bedroom duplex apartment spread across two floors within the prestigious Mirpur DOHS. The lower floor hosts the living, dining, and kitchen areas, while the upper floor contains all three bedrooms and a private rooftop terrace. The building has 24/7 army security, power backup, and is within walking distance of all amenities. Perfect for families prioritising safety and prestige.',
    listingType: 'rent', propertyType: 'apartment', price: 70000, priceUnit: 'per_month',
    isNegotiable: false,
    location: { address: 'Road 4, Block D', area: 'Mirpur DOHS', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.3644, 23.8154] } },
    specs: { bedrooms: 3, bathrooms: 3, size: 2800, furnishing: 'semi-furnished', floorNumber: 7, yearBuilt: 2020 },
    amenities: { lift: true, generator: true, security: true, cctv: true, rooftopAccess: true, waterSupply: true, internetReady: true },
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Budget Studio in Old Dhaka',
    slug: 'budget-studio-old-dhaka-017',
    shortDescription: 'Affordable furnished studio in the historic heart of Old Dhaka.',
    description: 'An affordable and charming furnished studio apartment in the culturally rich Old Dhaka. While compact, the space is cleverly designed with a loft sleeping area, compact kitchen, and a cozy sitting nook. Ideal for single professionals or students. Located steps from iconic Old Dhaka eateries, mosques, and the Buriganga River.',
    listingType: 'rent', propertyType: 'apartment', price: 8500, priceUnit: 'per_month',
    isNegotiable: true,
    location: { address: 'Lalbagh Road', area: 'Lalbagh', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.3901, 23.7189] } },
    specs: { bedrooms: 1, bathrooms: 1, size: 380, furnishing: 'furnished', floorNumber: 2, yearBuilt: 2010 },
    amenities: { security: true, waterSupply: true, gasLine: true },
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Lakefront Villa in Barisal',
    slug: 'lakefront-villa-barisal-018',
    shortDescription: 'Serene lakefront villa with boat dock — a rare find in Barisal.',
    description: 'Escape to this exceptional lakefront villa in Barisal — a city of rivers. This unique 4-bedroom property sits directly on a freshwater lake with a private boat dock, lush garden, and an open-air veranda made for entertaining. The interior features high ceilings, traditional Bangladeshi craftsmanship blended with modern amenities. Perfect as a holiday retreat, bed-and-breakfast, or permanent family home.',
    listingType: 'sale', propertyType: 'villa', price: 11000000, priceUnit: 'total',
    isNegotiable: true,
    location: { address: 'Natun Bazar Lake Road', area: 'Natun Bazar', city: 'Barisal', coordinates: { type: 'Point', coordinates: [90.3611, 22.7058] } },
    specs: { bedrooms: 4, bathrooms: 3, size: 3800, furnishing: 'furnished', floorNumber: 1, yearBuilt: 2018 },
    amenities: { garden: true, security: true, gasLine: true, waterSupply: true, generator: true, petFriendly: true, rooftopAccess: true },
    images: ['https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Modern Flat in Agrabad, Chittagong',
    slug: 'modern-flat-agrabad-chittagong-019',
    shortDescription: 'Bright 2-bedroom flat in Chittagong commercial hub of Agrabad.',
    description: 'A beautifully maintained 2-bedroom flat on the 5th floor of a modern high-rise in Agrabad, Chittagong\'s leading commercial district. The apartment offers excellent cross-ventilation, a spacious balcony, modern bathroom fittings, and a modular kitchen. Close to corporate offices, hospitals, and the Chittagong port. Suitable for expats and professionals working in Chittagong.',
    listingType: 'rent', propertyType: 'apartment', price: 32000, priceUnit: 'per_month',
    isNegotiable: false,
    location: { address: '22 Agrabad C/A', area: 'Agrabad', city: 'Chittagong', coordinates: { type: 'Point', coordinates: [91.8123, 22.3282] } },
    specs: { bedrooms: 2, bathrooms: 2, size: 1200, furnishing: 'semi-furnished', floorNumber: 5, yearBuilt: 2019 },
    amenities: { lift: true, security: true, generator: true, waterSupply: true, internetReady: true },
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Heritage Townhouse in Rajshahi',
    slug: 'heritage-townhouse-rajshahi-020',
    shortDescription: 'Beautifully restored colonial-era townhouse blending history and comfort.',
    description: 'Own a piece of history with this beautifully restored colonial-era townhouse in the cultural city of Rajshahi. The property retains its original ornate architecture — high ceilings, arched doorways, and terracotta flooring — while featuring fully modernised bathrooms, kitchen, and electrical systems. The courtyard garden is a serene oasis. Perfect for those who appreciate character homes with a story to tell.',
    listingType: 'sale', propertyType: 'house', price: 9500000, priceUnit: 'total',
    isNegotiable: false,
    location: { address: 'Ghoramara, Boalia', area: 'Boalia', city: 'Rajshahi', coordinates: { type: 'Point', coordinates: [88.5942, 24.3663] } },
    specs: { bedrooms: 4, bathrooms: 3, size: 3200, furnishing: 'unfurnished', floorNumber: 2, yearBuilt: 1965 },
    amenities: { garden: true, security: true, gasLine: true, waterSupply: true },
    images: ['https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Luxury Flat in Tejgaon',
    slug: 'luxury-flat-tejgaon-021',
    shortDescription: 'Upscale 2-bedroom flat in the emerging business district of Tejgaon.',
    description: 'A sophisticated 2-bedroom flat in a boutique luxury tower in Tejgaon\'s rapidly developing IT Village district. This premium unit features marble flooring, custom kitchen cabinetry, a Juliette balcony, and high-end German fixtures throughout. The building offers concierge service, a sky lounge, and EV charging in the basement. An ideal investment in Dhaka\'s next business hub.',
    listingType: 'rent', propertyType: 'apartment', price: 62000, priceUnit: 'per_month',
    isNegotiable: false,
    location: { address: '5 IT Village, Tejgaon', area: 'Tejgaon', city: 'Dhaka', coordinates: { type: 'Point', coordinates: [90.3987, 23.7614] } },
    specs: { bedrooms: 2, bathrooms: 2, size: 1700, furnishing: 'furnished', floorNumber: 14, yearBuilt: 2024 },
    amenities: { lift: true, generator: true, security: true, cctv: true, gym: true, internetReady: true, waterSupply: true, rooftopAccess: true },
    images: ['https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80'],
    status: 'active',
  },
  {
    title: 'Eco-Friendly Home in Savar',
    slug: 'eco-friendly-home-savar-022',
    shortDescription: 'Sustainable 3-bed eco home with solar panels and rainwater harvesting.',
    description: 'A pioneering eco-friendly home in the growing satellite city of Savar. This award-winning sustainable property features 5kW solar panels covering 80% of energy needs, a rainwater harvesting system, composting garden, and thermally insulated walls for natural temperature regulation. Built with locally sourced materials, it is a model of responsible living without compromising on comfort or style.',
    listingType: 'sale', propertyType: 'house', price: 7800000, priceUnit: 'total',
    isNegotiable: false,
    location: { address: 'DEPZ Road, Ashulia', area: 'Ashulia', city: 'Savar', coordinates: { type: 'Point', coordinates: [90.2703, 23.9021] } },
    specs: { bedrooms: 3, bathrooms: 2, size: 2200, furnishing: 'semi-furnished', floorNumber: 1, yearBuilt: 2022 },
    amenities: { garden: true, security: true, waterSupply: true, petFriendly: true, rooftopAccess: true, internetReady: true },
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
    status: 'active',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check existing count
    const existing = await Property.countDocuments();
    console.log(`📊 Found ${existing} existing properties`);

    if (existing >= 20) {
      console.log('✅ Database already has enough properties. Skipping seed.');
      await mongoose.disconnect();
      return;
    }

    // Delete existing and re-seed
    await Property.deleteMany({});
    console.log('🗑️  Cleared existing properties');

    const inserted = await Property.insertMany(SEED_PROPERTIES);
    console.log(`🌱 Seeded ${inserted.length} properties successfully!`);

    // Show summary
    const cities = {};
    inserted.forEach(p => { cities[p.location.city] = (cities[p.location.city] || 0) + 1; });
    console.log('\n📍 Properties by city:', cities);

  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
}

seed();
