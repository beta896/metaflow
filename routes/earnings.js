import express from "express";
import Affiliate from "../models/Affiliate.js";

const router = express.Router();

function getTier(profit) {
  if (profit >= 10000) return "🏆 Gold";
  if (profit >= 5000) return "🥈 Silver";
  if (profit >= 1000) return "🥉 Bronze";
  return "🚀 Starter";
}

router.get("/earnings", async (req, res) => {
  try {
    const affiliates = await Affiliate.find({});
    const earnings = affiliates.map(a => ({
      name: a.name,
      email: a.email,
      referralCode: a.referralCode,
      referrals: a.referredUsers.length,
      profit: a.profitGenerated,
      tier: getTier(a.profitGenerated),
      verdict: `🧠 ${a.name} has earned $${a.profitGenerated} and reached ${getTier(a.profitGenerated)} tier`
    }));
    res.json({ earnings });
  } catch (err) {
    res.status(500).json({ error: "Earnings dashboard failed", details: err.message });
  }
});

export default router;
