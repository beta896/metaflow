import express from 'express';
import { Verdict } from '../models/verdict.model';

const router = express.Router();

/**
 * @swagger
 * /verdict:
 *   post:
 *     summary: Log a verdict with test/question/response IDs
 *     tags: [Verdict]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testId:
 *                 type: string
 *               questionId:
 *                 type: string
 *               responseId:
 *                 type: string
 *               verdict:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Verdict logged successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  try {
    const verdict = new Verdict(req.body);
    await verdict.save();
    res.status(201).json(verdict);
  } catch (err) {
    console.error('❌ Verdict Save Error:', err.message);
    res.status(500).json({ error: 'Failed to save verdict' });
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
    const verdicts = await Verdict.find().sort({ timestamp: -1 });
    res.json(verdicts);
  } catch (err) {
    console.error('❌ Verdict Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch verdicts' });
  }
});

export default router;