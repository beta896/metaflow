import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configurable root directory
const ROOT_DIR = process.argv[2]
  ? path.resolve(__dirname, process.argv[2])
  : path.resolve(__dirname, './');

// Audit stats
let totalFiles = 0;
let flaggedFiles = [];
let fixedFiles = [];
let cleanFiles = [];

// Regex patterns
const commonJSRegex = /\b(require|module\.exports)\b/;
const esModuleRegex = /\b(import|export)\b/;

// Scan recursively
function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.name.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

// Process individual file
function processFile(filePath) {
  totalFiles++;
  const content = fs.readFileSync(filePath, 'utf8');
  const hasCommonJS = commonJSRegex.test(content);
  const hasESModule = esModuleRegex.test(content);

  if (hasCommonJS && hasESModule) {
    flaggedFiles.push(filePath);
    const fixedContent = autoFix(content);
    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent);
      fixedFiles.push(filePath);
    }
  } else {
    cleanFiles.push(filePath);
  }
}

// Auto-fix logic (basic conversion)
function autoFix(content) {
  let updated = content;

  // Convert require to import (naive)
  updated = updated.replace(/const (\w+) = require\(['"](.+)['"]\);?/g, 'import $1 from \'$2\';');

  // Convert module.exports to export default
  updated = updated.replace(/module\.exports\s*=\s*/g, 'export default ');

  return updated;
}

// Save immutable audit log
function saveAuditLog() {
  const auditLog = {
    timestamp: new Date().toISOString(),
    scanned: totalFiles,
    flagged: flaggedFiles.length,
    fixed: fixedFiles.length,
    clean: cleanFiles.length,
    files: {
      flagged: flaggedFiles,
      fixed: fixedFiles,
      clean: cleanFiles,
    },
  };

  const auditDir = path.join(__dirname, 'audit-logs');
  if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir);

  const auditPath = path.join(auditDir, `audit-${Date.now()}.json`);
  fs.writeFileSync(auditPath, JSON.stringify(auditLog, null, 2));
  console.log(`✅ Audit log saved: ${auditPath}`);
}

// CI enforcement
function enforceCI() {
  if (flaggedFiles.length > 0) {
    console.error(`❌ Mixed syntax detected in ${flaggedFiles.length} files.`);
    process.exit(1);
  } else {
    console.log('✅ No mixed syntax found. CI check passed.');
  }
}

// Run
scanDirectory(ROOT_DIR);
saveAuditLog();
enforceCI();