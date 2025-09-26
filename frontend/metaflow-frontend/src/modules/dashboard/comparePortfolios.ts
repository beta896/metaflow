import { scorePortfolio } from './portfolioScorer';

export function comparePortfolios(portfolios: { name: string; verdicts: any[] }[]) {
  return portfolios.map(p => {
    const score = scorePortfolio(p.verdicts);
    return {
      name: p.name,
      ...score
    };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue);
}
