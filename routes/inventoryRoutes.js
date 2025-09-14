// @audit-clean: inventoryRoutes.js — lifecycle tracking, scoped mutations, and audit visibility

import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/authMiddleware.js';
import {
  getInventoryList,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  scanQRCode,
  getScrapSummary
} from '../controllers/inventoryController.js';

const router = express.Router();

// 🔍 Fetch full inventory list
router.get('/', verifyToken, getInventoryList);

// 🔍 Fetch single inventory item
router.get('/:id', verifyToken, getInventoryItem);

// ➕ Create new inventory item
router.post('/', verifyToken, requireRole('admin'), createInventoryItem);

// ✏️ Update inventory item
router.put('/:id', verifyToken, requireRole('admin'), updateInventoryItem);

// ❌ Soft delete inventory item
router.delete('/:id', verifyToken, requireRole('admin'), deleteInventoryItem);

// 📲 Scan QR code and fetch item
router.post('/scan', verifyToken, scanQRCode);

// 📊 Fetch scrap summary across departments
router.get('/scrap-summary', verifyToken, requireRole('admin'), getScrapSummary);

export default router;
module.exports = router;
