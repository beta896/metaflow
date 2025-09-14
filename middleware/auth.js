import jwt from "jsonwebtoken";

/**
 * Logs every request method and URL
 */
export function startingMiddleware(req, res, next) {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
}

/**
 * Verifies JWT and attaches user to request
 */
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.warn(`[Auth] Missing Authorization header`);
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(`[Auth] Token verification failed: ${error.message}`);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

/**
 * Enforces role-based access
 */
export function verifyRole(role) {
  return function (req, res, next) {
    const { user } = req;
    if (!user || user.role !== role) {
      console.warn(`[Auth] Forbidden for role '${user?.role}'`);
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
}

export default verifyToken;
