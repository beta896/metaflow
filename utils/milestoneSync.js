import mongoose from "mongoose";
import Affiliate from "../models/Affiliate.js";

function getTier(profit) {
  if (profit >= 10000) return "🏆 Gold";
  if (profit >= 5000) return "🥈 Silver";
  if (profit >= 1000) return "🥉 Bronze";
  return "🚀 Starter";
}

async function syncMilestones() {
  await mongoose.connect("mongodb://localhost:27017/metaflow", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const affiliates = await Affiliate.find({});
  console.log("🔄 Milestone Sync Started");

  affiliates.forEach((a) => {
    const tier = getTier(a.profitGenerated);
    console.log(`🧠 ${a.name} | ${a.referralCode} → ${tier} | $${a.profitGenerated}`);
  });

  console.log("✅ Milestone Sync Complete");
  mongoose.disconnect();
}

syncMilestones();
