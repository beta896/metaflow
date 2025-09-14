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
export function startingMiddleware(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

export function verifyRole(role) {
  return function (req, res, next) {
    const { user } = req;
    if (!user || user.role !== role) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
}

export default verifyRole;