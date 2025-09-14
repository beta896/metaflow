// @audit-clean: affiliateRoutes.js — scoped access, cache hygiene, and modular control

import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/authMiddleware.js';
import {
  getAllAffiliates,
  getAffiliateById,
  deleteAffiliate
} from '../controllers/affiliateController.js';

const router = express.Router();

/**
 * @route   GET /api/affiliates
 * @desc    Return full affiliate list (cached)
 * @access  Authenticated users
 */
router.get('/', verifyToken, getAllAffiliates);

/**
 * @route   GET /api/affiliates/:id
 * @desc    Fetch single affiliate by ID (Redis fallback)
 * @access  Authenticated users
 */
router.get('/:id', verifyToken, getAffiliateById);

/**
 * @route   DELETE /api/affiliates/:id
 * @desc    Delete affiliate by ID + purge cache
 * @access  Admin only
 */
router.delete('/:id', verifyToken, requireRole('admin'), deleteAffiliate);

export default router;
module.exports = router;
