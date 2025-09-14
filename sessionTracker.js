//
// sessionTracker.js — CLI Session Tracker 📊🧠
// Author: Mustafa | Tracks CLI actions with audit-grade metadata

import {
  enrichSessionContext,
  logSessionEvent
} from './utils/sessionUtils.js';

/**
 * Tracks a CLI command with enriched session context.
 * @param {string} userId
 * @param {string} ip
 * @param {string} userAgent
 * @param {string} command
 */
export function trackCommand(userId, ip, userAgent, command) {
  const session = enrichSessionContext({ userId, ip, userAgent });
  const eventType = "CLI_Command";
  logSessionEvent(eventType, session);
}
