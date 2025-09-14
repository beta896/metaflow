const schedule = require('node-schedule');
const { weeklyReview } = require('../utils/weeklyReview');

schedule.scheduleJob('0 18 * * 5', async () => {
  await weeklyReview({ userId: 'founder' });
});
