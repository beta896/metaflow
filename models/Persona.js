// @audit-clean: personaModel.js — versioned, traceable, and segmentation-ready

import mongoose from 'mongoose';

const personaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['viewer', 'editor', 'admin', 'guest'], // Extendable
    },
    goal: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
    createdBy: {
      type: String,
      default: 'system',
    },
    updatedBy: {
      type: String,
      default: 'system',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    versionKey: false,
  }
);

// 🔍 Index for fast lookup
personaSchema.index({ userId: 1, isActive: 1 });

export default mongoose.model('Persona', personaSchema);