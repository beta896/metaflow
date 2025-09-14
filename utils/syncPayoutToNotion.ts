import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const payoutDbId = process.env.NOTION_PAYOUT_DB_ID || '';

function getSymbolicTags(payout, source) {
  const tags = [];

  if (payout >= 100) tags.push('scale');
  if (source?.includes('meta')) tags.push('ritual');
  if (payout >= 10 && payout < 100) tags.push('leverage');
  if (payout < 10) tags.push('precision');

  return tags;
}

export async function syncPayoutToNotion(payout) {
  try {
    const symbolicTags = getSymbolicTags(payout.payout, payout.source);

    await notion.pages.create({
      parent: { database_id: payoutDbId },
      properties: {
        OfferID: { rich_text: [{ text: { content: payout.offerId } }] },
        Source: { rich_text: [{ text: { content: payout.source || 'unknown' } }] },
        Amount: { number: payout.payout || 0 },
        Currency: { select: { name: payout.currency || 'USD' } },
        Converted: { checkbox: payout.converted || false },
        Tags: {
          multi_select: symbolicTags.map(tag => ({ name: tag }))
        },
        Timestamp: { date: { start: new Date().toISOString() } }
      }
    });

    console.log(\[Notion] Payout synced with tags: \\);
  } catch (err) {
    console.error(\[Notion] Payout sync failed: \\);
  }
}
