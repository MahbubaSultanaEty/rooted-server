import express from 'express';
import { Property } from '../models/Property.js';
import { User } from '../models/User.js';

const router = express.Router();

// GET /api/properties
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      search,
      city,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      minBedrooms,
      sort,
    } = req.query;

    const query = { status: 'active' };

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Exact matches
    if (city) query['location.city'] = city;
    if (propertyType) query.propertyType = propertyType;

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Bedrooms
    if (bedrooms) {
      query['specs.bedrooms'] = Number(bedrooms);
    } else if (minBedrooms) {
      query['specs.bedrooms'] = { $gte: Number(minBedrooms) };
    }

    // Sorting
    let sortObj = {};
    if (sort) {
      // sort format: "-createdAt" or "price"
      const isDesc = sort.startsWith('-');
      const field = isDesc ? sort.substring(1) : sort;
      sortObj[field] = isDesc ? -1 : 1;
    } else {
      // Default: newest first
      sortObj = { createdAt: -1 };
    }
    
    // For text search relevance sorting
    if (search && !sort) {
      sortObj = { score: { $meta: 'textScore' } };
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const properties = await Property.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .populate('listedBy', 'name email avatarUrl'); // Assuming User model has these

    const total = await Property.countDocuments(query);
    const pages = Math.ceil(total / limitNum);

    res.json({
      data: properties,
      pagination: {
        total,
        page: pageNum,
        pages,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET /api/properties/:id
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findOne({
      $or: [{ slug: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }]
    }).populate('listedBy', 'name email avatarUrl');
    
    if (!property) return res.status(404).json({ error: 'Property not found' });
    
    res.json({ data: property });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

export default router;
