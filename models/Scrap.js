// @audit-clean: Scrap model — tracks discarded inventory with lifecycle metadata

import mongoose from 'mongoose';

const scrapSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
      required: true,
      index: true,
    },
    reason: {
      type: String,
      enum: ['damaged', 'expired', 'recalled', 'manual'],
      required: true,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
    department: {
      type: String,
      default: 'global',
    },
    scrappedBy: {
      type: String,
      default: 'system',
    },
    scrappedAt: {
      type: Date,
      default: Date.now,
    },
    isReversible: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🔍 Indexing for traceability
scrapSchema.index({ inventoryId: 1, scrappedAt: -1 });

export default mongoose.model('Scrap', scrapSchema);