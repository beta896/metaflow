import { classifyProfile } from '../../frontend/src/components/profileClassification/profileClassification';
import { generateOffers } from '../../frontend/src/components/profileClassification/generateOffers';

type SimulatedProfile = {
  followers: number;
  engagementRate: number;
  socials: string[];
};

type ConversionResult = {
  profile: SimulatedProfile;
  verdict: ReturnType<typeof classifyProfile>;
  offers: string[];
  conversionPotential: number;
};

export function simulateConversions(profiles: SimulatedProfile[]): ConversionResult[] {
  return profiles.map(profile => {
    const verdict = classifyProfile(profile);
    const offers = generateOffers(verdict.category, verdict.tier);

    const conversionPotential = Math.round(
      (verdict.engagementScore / 100) * (offers.length * 10)
    );

    return { profile, verdict, offers, conversionPotential };
  });
}
