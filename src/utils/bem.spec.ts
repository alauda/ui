import { buildBem } from './bem';

describe('bem classname utils', () => {
  const bem = buildBem('test');

  it('should create block classname', () => {
    expect(bem.block()).toBe('test');
  });

  it('should create block classname with modifiers', () => {
    expect(bem.block('before', { a: true, b: false }, 'after')).toBe(
      'test test--before test--a test--after',
    );
  });

  it('should create element classname', () => {
    expect(bem.element('item')).toBe('test__item');
  });

  it('should create element classname with modifiers', () => {
    expect(bem.element('item', 'before', { a: true, b: false }, 'after')).toBe(
      'test__item test__item--before test__item--a test__item--after',
    );
  });

  it('should create modifier classname', () => {
    expect(bem.modifier('before')).toBe('test--before');
  });
});
