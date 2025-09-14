const express = require('express');
const router = express.Router();
const Affiliate = require('../models/Affiliate');

function getTier(profit) {
  if (profit >= 10000) return '?? Gold';
  if (profit >= 5000) return '?? Silver';
  if (profit >= 1000) return '?? Bronze';
  return '?? Starter';
}

router.get('/summary', async (req, res) => {
  try {
    const affiliates = await Affiliate.find({});
    const summary = affiliates.map(a => ({
      name: a.name,
      referralCode: a.referralCode,
      profit: a.profitGenerated,
      tier: getTier(a.profitGenerated)
    }));
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: 'Dashboard error', details: err.message });
  }
});

module.exports = router;
