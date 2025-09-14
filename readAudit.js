import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const auditDir = path.join(__dirname, "audit-logs");

const files = fs.readdirSync(auditDir).filter(f => f.startsWith("audit-") && f.endsWith(".json"));

files.sort((a, b) => {
  const aTime = parseInt(a.split("-")[1].split(".")[0]);
  const bTime = parseInt(b.split("-")[1].split(".")[0]);
  return bTime - aTime;
});

const latestAuditPath = path.join(auditDir, files[0]);
const audit = JSON.parse(fs.readFileSync(latestAuditPath, "utf8"));

console.log(`📍 Flagged files in ${files[0]}:\n`);
audit.files.flagged.forEach(file => console.log(file));