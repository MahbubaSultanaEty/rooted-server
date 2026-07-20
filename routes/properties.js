import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Properties route placeholder' });
});

export default router;
