import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Reviews route placeholder' });
});

export default router;
