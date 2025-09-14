// controllers/revenueController.js
import RevenueSnapshot from '../models/RevenueSnapshot.js';
import { fetchMonetizationData, triggerAutomationFlow } from '../services/monetizationService.js';

export const getRevenueData = async (req, res) => {
  try {
    const userId = req.user?.id;

    const revenueData = await RevenueSnapshot.find().sort({ timestamp: -1 }).limit(20);
    const monetizationData = await fetchMonetizationData(userId);
    await triggerAutomationFlow({ userId, action: 'syncRevenueSnapshot' });

    res.json({
      success: true,
      internal: revenueData,
      external: monetizationData,
    });
  } catch (error) {
    console.error('Revenue controller error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching revenue data',
      error: error.message,
    });
  }
};