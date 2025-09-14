import fs from 'fs';
import path from 'path';

export function scanFilesByType(dir: string, extensions: string[]): string[] {
  const files: string[] = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...scanFilesByType(fullPath, extensions));
    } else if (extensions.includes(path.extname(file))) {
      files.push(fullPath);
    }
  });
  return files;
}
