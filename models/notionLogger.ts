import axios from 'axios';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.VERDICT_DB;

export async function logVerdictToNotion(
  profile: { followers: number; engagementRate: number; socials: string[] },
  verdict: { tier: string; category: string; engagementScore: number },
  offers: string[],
  conversionPotential: number,
  estimatedRevenue: number
) {
  const payload = {
    parent: { database_id: DATABASE_ID },
    properties: {
      Followers: { number: profile.followers },
      EngagementRate: { number: profile.engagementRate },
      Socials: { multi_select: profile.socials.map(s => ({ name: s })) },
      Tier: { select: { name: verdict.tier } },
      Category: { select: { name: verdict.category } },
      EngagementScore: { number: verdict.engagementScore },
      Offers: { multi_select: offers.map(o => ({ name: o })) },
      ConversionPotential: { number: conversionPotential },
      EstimatedRevenue: { number: estimatedRevenue },
      Timestamp: { date: { start: new Date().toISOString() } }
    }
  };

  try {
    const res = await axios.post('https://api.notion.com/v1/pages', payload, {
      headers: {
        'Authorization': Bearer ,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    });
    console.log('[NOTION]', res.data.id);
  } catch (err) {
    console.error('[NOTION ERROR]', err.response?.data || err.message);
  }
}
