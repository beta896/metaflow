import axios from 'axios';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const BATCH_DB = process.env.NOTION_BATCH_DB;

export async function exportBatchLogs() {
  try {
    const res = await axios.post(
      'https://api.notion.com/v1/databases/' + BATCH_DB + '/query',
      {},
      {
        headers: {
          'Authorization': \Bearer \\,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        }
      }
    );

    const rows = res.data.results.map((page: any) => {
      const props = page.properties;
      return {
        Campaign: props.Campaign?.title?.[0]?.text?.content || '',
        ProfilesSimulated: props.ProfilesSimulated?.number || 0,
        TotalRevenue: props.TotalRevenue?.number || 0,
        Timestamp: props.Timestamp?.date?.start || ''
      };
    });

    console.log('[BATCH EXPORT]', rows);
    return rows;
  } catch (err) {
    console.error('[EXPORT ERROR]', err.response?.data || err.message);
    return [];
  }
}
