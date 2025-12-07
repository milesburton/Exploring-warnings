import { describe, it, expect } from 'vitest';
import load from '@commitlint/load';
import lint from '@commitlint/lint';

describe('Commitlint configuration', () => {
  it('accepts a valid conventional commit message', async () => {
    const opts = await load({ extends: ['@commitlint/config-conventional'] });
    const result = await lint('feat(warnings): add filter by severity', opts.rules, opts);
    expect(result.valid).toBe(true);
  });

  it('rejects an invalid commit message', async () => {
    const opts = await load({ extends: ['@commitlint/config-conventional'] });
    const result = await lint('update stuff', opts.rules, opts);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
