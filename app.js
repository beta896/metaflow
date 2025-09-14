// app.js (ES module version)

import express from 'express';
import mongoose from 'mongoose';

import auditRoutes from './auditRoutes.js';
import prophecyRoutes from './prophecyRoutes.js';
import offerRoutes from './offerRoutes.js';
import verdictRoutes from './routes/verdicts.js';
import triggerRoutes from './routes/triggers.js';
import milestoneRoutes from './routes/milestones.js';

const app = express();
app.use(express.json());

app.use('/api/audit', auditRoutes);
app.use('/api/prophecy', prophecyRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/verdicts', verdictRoutes);
app.use('/api/triggers', triggerRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/verdicts', verdictRoutes);

mongoose.connect('mongodb://localhost:27017/founderSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});