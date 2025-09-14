import express from "express";
import { Prophecy } from "../models/prophecy.js";
import { Audit } from "../models/audit.js";

const router = express.Router();

router.post("/trigger", async (req, res) => {
  const { key, role, trigger, verdict } = req.body;
  const prophecy = await Prophecy.create({ key, role, trigger, verdict });
  res.json({ message: "🪬 Prophecy recorded", prophecy });
});

router.get("/:key", async (req, res) => {
  const role = req.session.role || "guest";
  const verdict = role === "admin" ? "granted" : "denied";

  await Audit.create({
    action: "prophecy_access",
    role,
    verdict
  });

  if (role !== "admin") {
    return res.status(403).json({ message: "⛔ Access denied: Admins only" });
  }

  const prophecy = await Prophecy.findOne({ key: req.params.key });
  res.json(prophecy || { message: "No prophecy found" });
});

export default router;
