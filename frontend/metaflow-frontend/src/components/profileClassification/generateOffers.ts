import { Classification } from './profileClassification';

type OfferMap = {
  [key in Classification['category']]: string[];
};

const offers: OfferMap = {
  Fashion: ['StyleHub', 'BrandX'],
  Tech: ['GloUp', 'VibeReach'],
  General: ['GadgetPro', 'InnovateNow'],
};

export function generateOffers(category: Classification['category'], tier: Classification['tier']): string[] {
  const baseOffers = offers[category] || [];

  if (category === 'General' && tier === 'Tier 3') {
    return [...baseOffers, 'OpenPromo'];
  }

  return baseOffers;
}
