import express from 'express';
import { getVerdicts } from '../models/verdictStore';

const router = express.Router();

router.get('/api/verdicts', (req, res) => {
  res.status(200).json(getVerdicts());
});

export default router;
