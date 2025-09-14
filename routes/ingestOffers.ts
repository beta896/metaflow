import express from 'express';
import Offer from '../models/offer.model';

const router = express.Router();

// ?? Ingest offers from external source
router.post('/', async (req, res) => {
  const offers = req.body.offers;

  try {
    const results = await Promise.all(
      offers.map(async (offer) => {
        const exists = await Offer.findOne({ offerId: offer.offerId });
        if (exists) return null;
        const newOffer = new Offer(offer);
        return await newOffer.save();
      })
    );

    const ingested = results.filter(Boolean);
    res.status(201).json({ message: 'Offers ingested', count: ingested.length });
  } catch (err) {
    console.error('[Offer] Ingestion error:', err.message);
    res.status(500).json({ message: 'Failed to ingest offers' });
  }
});

export default router;
