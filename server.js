const express = require('express');
const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);
const app = express();
const mongoose = require('mongoose');
const affiliateRoutes = require('./routes/affiliate');

app.use(express.json());
app.use('/api/affiliate', affiliateRoutes);

mongoose.connect('mongodb://localhost:27017/metaflow', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('[mongo] Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('?? Affiliate engine cockpit is live');
});

app.listen(3000, () => {
  console.log('[engine-start] Metaflow running at http://localhost:3000');
});

