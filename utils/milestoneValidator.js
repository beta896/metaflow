// milestoneValidator.js
export function validateMilestone(raw) {
  return {
    title: raw.title ?? 'Untitled',
    project: raw.project ?? 'Unknown',
    date: raw.date ?? new Date().toISOString()
  };
}
