import express from 'express';
const router = express.Router();
const { Offer } = require('./models'); // Adjust path if needed

// POST: Create an offer
router.post('/', async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json({ message: 'Offer created', offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: List all offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.findAll();
    res.status(200).json({ offers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
