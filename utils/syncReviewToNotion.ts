import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const reviewDbId = process.env.NOTION_REVIEW_DB_ID || '';

function getReviewTags(rating, entityType) {
  const tags = [];

  if (rating >= 4) tags.push('scale');
  if (rating === 3) tags.push('clarify');
  if (rating <= 2) tags.push('refactor');
  if (entityType === 'milestone') tags.push('ritual');

  return tags;
}

export async function syncReviewToNotion(review) {
  try {
    const tags = getReviewTags(review.rating, review.entityType);

    await notion.pages.create({
      parent: { database_id: reviewDbId },
      properties: {
        EntityType: { select: { name: review.entityType } },
        EntityID: { rich_text: [{ text: { content: review.entityId } }] },
        Rating: { number: review.rating },
        Comment: { rich_text: [{ text: { content: review.comment || '' } }] },
        Reviewer: { rich_text: [{ text: { content: review.reviewer || 'founder' } }] },
        Tags: { multi_select: tags.map(tag => ({ name: tag })) },
        Timestamp: { date: { start: new Date().toISOString() } }
      }
    });

    console.log(\[Review] Synced with tags: \\);
  } catch (err) {
    console.error(\[Review] Sync failed: \\);
  }
}
