import express from 'express';
import { logVerdictToNotion } from '../models/notionLogger';

const router = express.Router();

router.post('/api/logVerdict', async (req, res) => {
  const { profile, verdict, offers } = req.body;
  await logVerdictToNotion(profile, verdict, offers);
  res.status(200).send({ status: 'Logged' });
});

export default router;
