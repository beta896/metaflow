import { scanFilesByType } from './scanner';
import { validateCovenant } from './validator';

export function generateAuditReport(dir: string): void {
  const files = scanFilesByType(dir, ['.json']);
  files.forEach(file => {
    const breaches = validateCovenant(file);
    if (breaches.length > 0) {
      console.log(⚠️ Breaches in \: \);
    } else {
      console.log(✅ \ passed all checks.);
    }
  });
}
