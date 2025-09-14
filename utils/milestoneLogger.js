// milestoneLogger.js

/**
 * Logs a milestone event to the console with symbolic clarity.
 * @param {Object} milestone - The milestone data object.
 * @param {string} milestone.title - Title of the milestone.
 * @param {string} milestone.project - Project name or module.
 * @param {string} milestone.date - ISO timestamp of the milestone.
 */
export function logMilestone({ title, project, date }) {
  const timestamp = date || new Date().toISOString();
  const label = title || 'Untitled';
  const scope = project || 'Unassigned';

  const output = {
    title: label,
    project: scope,
    date: timestamp,
    status: 'logged',
    source: 'milestoneLogger'
  };

  console.log(`🎯 Milestone Logged`, JSON.stringify(output, null, 2));
}