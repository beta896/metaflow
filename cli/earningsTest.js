// earningsTest.js — CLI Simulation for Earnings Tracker 🧪🐆

import { trackEarnings } from '../utils/metaFlow.js';

const testEntry = trackEarnings({
  userId: 'mustafa001',
  actionType: 'offerAccepted',
  entityId: 'offer_789',
  amount: 250,
  probability: 0.82
});

console.log('\n📦 Earnings Entry:\n', testEntry);