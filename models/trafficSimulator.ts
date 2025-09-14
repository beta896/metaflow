import { classifyProfile } from '../../metaflow-frontend/src/components/profileClassification/profileClassification';
import { generateOffers } from '../../metaflow-frontend/src/components/profileClassification/generateOffers';
import { estimateRevenue } from './revenueSimulator';
import { storeVerdict } from './verdictStore';
import { logVerdictToNotion } from './notionLogger';

const campaigns = ['LaunchWave', 'CreatorBoost', 'AffiliateStorm', 'OrganicFlow'];

function randomProfile(): any {
  const followers = Math.floor(Math.random() * 50000) + 100;
  const engagementRate = parseFloat((Math.random() * 0.9 + 0.1).toFixed(2));
  const platforms = ['Instagram', 'YouTube', 'LinkedIn', 'TikTok'];
  const socials = platforms.filter(() => Math.random() > 0.5);
  const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
  return { followers, engagementRate, socials, campaign };
}

export async function simulateTrafficBatch(count = 10) {
  const batchId = \atch-\\;

  for (let i = 0; i < count; i++) {
    const profile = randomProfile();
    const verdict = classifyProfile(profile);
    const offers = generateOffers(verdict.category, verdict.tier);
    const conversionPotential = Math.round((verdict.engagementScore / 100) * (offers.length * 10));
    const estimatedRevenue = estimateRevenue(offers, conversionPotential);

    const result = {
      profile,
      verdict,
      offers,
      conversionPotential,
      estimatedRevenue,
      batchId,
      timestamp: new Date().toISOString()
    };

    storeVerdict(result);
    await logVerdictToNotion(profile, verdict, offers, conversionPotential, estimatedRevenue);
    console.log(\[SIMULATED] \ → \ → \$\{estimatedRevenue\} USD\);
  }
}
