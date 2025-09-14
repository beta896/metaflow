import fs from 'fs';
import path from 'path';

export function scanFiles(dir, extensions = ['.js']) {
  const results = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (extensions.includes(path.extname(entry.name))) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        results.push({ filePath: fullPath, content });
      }
    }
  }

  walk(dir);
  return results;
}