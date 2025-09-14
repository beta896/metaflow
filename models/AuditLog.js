import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  entity: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  action: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], default: 'DELETE' },
  performedBy: { type: String }, // Optional: user ID or system
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('AuditLog', auditLogSchema);