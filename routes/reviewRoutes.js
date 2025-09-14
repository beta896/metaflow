// reviewRoutes.js
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { verdict, tier, notes } = req.body;
    console.log(`📝 Review Logged: tier ${tier} | verdict: ${verdict} | notes: ${notes}`);
    res.status(201).json({ success: true, message: '✅ Review submitted successfully', data: { verdict, tier, notes } });
  } catch (error) {
    console.error('❌ Review submission failed:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
