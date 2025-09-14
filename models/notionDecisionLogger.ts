import axios from 'axios';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DECISION_DB = process.env.NOTION_DECISION_DB;

export async function logDecisionToNotion(
  campaign: string,
  forecasted: number,
  actual: number,
  delta: number,
  verdict: string
) {
  const payload = {
    parent: { database_id: DECISION_DB },
    properties: {
      Campaign: { title: [{ text: { content: campaign } }] },
      ForecastedRevenue: { number: forecasted },
      ActualRevenue: { number: actual },
      Delta: { number: delta },
      Verdict: { select: { name: verdict } },
      Timestamp: { date: { start: new Date().toISOString() } }
    }
  };

  try {
    const res = await axios.post('https://api.notion.com/v1/pages', payload, {
      headers: {
        'Authorization': \Bearer \\,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    });
    console.log('[DECISION LOGGED]', res.data.id);
  } catch (err) {
    console.error('[NOTION DECISION ERROR]', err.response?.data || err.message);
  }
}
