const express = require("express");
const { logAction } = require("../utils/auditLogger");
const authenticateUser = require("../middleware/auth");
const Revenue = require("../models/Revenue");
const router = express.Router();

// Fetch revenue trend data for visualization
router.get("/revenue-trends", authenticateUser, async (req, res) => {
  try {
    const revenueHistory = await Revenue.findAll({ where: { user_id: req.userId }, order: [["month", "ASC"]] });
    res.json({ success: true, data: revenueHistory });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving revenue trends", error });
  }
});

module.exports = router;
