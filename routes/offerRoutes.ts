import express from 'express';
import OfferClick from '../models/offerClick.model';

const router = express.Router();

// ?? Track offer click with payout
router.post('/track', async (req, res) => {
  const { userId, offerId, source, campaign, payout, currency } = req.body;

  try {
    const click = new OfferClick({
      userId,
      offerId,
      source,
      campaign,
      payout,
      currency,
      timestamp: new Date()
    });

    await click.save();
    res.status(201).json({ message: 'Offer click tracked', click });
  } catch (err) {
    console.error(\[Offer] Tracking error: \\);
    res.status(500).json({ message: 'Failed to track click' });
  }
});

// ?? Performance summary
router.get('/performance', async (_req, res) => {
  try {
    const clicks = await OfferClick.aggregate([
      {
        \\\: {
          _id: '\\\',
          totalClicks: { \\\: 1 },
          totalPayout: { \\\: '\\\' },
          conversions: {
            \\\: {
              \\\: [{ \\\: ['\\\', true] }, 1, 0]
            }
          }
        }
      }
    ]);

    res.json({ performance: clicks });
  } catch (err) {
    console.error('[Offer] Performance error:', err.message);
    res.status(500).json({ message: 'Failed to fetch performance data' });
  }
});

export default router;
const { syncPayoutToNotion } = require('../utils/syncPayoutToNotion');

await syncPayoutToNotion({
  offerId: click.offerId,
  source: click.source,
  payout: click.payout,
  currency: click.currency,
  converted: true
});
const { notifyConversion } = require('../utils/notifyConversion');

await notifyConversion({
  offerId: click.offerId,
  payout: click.payout,
  source: click.source
});
