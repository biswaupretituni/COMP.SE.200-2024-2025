import toNumber from '../src/toNumber';

describe('toNumber', () => {
  test('converts number to itself', () => {
    expect(toNumber(42)).toBe(42);
    expect(toNumber(-1.5)).toBe(-1.5);
  });

  test('converts numeric strings to numbers', () => {
    expect(toNumber('42')).toBe(42);
    expect(toNumber('  42  ')).toBe(42); // Handles trimming
    expect(toNumber('-1.5')).toBe(-1.5);
  });

  test('handles binary, octal, and hexadecimal strings', () => {
    expect(toNumber('0b1010')).toBe(10); // Binary
    expect(toNumber('0o17')).toBe(15);   // Octal
    expect(toNumber('0x1A')).toBe(26);   // Hexadecimal
  });

  test('returns NaN for invalid strings', () => {
    expect(toNumber('abc')).toBeNaN();
    expect(toNumber('0b102')).toBeNaN(); // Invalid binary
    expect(toNumber('0o89')).toBeNaN();  // Invalid octal
    expect(toNumber('0xGHI')).toBeNaN(); // Invalid hexadecimal
  });

  test('handles symbols', () => {
    expect(toNumber(Symbol('test'))).toBeNaN();
  });

  test('handles objects', () => {
    const obj = {
      valueOf: () => 42,
    };
    expect(toNumber(obj)).toBe(42);

    const nestedObj = {
      valueOf: () => ({
        toString: () => '123',
      }),
    };
    expect(toNumber(nestedObj)).toBe(123);
  });

  test('handles null, undefined, and special cases', () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBeNaN();
    expect(toNumber(NaN)).toBeNaN();
    expect(toNumber(Infinity)).toBe(Infinity);
  });
});
