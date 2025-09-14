import express from "express";
import Audit from "../models/Audit.js"; // Make sure this path matches your actual model location

const router = express.Router();

// GET all audit logs
router.get("/", async (req, res) => {
  try {
    const logs = await Audit.find({});
    res.status(200).json(logs);
  } catch (error) {
    console.error("❌ Error fetching audit logs:", error);
    res.status(500).json({ error: "Failed to retrieve audit logs" });
  }
});

// POST a new audit log
router.post("/", async (req, res) => {
  try {
    const { action, role, verdict } = req.body;

    if (!action || !role || !verdict) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const log = await Audit.create({ action, role, verdict });
    res.status(201).json({ message: "🔒 Audit logged", log });
  } catch (error) {
    console.error("❌ Error creating audit log:", error);
    res.status(500).json({ error: "Failed to create audit log" });
  }
});

export default router;