function logAudit(action, actor, reason) {
  return {
    action,
    actor,
    reason,
    timestamp: new Date().toISOString()
  };
}

export default { logAudit };
