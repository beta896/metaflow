import express from "express";
import Affiliate from "../models/Affiliate.js";

const router = express.Router();

router.post("/referral", async (req, res) => {
  const { referralCode, userId, profitAmount } = req.body;

  try {
    const affiliate = await Affiliate.findOne({ referralCode });
    if (!affiliate) {
      return res.status(404).json({ error: "Referral code not found" });
    }

    await affiliate.trackReferral(userId, profitAmount);
    res.json({ message: "Referral tracked", updatedProfit: affiliate.profitGenerated });
  } catch (err) {
    res.status(500).json({ error: "Referral tracking failed", details: err.message });
  }
});

export default router;
