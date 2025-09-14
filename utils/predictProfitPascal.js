// predictProfitPascal.js — Probabilistic Profit Oracle 🧠🐆

/**
 * Predicts profit using Pascal-style expected value logic.
 * @param {number} amount - The potential profit amount.
 * @param {number} probability - The likelihood of earning that amount (0 to 1).
 * @param {string} tier - User tier: 'basic', 'pro', or 'elite'.
 * @returns {number} - Adjusted expected profit.
 */
export function predictProfitPascal(amount, probability, tier = 'basic') {
    // Tier multipliers reflect strategic leverage
    const tierMultiplier = {
      basic: 1.0,
      pro: 1.2,
      elite: 1.5
    };
  
    const multiplier = tierMultiplier[tier] || 1.0;
  
    // Raw expected value
    const expectedValue = amount * probability * multiplier;
  
    // Pascal-style risk penalty: penalize uncertainty
    const riskPenalty = Math.pow(1 - probability, 2);
  
    // Final adjusted profit
    const adjustedProfit = expectedValue * (1 - riskPenalty);
  
    return adjustedProfit;
  }