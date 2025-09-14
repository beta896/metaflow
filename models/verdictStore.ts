let verdicts: any[] = [];

export function storeVerdict(data: any) {
  verdicts.push({ ...data, timestamp: new Date().toISOString() });
}

export function getVerdicts() {
  return verdicts.slice(-20); // return last 20
}
