import express from 'express';
import { forecastCampaignRevenue } from '../models/campaignForecaster';

const router = express.Router();

router.get('/api/forecast', (req, res) => {
  const forecast = forecastCampaignRevenue();
  res.status(200).json(forecast);
});

export default router;
