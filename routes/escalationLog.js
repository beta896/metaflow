import express from "express";
import Affiliate from "../models/Affiliate.js";

const router = express.Router();

function getTier(profit) {
  if (profit >= 10000) return "Gold";
  if (profit >= 5000) return "Silver";
  if (profit >= 1000) return "Bronze";
  return "Starter";
}

router.get("/escalation-log", async (req, res) => {
  try {
    const affiliates = await Affiliate.find({});
    const logs = affiliates.map(a => {
      const tier = getTier(a.profitGenerated);
      const verdict = `🧠 ${a.name} escalated to ${tier} tier with $${a.profitGenerated} profit and ${a.referredUsers.length} referrals`;
      return {
        name: a.name,
        referralCode: a.referralCode,
        referrals: a.referredUsers.length,
        profit: a.profitGenerated,
        tier,
        verdict,
        timestamp: a.updatedAt || a.createdAt
      };
    });

    res.json({ escalationLog: logs });
  } catch (err) {
    res.status(500).json({ error: "Escalation log failed", details: err.message });
  }
});

export default router;
