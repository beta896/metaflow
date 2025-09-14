import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['success', 'warning', 'error'], required: true },
  message: { type: String, required: true },
  context: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema);
