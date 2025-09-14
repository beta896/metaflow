import { validateCovenant } from './validator';
import fs from 'fs';

describe('Symbolic Covenant Validator', () => {
  const validCovenant = {
    disciplineScore: 0.95,
    promiseRatio: 1.0
  };

  const staleCovenant = {
    disciplineScore: 0.95,
    promiseRatio: 1.0
  };

  const breachCovenant = {
    disciplineScore: 0.6,
    promiseRatio: 1.5
  };

  beforeAll(() => {
    fs.writeFileSync('valid.json', JSON.stringify(validCovenant));
    fs.writeFileSync('breach.json', JSON.stringify(breachCovenant));
    fs.writeFileSync('stale.json', JSON.stringify(staleCovenant));
    const oldDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    fs.utimesSync('stale.json', oldDate, oldDate);
  });

  it('should pass a valid covenant', () => {
    const breaches = validateCovenant('valid.json');
    expect(breaches).toEqual([]);
  });

  it('should detect discipline and promise breaches', () => {
    const breaches = validateCovenant('breach.json');
    expect(breaches).toContain('Discipline breach');
    expect(breaches).toContain('Promise ratio breach');
  });

  it('should detect stale covenant', () => {
    const breaches = validateCovenant('stale.json');
    expect(breaches).toContain('Stale covenant');
  });

  afterAll(() => {
    fs.unlinkSync('valid.json');
    fs.unlinkSync('breach.json');
    fs.unlinkSync('stale.json');
  });
});
