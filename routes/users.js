import express from 'express';
import { requireAdmin } from '../middleware/requireAuth.js';
import { MongoClient, ObjectId } from 'mongodb';

const router = express.Router();

// Use Better Auth's MongoDB client to query the user collection
const getDB = () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  return client;
};

// Apply admin auth to all user routes
router.use(requireAdmin);

// GET /api/users — list all users
router.get('/', async (req, res) => {
  const client = getDB();
  try {
    await client.connect();
    const db = client.db();
    const users = await db
      .collection('user')
      .find({})
      .project({ passwordHash: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  } finally {
    await client.close();
  }
});

// DELETE /api/users/:id — delete a user
router.delete('/:id', async (req, res) => {
  // Prevent admin from deleting themselves
  if (req.params.id === req.user.id) {
    return res.status(400).json({ error: 'Cannot delete your own account' });
  }

  const client = getDB();
  try {
    await client.connect();
    const db = client.db();

    // Better Auth uses string IDs, try both string match and ObjectId
    let result;
    try {
      result = await db.collection('user').deleteOne({ _id: new ObjectId(req.params.id) });
    } catch {
      result = await db.collection('user').deleteOne({ id: req.params.id });
    }

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  } finally {
    await client.close();
  }
});

export default router;
