export default function syntaxRule(content, filePath) {
    const usesRequire = content.includes('require(');
    const usesImport = content.includes('import ');
  
    if (usesRequire && usesImport) {
      return `Mixed CommonJS and ESM syntax in ${filePath}`;
    }
  }