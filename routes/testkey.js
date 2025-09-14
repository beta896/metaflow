const express = require('express');
const router = express.Router();

router.get('/testkey', (req, res) => {
  const role = req.query.role || 'guest';
  const verdict = ['admin', 'auditor', 'prophet'].includes(role)
    ? \✅ Role \ is authorized for symbolic testing.\
    : \❌ Role \ lacks covenantal access.\;

  res.json({ role, verdict, timestamp: new Date().toISOString() });
});

module.exports = router;
