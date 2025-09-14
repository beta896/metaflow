// @audit-clean: Affiliate controller with Redis caching, audit logging, and monetization hook

import AffiliatePartner from '../models/AffiliatePartner.js';
import { redisClient } from '../config/redisClient.js'; // ✅ Direct import, no circular dependency
import AuditLog from '../models/AuditLog.js';
import { trackEarnings } from '../utils/metaFlow.js'; // ✅ Monetization hook

// 🔹 GET all affiliates (with Redis caching)
export const getAllAffiliates = async (req, res) => {
  try {
    const cacheKey = 'affiliates:all';

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    const affiliates = await AffiliatePartner.find({});
    await redisClient.set(cacheKey, JSON.stringify(affiliates), { EX: 3600 }); // 1 hour TTL

    res.status(200).json(affiliates);
  } catch (error) {
    console.error('❌ Error fetching affiliates:', error);
    res.status(500).json({ error: 'Failed to fetch affiliates' });
  }
};

// 🔹 GET specific affiliate by ID (with Redis fallback)
export const getAffiliateById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `affiliate:${id}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    const affiliate = await AffiliatePartner.findById(id);
    if (!affiliate) {
      return res.status(404).json({ message: 'Affiliate not found' });
    }

    await redisClient.set(cacheKey, JSON.stringify(affiliate), { EX: 3600 }); // 1 hour TTL
    res.status(200).json(affiliate);
  } catch (error) {
    console.error('❌ Error fetching affiliate:', error);
    res.status(500).json({ error: 'Failed to retrieve affiliate' });
  }
};

// 🔹 DELETE affiliate by ID (invalidate Redis + log + earnings)
export const deleteAffiliate = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `affiliate:${id}`;
    const allKey = 'affiliates:all';

    const deleted = await AffiliatePartner.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Affiliate not found' });
    }

    // 🔍 Invalidate caches
    await redisClient.del(cacheKey);
    await redisClient.del(allKey);

    // 🧾 Log the deletion in AuditLog
    await AuditLog.create({
      entity: 'AffiliatePartner',
      entityId: id,
      action: 'DELETE',
      performedBy: req.user?.id || 'system',
      timestamp: new Date().toISOString(),
      source: 'controller:affiliate',
    });

    // 💰 Track deletion as part of MetaFlow earnings logic
    await trackEarnings({
      module: 'affiliate',
      action: 'delete',
      entityId: id,
      performedBy: req.user?.id || 'system',
    });

    res.status(200).json({ message: 'Affiliate successfully deleted' });
  } catch (error) {
    console.error('❌ Error deleting affiliate:', error);
    res.status(500).json({ error: 'Failed to delete affiliate' });
  }
};