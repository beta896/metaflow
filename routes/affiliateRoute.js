import express from "express";
import { startingMiddleware, verifyRole } from "../middleware/auth.js";

const router = express.Router();

router.use(startingMiddleware);

router.get("/dashboard", verifyRole("affiliate"), (req, res) => {
  res.json({ status: "success", message: "Affiliate cockpit unlocked" });
});

export default router;
