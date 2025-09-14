import express from 'express';
import { pushVerdictToNotion } from '../notion/notionSync.js';

const router = express.Router();

// 🧠 POST /api/verdicts — Push a verdict to Notion
router.post('/verdicts', async (req, res) => {
  const verdict = req.body;

  // Validate required fields
  const required = ['symbol', 'verdict', 'capital', 'entry', 'stop', 'target', 'date'];
  const missing = required.filter(field => !verdict[field]);

  if (missing.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: `Missing required fields: ${missing.join(', ')}`
    });
  }
});

/**
 * @swagger
 * /verdict:
 *   get:
 *     summary: Retrieve all verdicts
 *     tags: [Verdict]
 *     responses:
 *       200:
 *         description: List of verdicts
 *       500:
 *         description: Internal server error
 */
router.get('/', async (_req, res) => {
  try {
    const notionResponse = await pushVerdictToNotion(verdict);

    res.status(200).json({
      status: 'success',
      message: 'Verdict synced to Notion',
      notion_id: notionResponse?.id || null,
      payload: verdict
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Notion sync failed',
      error: err.message
    });
  }
});

export default router;