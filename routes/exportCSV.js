// exportCSV.js
import express from 'express';
import { Parser } from 'json2csv';
import { Verdict } from '../models/verdictModel.js';
const router = express.Router();
router.get('/', async (req, res) => {
  const verdicts = await Verdict.find().lean();
  const csv = new Parser().parse(verdicts);
  res.header('Content-Type', 'text/csv');
  res.attachment('verdicts.csv');
  res.send(csv);
});
export default router;
