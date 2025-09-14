import { simulateConversions } from './conversionSimulator';

const sampleProfiles = [
  { followers: 500, engagementRate: 0.9, socials: ['Instagram'] },
  { followers: 8000, engagementRate: 0.65, socials: ['YouTube'] },
  { followers: 15000, engagementRate: 0.4, socials: ['LinkedIn'] },
];

const results = simulateConversions(sampleProfiles);
console.log('[SIMULATION RESULTS]');
console.table(results.map(r => ({
  Followers: r.profile.followers,
  Tier: r.verdict.tier,
  Category: r.verdict.category,
  Offers: r.offers.join(', '),
  Potential: r.conversionPotential
})));
import { estimateRevenue } from './revenueSimulator';

results.forEach(r => {
  const revenue = estimateRevenue(r.offers, r.conversionPotential);
  console.log(\Revenue Estimate: \$\{revenue\} USD\);
});
