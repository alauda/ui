import { coerceString } from './coercion';

describe('coercion', () => {
  it('should coerce string correctly', () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(coerceString(undefined)).toBe('');
    expect(coerceString(null)).toBe('');
    expect(coerceString('test')).toBe('test');
    expect(coerceString(0)).toBe('0');
    expect(coerceString({ a: 0 })).toBe('[object Object]');
  });
});
