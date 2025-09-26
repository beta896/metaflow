// src/components/profileClassification/profileClassification.ts

export type Profile = {
  followers: number;           // e.g. 875
  engagementRate: number;      // e.g. 0.75
  socials: string[];           // e.g. ['Instagram', 'YouTube']
};

export type Classification = {
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  category: 'Fashion' | 'Tech' | 'General';
  engagementScore: number;
};

/**
 * Classifies a profile based on follower count, engagement rate, and social platforms.
 */
export function classifyProfile(profile: Profile): Classification {
  const { followers, engagementRate, socials } = profile;

  // 🔢 Tier logic: Tier 1 = micro, Tier 3 = macro
  let tier: Classification['tier'];
  if (followers <= 1000) tier = 'Tier 1';
  else if (followers <= 10000) tier = 'Tier 2';
  else tier = 'Tier 3';

  // 🧠 Category logic
  let category: Classification['category'] = 'General';
  if (socials.includes('Instagram') && engagementRate >= 0.8) category = 'Fashion';
  else if (socials.includes('YouTube') || socials.includes('LinkedIn')) category = 'Tech';

  const engagementScore = Math.round(engagementRate * 100);

  return { tier, category, engagementScore };
}
