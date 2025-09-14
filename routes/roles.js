import express from 'express';
import { getRole } from '../controllers/roleController.js';

const router = express.Router();
router.get('/getRole', getRole);

export default router;
