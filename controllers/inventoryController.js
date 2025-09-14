// @audit-clean: inventoryController.js — monetization asset lifecycle, QR parsing, and scrap visibility

import Inventory from '../models/Inventory.js';
import { redis } from '../server.js';
import logger from '../utils/logger.js';

// 🔍 Fetch full inventory list
export const getInventoryList = async (req, res) => {
  try {
    const items = await Inventory.find({ isActive: true });
    res.json({ success: true, data: items });
  } catch (err) {
    logger.error(`[Inventory] Fetch list failed: ${err.message}`);
    res.status(500).json({ message: 'Failed to fetch inventory list' });
  }
};

// 🔍 Fetch single inventory item
export const getInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cached = await redis.get(`inventory:${id}`);
    if (cached) {
      logger.info(`[Inventory] Cache hit → ${id}`);
      return res.status(200).json(JSON.parse(cached));
    }

    const item = await Inventory.findById(id);
    if (!item || !item.isActive) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await redis.set(`inventory:${id}`, JSON.stringify(item), 'EX', 86400);
    logger.info(`[Inventory] Cache miss → ${id} hydrated`);
    res.status(200).json(item);
  } catch (err) {
    logger.error(`[Inventory] Fetch failed: ${err.message}`);
    res.status(500).json({ message: 'Failed to fetch inventory item' });
  }
};

// ➕ Create new inventory item
export const createInventoryItem = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      createdBy: req.user.email || 'system',
    };

    const item = await Inventory.create(payload);
    await redis.set(`inventory:${item._id}`, JSON.stringify(item), 'EX', 86400);

    logger.info(`[Inventory] Created by ${payload.createdBy} → ${item._id}`);
    res.status(201).json(item);
  } catch (err) {
    logger.error(`[Inventory] Creation failed: ${err.message}`);
    res.status(500).json({ message: 'Failed to create inventory item' });
  }
};

// ✏️ Update inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      ...req.body,
      updatedBy: req.user.email || 'system',
    };

    const updated = await Inventory.findOneAndUpdate(
      { _id: id, isActive: true },
      updates,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await redis.set(`inventory:${id}`, JSON.stringify(updated), 'EX', 86400);
    logger.info(`[Inventory] Updated by ${updates.updatedBy} → ${id}`);
    res.status(200).json(updated);
  } catch (err) {
    logger.error(`[Inventory] Update failed: ${err.message}`);
    res.status(500).json({ message: 'Failed to update inventory item' });
  }
};

// ❌ Soft delete inventory item
export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Inventory.findOneAndUpdate(
      { _id: id, isActive: true },
      {
        isActive: false,
        deletedAt: new Date(),
        updatedBy: req.user.email || 'system',
      },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await redis.del(`inventory:${id}`);
    logger.info(`[Inventory] Soft-deleted by ${req.user.email} → ${id}`);
    res.status(200).json({ message: 'Item successfully deleted', data: deleted });
  } catch (err) {
    logger.error(`[Inventory] Deletion failed: ${err.message}`);
    res.status(500).json({ message: 'Failed to delete inventory item' });
  }
};

// 📲 Scan QR code and fetch item
export const scanQRCode = async (req, res) => {
  try {
    const { qrCode } = req.body;
    const item = await Inventory.findOne({ qrCode, isActive: true });

    if (!item) {
      return res.status(404).json({ message: 'QR code not linked to any item' });
    }

    logger.info(`[Inventory] QR scan → ${qrCode} → ${item._id}`);
    res.status(200).json(item);
  } catch (err) {
    logger.error(`[Inventory] QR scan failed: ${err.message}`);
    res.status(500).json({ message: 'Failed to scan QR code' });
  }
};

// 📊 Fetch scrap summary
export const getScrapSummary = async (req, res) => {
  try {
    const summary = await Inventory.aggregate([
      { $match: { isActive: false } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
    ]);

    logger.info(`[Inventory] Scrap summary generated`);
    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    logger.error(`[Inventory] Scrap summary failed: ${err.message}`);
    res.status(500).json({ message: 'Failed to generate scrap summary' });
  }
};