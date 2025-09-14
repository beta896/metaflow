const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../logs/audit.log");

exports.logAction = (action, userEmail) => {
  const entry = `[${new Date().toISOString()}] ${action} by ${userEmail}\n`;
  fs.appendFileSync(logPath, entry);
};

