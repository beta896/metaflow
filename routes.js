const express = require('express');
const router = express.Router();

// Controllers
const { getRole } = require('./controllers/roleController');
const { getImpactSummary } = require('./controllers/impactController');
const { notifyConversion } = require('./controllers/conversionController');
const { runWeeklyRitual } = require('./controllers/ritualController');

// Routes
router.get('/getRole', getRole);
router.get('/impact', getImpactSummary);
router.post('/conversion', notifyConversion);
router.post('/ritual/weekly', async (req, res) => {
  try {
    await runWeeklyRitual();
    res.status(200).json({ message: 'Weekly ritual executed successfully.' });
  } catch (err) {
    console.error('[Ritual] Execution failed:', err.message);
    res.status(500).json({ error: 'Ritual execution failed.' });
  }
});

module.exports = router;