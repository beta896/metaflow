// summaryRoutes.js
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { milestone, verdictChain, tierMap } = req.body;
    console.log(`📊 Summary Received: milestone=${milestone}, verdictChain=${verdictChain}, tierMap=${tierMap}`);
    res.status(201).json({ success: true, message: '✅ Summary submitted successfully', data: { milestone, verdictChain, tierMap } });
  } catch (error) {
    console.error('❌ Summary submission failed:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
