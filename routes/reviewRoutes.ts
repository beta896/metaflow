import express from 'express';
import Review from '../models/review.model';

const router = express.Router();

// ?? Submit a review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    console.error('[Review] Submission error:', err.message);
    res.status(500).json({ message: 'Failed to submit review' });
  }
});

// ?? Get reviews for an entity
router.get('/:entityType/:entityId', async (req, res) => {
  const { entityType, entityId } = req.params;

  try {
    const reviews = await Review.find({ entityType, entityId });
    res.json({ reviews });
  } catch (err) {
    console.error('[Review] Fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

export default router;
