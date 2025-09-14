//
// sessionUtils.js — Identity Intelligence Module 🧠🔐
// Author: Mustafa | Architected for audit-grade monetization systems

/**
 * Generates a pseudo-unique session fingerprint.
 * Replace with real session ID or request hash in production.
 */
export function getSessionFingerprint() {
  return 'sess_' + Math.random().toString(36).substring(2, 10);
}

/**
 * Resolves user tier for monetization logic.
 * Replace with DB lookup or JWT decoding in production.
 * @param {string} userId
 * @returns {'basic' | 'pro' | 'elite'}
 */
export function getUserTier(userId) {
  if (userId.startsWith('elite')) return 'elite';
  if (userId.startsWith('pro')) return 'pro';
  return 'basic';
}

/**
 * Parses user-agent string to infer device type.
 * @param {string} ua
 * @returns {string}
 */
function parseUserAgent(ua) {
  if (!ua) return 'unknown';
  if (ua.includes('Mobile')) return 'mobile';
  if (ua.includes('Windows')) return 'desktop-windows';
  if (ua.includes('Mac')) return 'desktop-mac';
  return 'other';
}

/**
 * Enriches session context with metadata for audit logging.
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.ip
 * @param {string} params.userAgent
 * @returns {Object}
 */
export function enrichSessionContext({ userId, ip, userAgent }) {
  return {
    fingerprint: getSessionFingerprint(),
    tier: getUserTier(userId),
    ip,
    device: parseUserAgent(userAgent),
    timestamp: new Date().toISOString()
  };
}

/**
 * Logs session events with timestamp and context.
 * Replace with persistent logger in production.
 * @param {string} eventType
 * @param {Object} context
 */
export function logSessionEvent(eventType, context) {
  console.log(`[${new Date().toISOString()}] [${eventType}]`, JSON.stringify(context));
}

/**
 * Returns feature flags based on user tier.
 * Powers tier-based access control and monetization logic.
 * @param {'basic' | 'pro' | 'elite'} tier
 * @returns {Object}
 */
export function getFeatureFlags(tier) {
  return {
    canAccessPremiumReports: tier !== 'basic',
    canTriggerProfitModels: tier === 'elite',
    hasPrioritySupport: tier === 'pro' || tier === 'elite'
  };
}