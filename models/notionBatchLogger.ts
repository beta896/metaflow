import axios from 'axios';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const BATCH_DB = process.env.NOTION_BATCH_DB;

export async function logBatchToNotion(campaign: string, count: number, revenue: number) {
  const payload = {
    parent: { database_id: BATCH_DB },
    properties: {
      Campaign: { title: [{ text: { content: campaign } }] },
      ProfilesSimulated: { number: count },
      TotalRevenue: { number: revenue },
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
    console.log('[BATCH LOGGED]', res.data.id);
  } catch (err) {
    console.error('[NOTION BATCH ERROR]', err.response?.data || err.message);
  }
}
