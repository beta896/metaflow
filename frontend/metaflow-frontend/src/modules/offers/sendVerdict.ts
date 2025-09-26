import axios from 'axios';

export async function sendVerdict(
  profile: any,
  verdict: any,
  offers: string[],
  conversionPotential: number,
  estimatedRevenue: number
) {
  try {
    await axios.post('http://localhost:3001/api/logVerdict', {
      profile,
      verdict,
      offers,
      conversionPotential,
      estimatedRevenue
    });
    console.log('[VERDICT SENT]');
  } catch (err) {
    console.error('[SEND ERROR]', err.message);
  }
}
