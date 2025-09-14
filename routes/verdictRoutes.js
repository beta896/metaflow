// verdictRoutes.js � Verdict API Routes

import express from 'express';
import { Verdict } from '../models/verdictModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const verdict = new Verdict(req.body);
    await verdict.save();

    console.log(`[verdict] Ingested:`, verdict);

    res.status(201).json({
      success: true,
      message: '? Verdict ingested successfully',
      data: verdict
    });
  } catch (error) {
    console.error('[verdict] Ingestion failed:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      details: error.message
    });
  }
});

export default router;
