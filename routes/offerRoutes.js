// offerRoutes.js
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, payout, source } = req.body;
    console.log(`📦 Offer Ingested: ${name} | payout: ${payout} | source: ${source}`);
    res.status(201).json({ success: true, message: '✅ Offer ingestion successful', data: { name, payout, source } });
  } catch (error) {
    console.error('❌ Offer ingestion failed:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
