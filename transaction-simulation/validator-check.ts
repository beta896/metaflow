const breaches = validateCovenant("TX-20250823-001.json");
if (breaches.length > 0) {
  triggerArbitration(txID, breaches);
} else {
  logSuccess(txID);
}
