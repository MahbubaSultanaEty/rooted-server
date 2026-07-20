import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Recommendations route placeholder' });
});

export default router;
