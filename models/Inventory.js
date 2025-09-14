// @audit-clean: Inventory model — monetization asset lifecycle, QR support, and scrap tracking

import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: ['affiliate', 'dropship', 'promo', 'bundle'],
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    qrCode: {
      type: String,
      unique: true,
      sparse: true,
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
    department: {
      type: String,
      default: 'global',
    },
    isActive: {
      type: Boolean,
      default: true,
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
    timestamps: true, // createdAt + updatedAt
    versionKey: false,
  }
);

// 🔍 Indexing for performance
inventorySchema.index({ sku: 1 });
inventorySchema.index({ creatorId: 1, isActive: 1 });

export default mongoose.model('Inventory', inventorySchema);