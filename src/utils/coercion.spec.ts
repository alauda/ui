import { coerceAttrBoolean, coerceString } from './coercion';

describe('coercion', () => {
  it('should coerce string correctly', () => {
    expect(coerceString(undefined)).toBe('');
    expect(coerceString(null)).toBe('');
    expect(coerceString('test')).toBe('test');
    expect(coerceString(0)).toBe('0');
    expect(coerceString({ a: 0 })).toBe('[object Object]');
  });

  it('should coerce attribute boolean correctly', () => {
    expect(coerceAttrBoolean(null)).toBeFalsy();
    expect(coerceAttrBoolean(undefined)).toBeFalsy();
    expect(coerceAttrBoolean('')).toBeTruthy();
    expect(coerceAttrBoolean('false')).toBeTruthy();
    expect(coerceAttrBoolean('true')).toBeTruthy();
    expect(coerceAttrBoolean('test')).toBeTruthy();
    expect(coerceAttrBoolean(0)).toBeFalsy();
    expect(coerceAttrBoolean(1)).toBeTruthy();
    expect(coerceAttrBoolean({})).toBeTruthy();
  });
});
