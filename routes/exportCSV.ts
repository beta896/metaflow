import express from 'express';
import { Parser } from 'json2csv';
import { Verdict } from '../models/verdict.model';

const router = express.Router();

// ?? Export verdicts as CSV
router.get('/verdicts', async (_req, res) => {
  try {
    const verdicts = await Verdict.find().lean();

    const fields = ['title', 'decision', 'symbol', 'tags', 'timestamp', 'author'];
    const parser = new Parser({ fields });
    const csv = parser.parse(verdicts);

    res.header('Content-Type', 'text/csv');
    res.attachment('verdicts.csv');
    res.send(csv);
  } catch (err) {
    console.error('[CSV] Export error:', err.message);
    res.status(500).json({ message: 'Failed to export verdicts' });
  }
});

export default router;
