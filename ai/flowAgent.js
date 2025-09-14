import { optimizeRevenue } from './revenueOptimizer.js';
import { matchAffiliateProducts } from './affiliateMatchingAI.js';
import { recommendContent } from './recommendationAI.js';

const heartbeat = () => {
console.log(`[Agent Heartbeat] ${new Date().toISOString()}`);
optimizeRevenue();
matchAffiliateProducts();
recommendContent();
};

setInterval(heartbeat, 60000);
console.log("🚀 flowAgent.js is live.");