import fs from "fs";
import path from "path";

const auditPath = path.resolve("./audit-report.json");
const timestamp = new Date().toISOString();

const entry = {
  action: "wallet:link",
  userId: "mustafa-meta",
  provider: "InstaPay",
  walletId: "01012345678",
  timestamp,
  source: "CLI"
};

let auditLog = [];

try {
  const raw = fs.readFileSync(auditPath);
  auditLog = JSON.parse(raw);
} catch {
  auditLog = [];
}

auditLog.push(entry);
fs.writeFileSync(auditPath, JSON.stringify(auditLog, null, 2));
console.log("📝 Audit entry logged.");