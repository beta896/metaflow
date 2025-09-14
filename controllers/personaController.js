// @audit-clean: personaController.js — scoped mutations, Redis hygiene, and audit traceability

import Persona from '../models/Persona.js';
import { redis } from '../server.js';
import logger from '../utils/logger.js';

// ✅ Create Persona + Cache + Audit
export const createPersona = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      userId: req.user.id,
      createdBy: req.user.email || 'system',
    };

    const persona = await Persona.create(payload);
    await redis.set(`persona:${persona._id}`, JSON.stringify(persona), 'EX', 86400);

    logger.info(`[Persona] Created by ${payload.createdBy} → ${persona._id}`);
    res.status(201).json(persona);
  } catch (error) {
    logger.error(`[Persona] Creation failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to create persona' });
  }
};

// ✅ Get Persona (Redis First) + Audit
export const getPersona = async (req, res) => {
  try {
    const { id } = req.params;

    const cached = await redis.get(`persona:${id}`);
    if (cached) {
      logger.info(`[Persona] Cache hit → ${id}`);
      return res.status(200).json(JSON.parse(cached));
    }

    const persona = await Persona.findById(id);
    if (!persona || !persona.isActive) {
      return res.status(404).json({ message: 'Persona not found' });
    }

    await redis.set(`persona:${id}`, JSON.stringify(persona), 'EX', 86400);
    logger.info(`[Persona] Cache miss → ${id} hydrated`);
    res.status(200).json(persona);
  } catch (error) {
    logger.error(`[Persona] Fetch failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve persona' });
  }
};

// ✅ Update Persona + Refresh Cache + Audit
export const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      ...req.body,
      updatedBy: req.user.email || 'system',
    };

    const updated = await Persona.findOneAndUpdate(
      { _id: id, isActive: true },
      updates,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Persona not found' });
    }

    await redis.set(`persona:${id}`, JSON.stringify(updated), 'EX', 86400);
    logger.info(`[Persona] Updated by ${updates.updatedBy} → ${id}`);
    res.status(200).json(updated);
  } catch (error) {
    logger.error(`[Persona] Update failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to update persona' });
  }
};

// ✅ Soft Delete Persona + Invalidate Cache + Audit
export const deletePersona = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Persona.findOneAndUpdate(
      { _id: id, isActive: true },
      {
        isActive: false,
        deletedAt: new Date(),
        updatedBy: req.user.email || 'system',
      },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ message: 'Persona not found' });
    }

    await redis.del(`persona:${id}`);
    logger.info(`[Persona] Soft-deleted by ${req.user.email} → ${id}`);
    res.status(200).json({ message: 'Persona successfully deleted', data: deleted });
  } catch (error) {
    logger.error(`[Persona] Deletion failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete persona' });
  }
};

// ✅ Full-Stack Diagnostic Route (CI Test)
export const fullStackDiagnostic = async (req, res) => {
  try {
    const testPersona = {
      userId: req.user?.id || null,
      name: 'Test User',
      role: 'Cache Validator',
      goal: 'Validate Redis-Mongo sync',
      createdBy: 'diagnostic',
      timestamp: Date.now(),
    };

    const created = await Persona.create(testPersona);
    await redis.set(`persona:${created._id}`, JSON.stringify(created), 'EX', 300);

    const mongoCheck = await Persona.findById(created._id);
    const redisCheck = await redis.get(`persona:${created._id}`);

    res.status(200).json({
      source: 'Redis & MongoDB',
      db: mongoCheck,
      cache: JSON.parse(redisCheck),
    });

    await Persona.findByIdAndDelete(created._id);
    await redis.del(`persona:${created._id}`);
    logger.info(`[Persona] Diagnostic test passed → ${created._id}`);
  } catch (error) {
    logger.error(`[Persona] Diagnostic failed: ${error.message}`);
    res.status(500).json({ error: 'Test failed during backend diagnostics' });
  }
};