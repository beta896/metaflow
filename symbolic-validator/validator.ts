import fs from 'fs';
import { SYMBOLIC_THRESHOLDS } from './thresholds';
import { isFresh } from './freshness';

export function validateCovenant(filePath: string): string[] {
  const breaches: string[] = [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);

  if (data.disciplineScore < SYMBOLIC_THRESHOLDS.disciplineScoreMin) {
    breaches.push('Discipline breach');
  }
  if (data.promiseRatio > SYMBOLIC_THRESHOLDS.promiseRatioMax) {
    breaches.push('Promise ratio breach');
  }
  if (!isFresh(filePath, SYMBOLIC_THRESHOLDS.freshnessDays)) {
    breaches.push('Stale covenant');
  }

  return breaches;
}
