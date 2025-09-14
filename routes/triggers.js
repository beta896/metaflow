const express = require('express');
const router = express.Router();
const { createTrigger } = require('../controllers/triggerController');

// ?? Log a capital trigger
router.post('/', createTrigger);

module.exports = router;
