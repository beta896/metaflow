import axios from 'axios';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DELIVERY_DB = process.env.NOTION_DELIVERY_DB;

export async function logDeliveryToNotion(filename: string, status: string) {
  const payload = {
    parent: { database_id: DELIVERY_DB },
    properties: {
      Filename: { title: [{ text: { content: filename } }] },
      Status: { select: { name: status } },
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
    console.log('[DELIVERY LOGGED]', res.data.id);
  } catch (err) {
    console.error('[NOTION DELIVERY ERROR]', err.response?.data || err.message);
  }
}
