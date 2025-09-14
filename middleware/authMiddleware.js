// @audit-clean: JWT auth enforcement with structured logging and role support

import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT and attach user to request
 */
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.warn(`[Auth] Missing Authorization header: ${req.method} ${req.originalUrl}`);
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) {
    console.warn(`[Auth] Malformed token: ${req.method} ${req.originalUrl}`);
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(`[Auth] Token verification failed: ${error.message}`);

    if (error.name === 'TokenExpiredError') {
      console.warn(`[Auth] Token expired at ${error.expiredAt}`);
      return res.status(401).json({ message: 'Token expired' });
    }

    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

/**
 * Middleware to enforce role-based access
 */
export function requireRole(role) {
  return function (req, res, next) {
    const user = req.user;
    if (!user || user.role !== role) {
      console.warn(`[Auth] Forbidden for role '${user?.role}': ${req.method} ${req.originalUrl}`);
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
}

// ✅ Default export for compatibility with `import verifyToken from ...`
export default verifyToken;