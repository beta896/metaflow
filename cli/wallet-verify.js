import fs from "fs";
import path from "path";

const registryPath = path.resolve("./walletRegistry.json");
const auditPath = path.resolve("./audit-report.json");

const userId = "mustafa-meta";
const provider = "InstaPay";
const walletId = "01008375898";

// Load registry
const registry = JSON.parse(fs.readFileSync(registryPath));
const wallet = registry.linkedWallets.find(w => w.provider === provider && w.walletId === walletId);

if (!wallet) {
  console.error("❌ Wallet not found.");
  process.exit(1);
}

wallet.verified = true;

// Save registry
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));

// Log audit
const entry = {
  action: "wallet:verify",
  userId,
  provider,
  walletId,
  timestamp: new Date().toISOString(),
  source: "CLI"
};

let auditLog = [];

try {
  auditLog = JSON.parse(fs.readFileSync(auditPath));
} catch {
  auditLog = [];
}

auditLog.push(entry);
fs.writeFileSync(auditPath, JSON.stringify(auditLog, null, 2));

console.log("✅ Wallet verified and audit logged.");