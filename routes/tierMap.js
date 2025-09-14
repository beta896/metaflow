import express from "express";
import Affiliate from "../models/Affiliate.js";

const router = express.Router();

function getTier(profit) {
  if (profit >= 10000) return "Gold";
  if (profit >= 5000) return "Silver";
  if (profit >= 1000) return "Bronze";
  return "Starter";
}

router.get("/tier-map", async (req, res) => {
  try {
    const affiliates = await Affiliate.find({});
    const tierCounts = {
      Gold: 0,
      Silver: 0,
      Bronze: 0,
      Starter: 0
    };

    affiliates.forEach(a => {
      const tier = getTier(a.profitGenerated);
      tierCounts[tier]++;
    });

    const total = affiliates.length;
    const distribution = Object.entries(tierCounts).map(([tier, count]) => ({
      tier,
      count,
      percentage: total ? ((count / total) * 100).toFixed(2) + "%" : "0%"
    }));

    res.json({ totalAffiliates: total, distribution });
  } catch (err) {
    res.status(500).json({ error: "Tier map failed", details: err.message });
  }
});

export default router;
