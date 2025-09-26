import { classifyProfile } from './profileClassification';
import { generateOffers } from './generateOffers';

const profile = {
  followers: 875,
  engagementRate: 0.82,
  socials: ['Instagram'],
};

const verdict = classifyProfile(profile);
const offers = generateOffers(verdict.category, verdict.tier);

console.log('[VERDICT]', verdict);
console.log('[OFFERS]', offers);
