/**
 * Rule: Ensure each file starts with the @audit-clean tag
 * Severity: High
 * Usage: auditTagRule(content, filePath) => [violations]
 */

export default function auditTagRule(content, filePath) {
  const violations = [];

  // Normalize content and check for the audit tag
  const trimmed = content.trim();
  const hasTag = trimmed.startsWith('// @audit-clean');

  if (!hasTag) {
    violations.push({
      file: filePath,
      rule: 'Missing @audit-clean',
      severity: 'high',
      message: `Missing @audit-clean tag in ${filePath}`
    });
  }

  return violations;
}