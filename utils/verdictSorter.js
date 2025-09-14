export function sortVerdicts(verdicts) {
  return verdicts
    .filter(v => v.timestamp)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}
