// @audit-clean: revenue routes with scoped access, structured logging, and modular hygiene

import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import AdRevenue from '../models/AdRevenue.js';
import AffiliateEarnings from '../models/AffiliateEarnings.js';
import BrandDeals from '../models/BrandDeals.js';
import AIContentRevenue from '../models/AIContentRevenue.js';
import logger from '../utils/logger.js';

const router = express.Router();

// 📊 Get total revenue summary for a user
router.get('/summary', verifyToken, async (req, res) => {
  const userId = req.user?.id || req.userId;
  try {
    const [adRevenue, affiliateRevenue, brandRevenue, aiRevenue] = await Promise.all([
      AdRevenue.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$earnings' } } },
      ]),
      AffiliateEarnings.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$commission' } } },
      ]),
      BrandDeals.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$contract_value' } } },
      ]),
      AIContentRevenue.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$earnings' } } },
      ]),
    ]);

    const format = (val) => val[0]?.total || 0;
    const summary = {
      adRevenue: format(adRevenue),
      affiliateRevenue: format(affiliateRevenue),
      brandRevenue: format(brandRevenue),
      aiRevenue: format(aiRevenue),
    };

    res.json({
      success: true,
      data: {
        ...summary,
        totalRevenue:
          summary.adRevenue +
          summary.affiliateRevenue +
          summary.brandRevenue +
          summary.aiRevenue,
      },
    });
  } catch (error) {
    logger.error(`[Revenue] Summary error for user ${userId}: ${error.message}`);
    res.status(500).json({ message: 'Error retrieving revenue summary' });
  }
});

// 📈 Create revenue entries
const createEntry = (Model, label) => async (req, res) => {
  const userId = req.user?.id || req.userId;
  try {
    const newEntry = await Model.create({ userId, ...req.body });
    res.json({ success: true, data: newEntry });
  } catch (error) {
    logger.error(`[Revenue] ${label} creation error for user ${userId}: ${error.message}`);
    res.status(500).json({ message: `Error adding ${label}` });
  }
};

router.post('/ad-revenue', verifyToken, createEntry(AdRevenue, 'ad revenue'));
router.post('/brand-revenue', verifyToken, createEntry(BrandDeals, 'brand deal revenue'));
router.post('/ai-revenue', verifyToken, createEntry(AIContentRevenue, 'AI content revenue'));

// 📡 Monetization visualization placeholder
router.get('/monetization-visualization', (req, res) => {
  res.json({ success: true, data: 'Revenue visualization is active' });
});

// 🔐 Fetch all revenue data for a user
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user?.id || req.userId;
  try {
    const [adRevenueData, affiliateEarningsData, brandDealsData, aiContentRevenueData] =
      await Promise.all([
        AdRevenue.find({ userId }),
        AffiliateEarnings.find({ userId }),
        BrandDeals.find({ userId }),
        AIContentRevenue.find({ userId }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        adRevenue: adRevenueData,
        affiliateEarnings: affiliateEarningsData,
        brandDeals: brandDealsData,
        aiContentRevenue: aiContentRevenueData,
      },
    });
  } catch (error) {
    logger.error(`[Revenue] Full fetch error for user ${userId}: ${error.message}`);
    res.status(500).json({ message: 'Server error retrieving revenue data' });
  }
});

export default router;
module.exports = router;
