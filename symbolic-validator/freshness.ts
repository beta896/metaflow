import fs from 'fs';
export function isFresh(filePath: string, maxDays: number): boolean {
  const lastModified = fs.statSync(filePath).mtime;
  const ageDays = (Date.now() - lastModified.getTime()) / (1000 * 60 * 60 * 24);
  return ageDays <= maxDays;
}
