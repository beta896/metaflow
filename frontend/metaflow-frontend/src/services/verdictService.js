export async function getVerdicts() {
  const res = await fetch('/api/verdicts');
  if (!res.ok) throw new Error('Failed to fetch verdicts');
  return res.json();
}
