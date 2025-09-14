export default function rateLimiterRule(content, filePath) {
    const isRouteFile = filePath.includes('/routes/');
    const usesLimiter = content.includes('apiLimiter');
  
    if (isRouteFile && !usesLimiter) {
      return `Route file missing apiLimiter in ${filePath}`;
    }
  }