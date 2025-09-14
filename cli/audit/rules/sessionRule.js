export default function sessionRule(content, filePath) {
    const sensitivePaths = ['/auth', '/user', '/persona'];
    const isSensitive = sensitivePaths.some(p => filePath.includes(p));
    const usesSession = content.includes('sessionMiddleware');
  
    if (isSensitive && !usesSession) {
      return `Sensitive route missing sessionMiddleware in ${filePath}`;
    }
  }