const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('?? Metaflow backend cockpit is live');
});

app.listen(3000, () => {
  console.log('[engine-start] Metaflow running at http://localhost:3000');
});
