const express = require('express');
const router = express.Router();
const Affiliate = require('../models/Affiliate');

function generateCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

router.post('/register', async (req, res) => {
  const { name, email } = req.body;
  const referralCode = generateCode();
  const affiliate = new Affiliate({ name, email, referralCode, profitGenerated: 0 });
  await affiliate.save();
  res.json({ referralCode });
});

router.post('/track', async (req, res) => {
  const { referralCode, profit } = req.body;
  const affiliate = await Affiliate.findOne({ referralCode });
  if (!affiliate) return res.status(404).send('Affiliate not found');
  affiliate.profitGenerated += profit;
  await affiliate.save();
  res.json({ updated: true });
});

module.exports = router;
