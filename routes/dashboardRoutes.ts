import express from 'express';
import User from '../models/User';
import { Verdict } from '../models/verdict.model';
import Offer from '../models/offer.model';
import OfferClick from '../models/offerClick.model';

const router = express.Router();

// ?? Dashboard summary
router.get('/summary', async (_req, res) => {
  try {
    const [userCount, verdictCount, offerCount, clickCount] = await Promise.all([
      User.countDocuments(),
      Verdict.countDocuments(),
      Offer.countDocuments(),
      OfferClick.countDocuments()
    ]);

    res.json({
      users: userCount,
      verdicts: verdictCount,
      offers: offerCount,
      clicks: clickCount,
      timestamp: new Date()
    });
  } catch (err) {
    console.error('[Dashboard] Summary error:', err.message);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

export default router;
