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
  images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
    ],
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
    title: "Luxury Family Apartment Near Gulshan Lake",
    slug: "luxury-family-apartment-gulshan-lake-001",
    agentEmail: "sadia.realty@gmail.com",
    shortDescription: "Premium 3 bedroom apartment with modern interior and city view.",
    description: "A beautifully designed family apartment located near Gulshan Lake. The property features spacious bedrooms, modern kitchen fittings, excellent ventilation and premium finishing. Suitable for families looking for a comfortable urban lifestyle.",
    listingType: "sale",
    propertyType: "apartment",
    price: 16500000,
    priceUnit: "total",
    isNegotiable: true,

    location: {
      address: "House 24, Road 45, Gulshan",
      area: "Gulshan 2",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: {
        type: "Point",
        coordinates: [90.4125, 23.7925]
      }
    },

    specs: {
      bedrooms: 3,
      bathrooms: 3,
      size: 2100,
      furnishing: "semi-furnished",
      floorNumber: 9,
      yearBuilt: 2021
    },

    amenities: {
      lift: true,
      generator: true,
      security: true,
      cctv: true,
      gym: true,
      garden: true,
      waterSupply: true,
      internetReady: true
    },

    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"
    ],

    stats: {
      views: 842,
      saves: 54,
      avgRating: 4.8,
      reviewCount: 18
    },

    status: "active"
  },


  {
    title: "Modern Studio Apartment in Banani",
    slug: "modern-studio-apartment-banani-002",
    agentEmail: "rahman.homes@gmail.com",
    shortDescription: "Compact furnished studio apartment for professionals.",
    description: "A stylish studio apartment located in Banani with easy access to restaurants, offices and shopping areas. The apartment includes smart storage solutions and modern furniture.",
    listingType: "rent",
    propertyType: "apartment",
    price: 28000,
    priceUnit: "per_month",
    isNegotiable: false,

    location: {
      address: "Road 11, Banani",
      area: "Banani",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: {
        type: "Point",
        coordinates: [90.4045, 23.7938]
      }
    },

    specs: {
      bedrooms: 1,
      bathrooms: 1,
      size: 650,
      furnishing: "furnished",
      floorNumber: 5,
      yearBuilt: 2022
    },

    amenities: {
      lift: true,
      generator: true,
      security: true,
      cctv: true,
      waterSupply: true,
      internetReady: true
    },

    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],

    stats: {
      views: 430,
      saves: 29,
      avgRating: 4.5,
      reviewCount: 11
    },

    status: "active"
  },


  {
    title: "Green Villa With Private Garden in Dhanmondi",
    slug: "green-villa-private-garden-dhanmondi-003",
    agentEmail: "greenvalley.property@gmail.com",
    shortDescription: "Spacious villa with garden and peaceful surroundings.",
    description: "A beautiful family villa located in Dhanmondi featuring a private garden, large living space and excellent privacy. Perfect for families who prefer a quiet residential environment.",
    listingType: "sale",
    propertyType: "villa",
    price: 32000000,
    priceUnit: "total",
    isNegotiable: true,

    location: {
      address: "Road 27, Dhanmondi",
      area: "Dhanmondi",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: {
        type: "Point",
        coordinates: [90.3742, 23.7461]
      }
    },

    specs: {
      bedrooms: 5,
      bathrooms: 4,
      size: 5200,
      furnishing: "semi-furnished",
      floorNumber: 2,
      yearBuilt: 2019
    },

    amenities: {
      garden: true,
      security: true,
      cctv: true,
      gasLine: true,
      waterSupply: true,
      petFriendly: true
    },

    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
    ],

    stats: {
      views: 1250,
      saves: 87,
      avgRating: 4.9,
      reviewCount: 25
    },

    status: "active"
  }, {
  title: "Affordable Family Flat in Uttara Sector 10",
  slug: "affordable-family-flat-uttara-sector-10-004",
  agentEmail: "uttaraestate.bd@gmail.com",
  shortDescription: "Comfortable 3 bedroom apartment in a peaceful family neighborhood.",
  description: "A well-maintained apartment located in Uttara Sector 10. The property offers spacious rooms, natural lighting, proper ventilation and easy access to schools, hospitals and transport facilities.",

  listingType: "rent",
  propertyType: "apartment",
  price: 45000,
  priceUnit: "per_month",
  isNegotiable: false,

  location: {
    address: "House 18, Road 12, Sector 10",
    area: "Uttara",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.3985, 23.8759]
    }
  },

  specs: {
    bedrooms: 3,
    bathrooms: 2,
    size: 1550,
    furnishing: "semi-furnished",
    floorNumber: 6,
    yearBuilt: 2020
  },

  amenities: {
    lift: true,
    generator: true,
    security: true,
    cctv: true,
    waterSupply: true,
    internetReady: true
  },

  images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
    ],

  stats: {
    views: 620,
    saves: 42,
    avgRating: 4.6,
    reviewCount: 14
  },

  status: "active"
},


{
  title: "Modern Office Space in Motijheel Commercial Area",
  slug: "modern-office-space-motijheel-005",
  agentEmail: "commercialhub.bd@gmail.com",
  shortDescription: "Fully equipped office space in Dhaka business district.",
  description: "A premium commercial office space located in Motijheel. Suitable for startups, corporate offices and financial companies. Includes meeting area, workspace setup and excellent transportation access.",

  listingType: "rent",
  propertyType: "office",
  price: 120000,
  priceUnit: "per_month",
  isNegotiable: true,

  location: {
    address: "Dilkusha Commercial Area",
    area: "Motijheel",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.4153, 23.7298]
    }
  },

  specs: {
    bedrooms: 0,
    bathrooms: 3,
    size: 3000,
    furnishing: "furnished",
    floorNumber: 12,
    yearBuilt: 2018
  },

  amenities: {
    lift: true,
    generator: true,
    security: true,
    cctv: true,
    internetReady: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80"
    ],

  stats: {
    views: 390,
    saves: 21,
    avgRating: 4.4,
    reviewCount: 8
  },

  status: "active"
},


{
  title: "Beachside Holiday Villa in Coxs Bazar",
  slug: "beachside-holiday-villa-coxs-bazar-006",
  agentEmail: "coastalproperties@gmail.com",
  shortDescription: "Luxury vacation villa near the sea beach.",
  description: "A beautiful holiday villa located near Cox's Bazar beach area. The property features spacious bedrooms, outdoor space and peaceful surroundings suitable for family vacations.",

  listingType: "sale",
  propertyType: "villa",
  price: 22000000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Kolatoli Beach Road",
    area: "Kolatoli",
    city: "Cox's Bazar",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [91.9779, 21.4272]
    }
  },

  specs: {
    bedrooms: 4,
    bathrooms: 4,
    size: 4200,
    furnishing: "furnished",
    floorNumber: 2,
    yearBuilt: 2021
  },

  amenities: {
    garden: true,
    rooftopAccess: true,
    security: true,
    cctv: true,
    parkingSpots: 2,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80"
    ],

  stats: {
    views: 980,
    saves: 74,
    avgRating: 4.8,
    reviewCount: 20
  },

  status: "active"
},


{
  title: "River View Apartment in Chattogram",
  slug: "river-view-apartment-chattogram-007",
  agentEmail: "portcityhomes@gmail.com",
  shortDescription: "Modern apartment with beautiful city and river views.",
  description: "A comfortable apartment located in a premium area of Chattogram. The property offers modern facilities, excellent security and convenient access to business areas.",

  listingType: "sale",
  propertyType: "apartment",
  price: 8500000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Agrabad Residential Area",
    area: "Agrabad",
    city: "Chattogram",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [91.8123, 22.3282]
    }
  },

  specs: {
    bedrooms: 3,
    bathrooms: 2,
    size: 1450,
    furnishing: "semi-furnished",
    floorNumber: 8,
    yearBuilt: 2022
  },

  amenities: {
    lift: true,
    generator: true,
    security: true,
    cctv: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80"
    ],

  stats: {
    views: 540,
    saves: 31,
    avgRating: 4.5,
    reviewCount: 12
  },

  status: "active"
},{
  title: "Peaceful Family Home in Sylhet",
  slug: "peaceful-family-home-sylhet-009",
  agentEmail: "sylhetliving@gmail.com",
  shortDescription: "Spacious family house surrounded by greenery in Sylhet.",
  description: "A comfortable family home located in a peaceful residential area of Sylhet. The property includes a large living area, modern kitchen, garden space and a calm environment perfect for families.",

  listingType: "sale",
  propertyType: "house",
  price: 7200000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Ambarkhana Main Road",
    area: "Ambarkhana",
    city: "Sylhet",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [91.8623, 24.8998]
    }
  },

  specs: {
    bedrooms: 4,
    bathrooms: 3,
    size: 2600,
    furnishing: "semi-furnished",
    floorNumber: 2,
    yearBuilt: 2017
  },

  amenities: {
    garden: true,
    security: true,
    cctv: true,
    gasLine: true,
    waterSupply: true,
    petFriendly: true
  },

  images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      "https://images.unsplash.com/photo-1605276374104-a64115b9c145?w=800&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80"
    ],

  stats: {
    views: 730,
    saves: 46,
    avgRating: 4.7,
    reviewCount: 16
  },

  status: "active"
},


{
  title: "Commercial Shop Near Rajshahi Market",
  slug: "commercial-shop-rajshahi-market-010",
  agentEmail: "rajshahicommercial@gmail.com",
  shortDescription: "Prime retail shop location with high customer traffic.",
  description: "A ground-floor commercial shop located in a busy market area of Rajshahi. Suitable for clothing stores, electronics shops, cafes or service businesses.",

  listingType: "rent",
  propertyType: "shop",
  price: 40000,
  priceUnit: "per_month",
  isNegotiable: true,

  location: {
    address: "Shaheb Bazar Main Street",
    area: "Shaheb Bazar",
    city: "Rajshahi",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [88.6018, 24.3745]
    }
  },

  specs: {
    bedrooms: 0,
    bathrooms: 1,
    size: 1100,
    furnishing: "unfurnished",
    floorNumber: 0,
    yearBuilt: 2016
  },

  amenities: {
    security: true,
    cctv: true,
    generator: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
    ],

  stats: {
    views: 320,
    saves: 18,
    avgRating: 4.3,
    reviewCount: 7
  },

  status: "active"
},


{
  title: "Smart Apartment in Bashundhara Residential Area",
  slug: "smart-apartment-bashundhara-011",
  agentEmail: "smartlivingbd@gmail.com",
  shortDescription: "Technology enabled modern apartment with premium facilities.",
  description: "A smart apartment featuring modern interior design, automated lighting setup and excellent building facilities. Located in one of Dhaka's fastest growing residential areas.",

  listingType: "rent",
  propertyType: "apartment",
  price: 65000,
  priceUnit: "per_month",
  isNegotiable: false,

  location: {
    address: "Block C, Bashundhara R/A",
    area: "Bashundhara",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.4260, 23.8141]
    }
  },

  specs: {
    bedrooms: 3,
    bathrooms: 3,
    size: 1900,
    furnishing: "furnished",
    floorNumber: 7,
    yearBuilt: 2023
  },

  amenities: {
    lift: true,
    generator: true,
    security: true,
    cctv: true,
    gym: true,
    internetReady: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
    ],

  stats: {
    views: 890,
    saves: 62,
    avgRating: 4.9,
    reviewCount: 22
  },

  status: "active"
},


{
  title: "Affordable Plot Near Purbachal New Town",
  slug: "affordable-plot-purbachal-012",
  agentEmail: "dhakaplots@gmail.com",
  shortDescription: "Residential plot in a rapidly developing area.",
  description: "A ready residential plot located near Rajuk Purbachal New Town. The area has upcoming infrastructure projects and is suitable for future home construction.",

  listingType: "sale",
  propertyType: "plot",
  price: 9500000,
  priceUnit: "total",
  isNegotiable: false,

  location: {
    address: "Sector 12, Purbachal",
    area: "Purbachal",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.5624, 23.8397]
    }
  },

  specs: {
    size: 3000
  },

  amenities: {
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
    ],

  stats: {
    views: 1100,
    saves: 95,
    avgRating: 4.6,
    reviewCount: 13
  },

  status: "active"
},


{
  title: "Duplex Residence in Mirpur DOHS",
  slug: "duplex-residence-mirpur-dohs-013",
  agentEmail: "securehomesbd@gmail.com",
  shortDescription: "Elegant duplex home in a secure residential community.",
  description: "A beautiful duplex residence located in Mirpur DOHS with spacious rooms, private terrace and excellent security facilities. Ideal for families looking for a premium lifestyle.",

  listingType: "rent",
  propertyType: "house",
  price: 85000,
  priceUnit: "per_month",
  isNegotiable: false,

  location: {
    address: "Road 5, Mirpur DOHS",
    area: "Mirpur DOHS",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.3644, 23.8154]
    }
  },

  specs: {
    bedrooms: 4,
    bathrooms: 4,
    size: 3500,
    furnishing: "furnished",
    floorNumber: 2,
    yearBuilt: 2020
  },

  amenities: {
    lift: true,
    security: true,
    cctv: true,
    rooftopAccess: true,
    garden: true,
    generator: true
  },

  images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80"
    ],

  stats: {
    views: 670,
    saves: 39,
    avgRating: 4.7,
    reviewCount: 15
  },

  status: "active"
},{
  title: "Contemporary Apartment Near Chittagong Port",
  slug: "contemporary-apartment-chittagong-port-014",
  agentEmail: "portcityrealestate@gmail.com",
  shortDescription: "Modern apartment close to business and commercial zones.",
  description: "A contemporary apartment located near Chittagong Port area. The property offers comfortable living spaces, modern fittings and convenient access to offices, shopping areas and transportation.",

  listingType: "sale",
  propertyType: "apartment",
  price: 9800000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Agrabad C/A Road",
    area: "Agrabad",
    city: "Chattogram",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [91.8123, 22.3282]
    }
  },

  specs: {
    bedrooms: 3,
    bathrooms: 2,
    size: 1500,
    furnishing: "semi-furnished",
    floorNumber: 10,
    yearBuilt: 2021
  },

  amenities: {
    lift: true,
    generator: true,
    security: true,
    cctv: true,
    waterSupply: true,
    internetReady: true
  },

  images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    ],

  stats: {
    views: 560,
    saves: 34,
    avgRating: 4.5,
    reviewCount: 10
  },

  status: "active"
},


{
  title: "Elegant Lake View Villa in Barisal",
  slug: "elegant-lake-view-villa-barisal-015",
  agentEmail: "riverhomesbd@gmail.com",
  shortDescription: "Beautiful villa with peaceful lake surroundings.",
  description: "A unique lake-side villa in Barisal featuring spacious rooms, outdoor garden and a relaxing environment. Perfect as a family residence or vacation home.",

  listingType: "sale",
  propertyType: "villa",
  price: 14000000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Natun Bazar Lake Area",
    area: "Natun Bazar",
    city: "Barisal",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.3611, 22.7058]
    }
  },

  specs: {
    bedrooms: 4,
    bathrooms: 3,
    size: 3800,
    furnishing: "furnished",
    floorNumber: 2,
    yearBuilt: 2018
  },

  amenities: {
    garden: true,
    security: true,
    cctv: true,
    generator: true,
    waterSupply: true,
    petFriendly: true
  },

  images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80"
    ],

  stats: {
    views: 770,
    saves: 51,
    avgRating: 4.8,
    reviewCount: 19
  },

  status: "active"
},


{
  title: "Modern Office Tower Space in Tejgaon",
  slug: "modern-office-tower-tejgaon-016",
  agentEmail: "businessspacebd@gmail.com",
  shortDescription: "Professional workspace in Dhaka business district.",
  description: "A premium office floor available in Tejgaon business zone. Suitable for technology companies, agencies and corporate teams. The office includes dedicated meeting areas and modern infrastructure.",

  listingType: "rent",
  propertyType: "office",
  price: 150000,
  priceUnit: "per_month",
  isNegotiable: true,

  location: {
    address: "IT Village Road, Tejgaon",
    area: "Tejgaon",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.3987, 23.7614]
    }
  },

  specs: {
    bedrooms: 0,
    bathrooms: 4,
    size: 4200,
    furnishing: "furnished",
    floorNumber: 15,
    yearBuilt: 2024
  },

  amenities: {
    lift: true,
    generator: true,
    security: true,
    cctv: true,
    internetReady: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800&q=80",
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80"
    ],

  stats: {
    views: 440,
    saves: 26,
    avgRating: 4.4,
    reviewCount: 9
  },

  status: "active"
},


{
  title: "Eco Friendly House Near Savar",
  slug: "eco-friendly-house-savar-017",
  agentEmail: "greenlivingestate@gmail.com",
  shortDescription: "Sustainable home with garden and solar facilities.",
  description: "A modern eco-friendly house near Savar featuring open spaces, natural ventilation and green surroundings. Designed for families who prefer peaceful suburban living.",

  listingType: "sale",
  propertyType: "house",
  price: 9000000,
  priceUnit: "total",
  isNegotiable: false,

  location: {
    address: "Ashulia Main Road",
    area: "Ashulia",
    city: "Savar",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.2703, 23.9021]
    }
  },

  specs: {
    bedrooms: 3,
    bathrooms: 3,
    size: 2400,
    furnishing: "semi-furnished",
    floorNumber: 1,
    yearBuilt: 2022
  },

  amenities: {
    garden: true,
    security: true,
    waterSupply: true,
    rooftopAccess: true,
    internetReady: true
  },

  images: [
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
    ],

  stats: {
    views: 690,
    saves: 47,
    avgRating: 4.6,
    reviewCount: 13
  },

  status: "active"
},{
  title: "Premium Penthouse in Gulshan Avenue",
  slug: "premium-penthouse-gulshan-avenue-019",
  agentEmail: "elitepropertiesbd@gmail.com",
  shortDescription: "High-end penthouse with rooftop access and luxury facilities.",
  description: "A luxurious penthouse located in Gulshan Avenue offering panoramic city views, premium interiors and exclusive living experience. The property includes spacious bedrooms, modern kitchen and private rooftop access.",

  listingType: "rent",
  propertyType: "apartment",
  price: 180000,
  priceUnit: "per_month",
  isNegotiable: false,

  location: {
    address: "Gulshan Avenue Road 50",
    area: "Gulshan",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.4125, 23.7954]
    }
  },

  specs: {
    bedrooms: 4,
    bathrooms: 4,
    size: 4200,
    furnishing: "furnished",
    floorNumber: 22,
    yearBuilt: 2023
  },

  amenities: {
    lift: true,
    generator: true,
    security: true,
    cctv: true,
    gym: true,
    pool: true,
    rooftopAccess: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
    ],

  stats: {
    views: 1420,
    saves: 105,
    avgRating: 4.9,
    reviewCount: 32
  },

  status: "active"
},


{
  title: "Cozy Apartment Near Sylhet University",
  slug: "cozy-apartment-sylhet-university-020",
  agentEmail: "sylhetpropertyhub@gmail.com",
  shortDescription: "Affordable apartment ideal for students and families.",
  description: "A comfortable apartment near Sylhet University area. The property offers peaceful surroundings, good transportation access and essential facilities for daily living.",

  listingType: "rent",
  propertyType: "apartment",
  price: 18000,
  priceUnit: "per_month",
  isNegotiable: true,

  location: {
    address: "University Road",
    area: "Shahjalal Upashahar",
    city: "Sylhet",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [91.8315, 24.9200]
    }
  },

  specs: {
    bedrooms: 2,
    bathrooms: 1,
    size: 900,
    furnishing: "semi-furnished",
    floorNumber: 3,
    yearBuilt: 2019
  },

  amenities: {
    security: true,
    waterSupply: true,
    internetReady: true,
    cctv: true
  },

  images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80"
    ],

  stats: {
    views: 350,
    saves: 20,
    avgRating: 4.3,
    reviewCount: 8
  },

  status: "active"
},


{
  title: "Industrial Warehouse Near Narayanganj Port",
  slug: "industrial-warehouse-narayanganj-port-021",
  agentEmail: "industrialspacebd@gmail.com",
  shortDescription: "Large warehouse facility for business operations.",
  description: "A spacious industrial warehouse located near Narayanganj Port. Suitable for manufacturing, storage and logistics businesses with excellent road connectivity.",

  listingType: "rent",
  propertyType: "office",
  price: 220000,
  priceUnit: "per_month",
  isNegotiable: true,

  location: {
    address: "Shiddhirganj Industrial Area",
    area: "Shiddhirganj",
    city: "Narayanganj",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.4996, 23.6238]
    }
  },

  specs: {
    bedrooms: 0,
    bathrooms: 3,
    size: 12000,
    furnishing: "unfurnished",
    floorNumber: 0,
    yearBuilt: 2016
  },

  amenities: {
    security: true,
    cctv: true,
    generator: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"
    ],

  stats: {
    views: 280,
    saves: 15,
    avgRating: 4.2,
    reviewCount: 5
  },

  status: "active"
},


{
  title: "Mountain View Cottage in Bandarban",
  slug: "mountain-view-cottage-bandarban-022",
  agentEmail: "hillviewproperties@gmail.com",
  shortDescription: "Peaceful cottage surrounded by hills and nature.",
  description: "A beautiful cottage property located in Bandarban with stunning hill views. Suitable for vacation homes, retreats or eco tourism projects.",

  listingType: "sale",
  propertyType: "house",
  price: 6800000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Meghla Tourist Area",
    area: "Meghla",
    city: "Bandarban",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [92.2173, 22.1953]
    }
  },

  specs: {
    bedrooms: 3,
    bathrooms: 2,
    size: 1700,
    furnishing: "furnished",
    floorNumber: 1,
    yearBuilt: 2020
  },

  amenities: {
    garden: true,
    rooftopAccess: true,
    security: true,
    waterSupply: true,
    petFriendly: true
  },

  images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80"
    ],

  stats: {
    views: 510,
    saves: 36,
    avgRating: 4.7,
    reviewCount: 12
  },

  status: "active"
},


{
  title: "Modern Family Home in Cumilla",
  slug: "modern-family-home-cumilla-023",
  agentEmail: "cumillahomes@gmail.com",
  shortDescription: "Spacious residential house in a quiet neighborhood.",
  description: "A modern family home in Cumilla featuring comfortable rooms, parking space and a peaceful environment. Perfect for families looking for a suburban lifestyle.",

  listingType: "sale",
  propertyType: "house",
  price: 5800000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Kandirpar Residential Area",
    area: "Kandirpar",
    city: "Cumilla",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [91.1809, 23.4607]
    }
  },

  specs: {
    bedrooms: 3,
    bathrooms: 2,
    size: 2000,
    furnishing: "semi-furnished",
    floorNumber: 2,
    yearBuilt: 2018
  },

  amenities: {
    parkingSpots: 1,
    security: true,
    garden: true,
    gasLine: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ],

  stats: {
    views: 470,
    saves: 27,
    avgRating: 4.4,
    reviewCount: 9
  },

  status: "active"
},{
  title: "Premium Family Apartment in Mohammadpur",
  slug: "premium-family-apartment-mohammadpur-029",
  agentEmail: "cityhomesbd@gmail.com",
  shortDescription: "Spacious apartment in a well-connected residential area.",
  description: "A comfortable premium apartment located in Mohammadpur with easy access to schools, markets and transportation. The building offers modern facilities and a secure environment.",

  listingType: "sale",
  propertyType: "apartment",
  price: 10500000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Town Hall Road, Mohammadpur",
    area: "Mohammadpur",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.3588, 23.7558]
    }
  },

  specs: {
    bedrooms: 3,
    bathrooms: 3,
    size: 1700,
    furnishing: "semi-furnished",
    floorNumber: 7,
    yearBuilt: 2020
  },

  amenities: {
    lift: true,
    generator: true,
    security: true,
    cctv: true,
    parkingSpots: 1,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80"
    ],

  stats: {
    views: 610,
    saves: 44,
    avgRating: 4.6,
    reviewCount: 13
  },

  status: "active"
},


{
  title: "Modern Riverside House in Munshiganj",
  slug: "modern-riverside-house-munshiganj-030",
  agentEmail: "riverpropertybd@gmail.com",
  shortDescription: "Peaceful riverside home away from city noise.",
  description: "A beautiful riverside house with open space, fresh environment and comfortable living facilities. Suitable for families who enjoy a quiet lifestyle.",

  listingType: "sale",
  propertyType: "house",
  price: 7800000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "River View Road",
    area: "Munshiganj Sadar",
    city: "Munshiganj",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.5305, 23.5422]
    }
  },

  specs: {
    bedrooms: 4,
    bathrooms: 3,
    size: 3000,
    furnishing: "semi-furnished",
    floorNumber: 2,
    yearBuilt: 2019
  },

  amenities: {
    garden: true,
    security: true,
    waterSupply: true,
    petFriendly: true
  },

  images: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80"
    ],

  stats: {
    views: 480,
    saves: 32,
    avgRating: 4.5,
    reviewCount: 10
  },

  status: "active"
},


{
  title: "Affordable Apartment Near Khulna University",
  slug: "affordable-apartment-khulna-university-031",
  agentEmail: "khulnahomes@gmail.com",
  shortDescription: "Budget friendly apartment for families and professionals.",
  description: "A well-located apartment near Khulna University area with essential facilities and convenient transportation.",

  listingType: "rent",
  propertyType: "apartment",
  price: 22000,
  priceUnit: "per_month",
  isNegotiable: false,

  location: {
    address: "Sonadanga Residential Area",
    area: "Sonadanga",
    city: "Khulna",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [89.5403, 22.8456]
    }
  },

  specs: {
    bedrooms: 2,
    bathrooms: 2,
    size: 1000,
    furnishing: "unfurnished",
    floorNumber: 4,
    yearBuilt: 2021
  },

  amenities: {
    lift: true,
    security: true,
    cctv: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      "https://images.unsplash.com/photo-1605276374104-a64115b9c145?w=800&q=80"
    ],

  stats: {
    views: 290,
    saves: 18,
    avgRating: 4.2,
    reviewCount: 7
  },

  status: "active"
},


{
  title: "Luxury Resort Style Villa in Gazipur",
  slug: "luxury-resort-style-villa-gazipur-032",
  agentEmail: "resorthomesbd@gmail.com",
  shortDescription: "Private villa with resort-like facilities.",
  description: "A luxurious villa in Gazipur featuring large garden areas, open spaces and premium facilities. Perfect for weekend homes and family gatherings.",

  listingType: "sale",
  propertyType: "villa",
  price: 25000000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Sreepur Resort Area",
    area: "Sreepur",
    city: "Gazipur",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.4748, 24.1992]
    }
  },

  specs: {
    bedrooms: 5,
    bathrooms: 5,
    size: 6000,
    furnishing: "furnished",
    floorNumber: 2,
    yearBuilt: 2022
  },

  amenities: {
    garden: true,
    pool: true,
    security: true,
    cctv: true,
    rooftopAccess: true,
    parkingSpots: 3
  },

  images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
    ],

  stats: {
    views: 1320,
    saves: 90,
    avgRating: 4.9,
    reviewCount: 30
  },

  status: "active"
},


{
  title: "Commercial Building Floor in Wari",
  slug: "commercial-building-floor-wari-033",
  agentEmail: "commercialestatebd@gmail.com",
  shortDescription: "Office floor suitable for growing businesses.",
  description: "A commercial floor located in Wari business area. Suitable for offices, training centers and professional services.",

  listingType: "rent",
  propertyType: "office",
  price: 95000,
  priceUnit: "per_month",
  isNegotiable: true,

  location: {
    address: "Rankin Street, Wari",
    area: "Wari",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.4186, 23.7175]
    }
  },

  specs: {
    size: 2500,
    bathrooms: 2,
    floorNumber: 6,
    furnishing: "semi-furnished"
  },

  amenities: {
    lift: true,
    security: true,
    cctv: true,
    generator: true
  },

  images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&q=80"
    ],

  stats: {
    views: 360,
    saves: 19,
    avgRating: 4.3,
    reviewCount: 6
  },

  status: "active"
},


{
  title: "Modern Duplex Home in Rangpur",
  slug: "modern-duplex-home-rangpur-034",
  agentEmail: "rangpurrealestate@gmail.com",
  shortDescription: "Comfortable duplex home with modern design.",
  description: "A beautifully designed duplex home in Rangpur with spacious rooms, parking and family-friendly surroundings.",

  listingType: "sale",
  propertyType: "house",
  price: 6500000,
  priceUnit: "total",
  isNegotiable: true,

  location: {
    address: "Station Road Area",
    area: "Rangpur City",
    city: "Rangpur",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [89.2752, 25.7439]
    }
  },

  specs: {
    bedrooms: 4,
    bathrooms: 3,
    size: 2800,
    furnishing: "semi-furnished",
    floorNumber: 2,
    yearBuilt: 2020
  },

  amenities: {
    garden: true,
    security: true,
    parkingSpots: 2,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80"
    ],

  stats: {
    views: 540,
    saves: 33,
    avgRating: 4.6,
    reviewCount: 11
  },

  status: "active"
},


{
  title: "Modern Retail Space in Elephant Road",
  slug: "modern-retail-space-elephant-road-035",
  agentEmail: "retailhubdhaka@gmail.com",
  shortDescription: "Prime commercial shop location in Dhaka.",
  description: "A retail space located in Elephant Road commercial zone with excellent customer flow. Suitable for electronics, fashion and lifestyle businesses.",

  listingType: "rent",
  propertyType: "shop",
  price: 70000,
  priceUnit: "per_month",
  isNegotiable: false,

  location: {
    address: "Elephant Road",
    area: "New Market",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: {
      type: "Point",
      coordinates: [90.3856, 23.7408]
    }
  },

  specs: {
    size: 1200,
    bathrooms: 1,
    floorNumber: 1
  },

  amenities: {
    security: true,
    cctv: true,
    generator: true,
    waterSupply: true
  },

  images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80"
    ],

  stats: {
    views: 410,
    saves: 22,
    avgRating: 4.4,
    reviewCount: 8
  },

  status: "active"
}];

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
