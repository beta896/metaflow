import fs from "fs";
import path from "path";

// Simulated data sources
const userId = "mustafa-meta";
const fullName = "Mustafa";
const email = "mustafa@metaflow.io";
const location = "10th of Ramadan, Egypt";

// Load wallet registry
const walletRegistryPath = path.resolve("./walletRegistry.json");
const walletRegistry = JSON.parse(fs.readFileSync(walletRegistryPath));

// Load audit report
const auditPath = path.resolve("./audit-report.json");
const auditLog = JSON.parse(fs.readFileSync(auditPath));

// Filter wallet info
const wallet = walletRegistry.linkedWallets.find(w => w.active);

// Filter offer history from audit
const offerHistory = auditLog
  .filter(entry => entry.action === "offer:publish")
  .map(entry => ({
    offerId: entry.offerId,
    title: entry.title || "Untitled Offer",
    platform: entry.platform || "Unknown",
    publishedAt: entry.timestamp,
    clicks: entry.clicks || 0,
    conversions: entry.conversions || 0,
    earned: entry.earned || 0
  }));

// Calculate earnings
const totalEarned = offerHistory.reduce((sum, o) => sum + o.earned, 0);
const withdrawn = Math.floor(totalEarned * 0.8); // Simulated
const pending = totalEarned - withdrawn;

// Build business file
const businessFile = {
  _id: userId,
  profile: {
    fullName,
    email,
    role: "creator",
    location,
    joinedAt: new Date().toISOString()
  },
  socialAccounts: [], // To be populated later
  wallet,
  offerHistory,
  earnings: {
    totalEarned,
    pending,
    withdrawn,
    lastUpdated: new Date().toISOString()
  },
  auditTrail: auditLog.filter(entry => entry.userId === userId)
};

// Save to file
const outputPath = path.resolve(`./business-file-${userId}.json`);
fs.writeFileSync(outputPath, JSON.stringify(businessFile, null, 2));
console.log(`📁 Business file generated: ${outputPath}`);