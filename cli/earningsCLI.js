// earningsCLI.js — Investor-Grade CLI Harness 🧠💼

import { trackEarnings } from '../utils/metaFlow.js';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const { userId, action, entity, amount, probability, tier } = args;

if (!userId || !action || !entity || !amount || !probability) {
  console.error('❌ Missing required flags. Usage:');
  console.log('--userId= --action= --entity= --amount= --probability= [--tier=]');
  process.exit(1);
}

const entry = trackEarnings({
  userId,
  actionType: action,
  entityId: entity,
  amount: parseFloat(amount),
  probability: parseFloat(probability),
  tier: tier || 'basic'
});

console.log('\n📦 Earnings Entry:\n', entry);