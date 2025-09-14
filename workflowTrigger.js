//
// workflowTrigger.js — Layer-Based Profit Engine ⚙️🧠
// Author: Mustafa | Integrated with Metaflow | Pascal Logic | Audit-Grade
//

import { getFeatureFlags } from './utils/sessionUtils.js';
import { predictProfitPascal } from './utils/predictProfitPascal.js';
import { ingestRegionData } from './utils/regionIngestor.js';
import { logAuditTrail } from './utils/auditLogger.js';
import { dispatchReportJob } from './utils/reportDispatcher.js';
import { metaflowTrigger } from './metaflow/metaflowTrigger.js';
import { enqueueSupportTicket } from './utils/supportQueue.js'; // Optional module

/**
 * Triggers monetization workflows based on user tier, region, and input.
 * @param {Object} params
 * @param {string} params.userId
 * @param {number} params.amount
 * @param {number} params.probability
 * @param {string} params.region
 */
export async function triggerWorkflow({ userId, amount, probability, region }) {
  try {
    // 🧠 Input Validation
    if (!userId || typeof amount !== 'number' || typeof probability !== 'number' || !region) {
      throw new Error('Missing or invalid parameters');
    }

    // 🧩 Tier Classification
    const tier = userId.startsWith('elite') ? 'elite'
               : userId.startsWith('pro')   ? 'pro'
               : 'basic';

    // 🎛️ Feature Flags
    const flags = getFeatureFlags(tier);

    // 🔮 Profit Prediction
    const expectedProfit = predictProfitPascal(amount, probability, tier);

    // 🌍 Region Ingestion
    const regionData = await ingestRegionData(region);

    // 📋 Logging
    console.log(`🌍 Region: ${region} | Tier: ${tier}`);
    console.log(`🔮 Expected Profit: $${expectedProfit.toFixed(2)}`);
    console.log(`📦 Region Data:`, regionData);

    logAuditTrail({
      event: 'workflow_triggered',
      userId,
      tier,
      region,
      expectedProfit,
      timestamp: Date.now()
    });

    // 🚀 Conditional Actions
    if (flags.canTriggerProfitModels) {
      console.log('🚀 Triggering predictive payout scheduler...');
      metaflowTrigger({ userId, amount, expectedProfit, region });
    }

    if (flags.canAccessPremiumReports) {
      console.log('📊 Dispatching premium report job...');
      dispatchReportJob({ userId, tier, region, expectedProfit });
    }

    if (flags.hasPrioritySupport) {
      console.log('🛡️ Flagging for priority support...');
      await enqueueSupportTicket({ userId, tier, region, urgency: 'high' });
    }

    // 📢 Upgrade Advisory
    if (tier === 'basic') {
      console.warn(`⚠️ Upgrade Recommended: You're currently on the 'basic' tier. To unlock advanced features like predictive profit modeling, premium reports, and priority support, subscribe to Metaflow.`);
      console.warn(`🔗 Visit: https://metaflow.ai/subscribe`);
    }

    // 🧬 Layer Feature Awareness
    console.log(`🧬 Feature Access Summary for '${tier}' Tier:`);
    console.log(`- Predictive Models: ${flags.canTriggerProfitModels ? 'Enabled' : 'Locked'}`);
    console.log(`- Premium Reports: ${flags.canAccessPremiumReports ? 'Enabled' : 'Locked'}`);
    console.log(`- Priority Support: ${flags.hasPrioritySupport ? 'Enabled' : 'Locked'}`);

    // ✅ Return Summary
    return {
      status: 'success',
      tier,
      region,
      expectedProfit,
      flags
    };

  } catch (error) {
    // ❌ Error Handling
    console.error('❌ Workflow trigger failed:', error);

    logAuditTrail({
      event: 'workflow_error',
      userId,
      region,
      error: error.message,
      timestamp: Date.now()
    });

    return {
      status: 'error',
      message: error.message
    };
  }
}