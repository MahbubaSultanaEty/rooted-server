import express from 'express';
import { Property } from '../models/Property.js';
import { User } from '../models/User.js';
import { requireAuth, requireAdmin } from '../middleware/requireAuth.js';

const router = express.Router();

// GET /api/properties (public)
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

    if (search) {
      query.$text = { $search: search };
    }
    if (city) query['location.city'] = city;
    if (propertyType) query.propertyType = propertyType;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (bedrooms) {
      query['specs.bedrooms'] = Number(bedrooms);
    } else if (minBedrooms) {
      query['specs.bedrooms'] = { $gte: Number(minBedrooms) };
    }

    let sortObj = {};
    if (sort) {
      const isDesc = sort.startsWith('-');
      const field = isDesc ? sort.substring(1) : sort;
      sortObj[field] = isDesc ? -1 : 1;
    } else {
      sortObj = { createdAt: -1 };
    }
    if (search && !sort) {
      sortObj = { score: { $meta: 'textScore' } };
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));
    const skip = (pageNum - 1) * limitNum;

    const properties = await Property.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .populate('listedBy', 'name email avatarUrl');

    const total = await Property.countDocuments(query);
    const pages = Math.ceil(total / limitNum);

    res.json({
      data: properties,
      pagination: { total, page: pageNum, pages, limit: limitNum },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET /api/properties/manage/me (auth required — user's own listings)
router.get('/manage/me', requireAuth, async (req, res) => {
  try {
    const properties = await Property.find({ listedBy: req.user.id }).sort({ createdAt: -1 });
    res.json({ data: properties });
  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({ error: 'Failed to fetch your properties' });
  }
});

// GET /api/properties/admin/all (admin only — all properties for dashboard)
router.get('/admin/all', requireAdmin, async (req, res) => {
  try {
    const properties = await Property.find({}).sort({ createdAt: -1 }).populate('listedBy', 'name email');
    res.json({ data: properties });
  } catch (error) {
    console.error('Error fetching all properties (admin):', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET /api/properties/:id (public)
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

// POST /api/properties (auth required — create new listing)
router.post('/', requireAuth, async (req, res) => {
  try {
    const {
      title, shortDescription, description,
      price, priceUnit, listingType, propertyType, isNegotiable,
      bedrooms, bathrooms, size, furnishing, floorNumber, yearBuilt,
      address, area, city,
      imageUrl,
      amenities,
    } = req.body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);

    const property = new Property({
      title,
      slug,
      shortDescription,
      description,
      price: Number(price),
      priceUnit: priceUnit || (listingType === 'rent' ? 'per_month' : 'total'),
      listingType,
      propertyType,
      isNegotiable: !!isNegotiable,
      location: {
        address,
        area,
        city,
        coordinates: { type: 'Point', coordinates: [90.4125, 23.8103] },
      },
      specs: {
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        bathrooms: bathrooms ? Number(bathrooms) : undefined,
        size: size ? Number(size) : undefined,
        furnishing: furnishing || undefined,
        floorNumber: floorNumber ? Number(floorNumber) : undefined,
        yearBuilt: yearBuilt ? Number(yearBuilt) : undefined,
      },
      amenities: amenities || {},
      images: imageUrl ? [imageUrl] : [],
      listedBy: req.user.id,
      status: 'active',
    });

    await property.save();
    res.status(201).json({ data: property, message: 'Property listed successfully!' });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// PUT /api/properties/:id (auth required — owner or admin)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    if (property.listedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You can only edit your own listings' });
    }

    const {
      title, shortDescription, description,
      price, priceUnit, listingType, propertyType, isNegotiable,
      bedrooms, bathrooms, size, furnishing, floorNumber, yearBuilt,
      address, area, city,
      imageUrl,
      amenities,
    } = req.body;

    if (title) property.title = title;
    if (shortDescription) property.shortDescription = shortDescription;
    if (description) property.description = description;
    if (price) property.price = Number(price);
    if (priceUnit) property.priceUnit = priceUnit;
    if (listingType) property.listingType = listingType;
    if (propertyType) property.propertyType = propertyType;
    if (isNegotiable !== undefined) property.isNegotiable = !!isNegotiable;

    if (address || area || city) {
      property.location = {
        ...property.location.toObject(),
        ...(address && { address }),
        ...(area && { area }),
        ...(city && { city }),
      };
    }

    property.specs = {
      ...property.specs?.toObject(),
      ...(bedrooms !== undefined && { bedrooms: Number(bedrooms) }),
      ...(bathrooms !== undefined && { bathrooms: Number(bathrooms) }),
      ...(size !== undefined && { size: Number(size) }),
      ...(furnishing && { furnishing }),
      ...(floorNumber !== undefined && { floorNumber: Number(floorNumber) }),
      ...(yearBuilt !== undefined && { yearBuilt: Number(yearBuilt) }),
    };

    if (amenities) property.amenities = amenities;
    if (imageUrl) property.images = [imageUrl];

    await property.save();
    res.json({ data: property, message: 'Property updated successfully!' });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});

// DELETE /api/properties/:id (auth required — owner or admin)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    if (property.listedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You can only delete your own listings' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

export default router;
