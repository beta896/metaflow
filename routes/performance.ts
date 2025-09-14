import express from 'express';
import { compareForecastToActual } from '../models/forecastTracker';

const router = express.Router();

router.get('/api/performance', (req, res) => {
  const report = compareForecastToActual();
  res.status(200).json(report);
});

export default router;
