const express = require('express');
const mongoose = require('mongoose');
const affiliateRoutes = require('./routes/affiliate');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(express.json());
app.use('/api/affiliate', affiliateRoutes);
app.use('/api/dashboard', dashboardRoutes);

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
