import toNumber from '../src/toNumber';

describe('toNumber', () => {
    test('should return the number itself if the input is already a number', () => {
        expect(toNumber(42)).toBe(42);
        expect(toNumber(-3.14)).toBe(-3.14);
        expect(toNumber(0)).toBe(0);
        expect(toNumber(Infinity)).toBe(Infinity);
        expect(toNumber(-Infinity)).toBe(-Infinity);
    });

    test('should convert numeric strings to numbers', () => {
        expect(toNumber('42')).toBe(42);
        expect(toNumber('3.14')).toBe(3.14);
        expect(toNumber('-0')).toBe(-0);
        expect(toNumber('0')).toBe(0);
    });

    test('should handle strings with leading or trailing whitespace', () => {
        expect(toNumber('  42  ')).toBe(42);
        expect(toNumber('  3.14\n')).toBe(3.14);
        expect(toNumber('\t-0\t')).toBe(-0);
    });

    test('should handle binary, octal, and hexadecimal string inputs', () => {
        expect(toNumber('0b1010')).toBe(10); // Binary
        expect(toNumber('0o17')).toBe(15); // Octal
        expect(toNumber('-0b1010')).toBe(NaN); // Invalid binary with sign
        expect(toNumber('0x1f')).toBe(31); // Hexadecimal
        expect(toNumber('-0x1f')).toBe(NaN); // Invalid hexadecimal with sign
    });

    test('should handle objects with valueOf and toString methods', () => {
        const objWithValueOf = {
            valueOf: () => 42,
        };
        expect(toNumber(objWithValueOf)).toBe(42);

        const objWithToString = {
            toString: () => '3.14',
        };
        expect(toNumber(objWithToString)).toBe(3.14);

        const objWithBoth = {
            valueOf: () => 42,
            toString: () => '3.14',
        };
        expect(toNumber(objWithBoth)).toBe(42);
    });

    test('should handle NaN-inducing inputs gracefully', () => {
        expect(toNumber(NaN)).toBe(NaN);
        expect(toNumber(undefined)).toBe(NaN);
        expect(toNumber(null)).toBe(0);
    });

    test('should handle symbol inputs gracefully', () => {
        expect(toNumber(Symbol('test'))).toBeNaN();
    });

    test('should handle invalid string inputs gracefully', () => {
        expect(toNumber('abc')).toBeNaN();
        expect(toNumber('')).toBe(0);
        expect(toNumber('0x')).toBeNaN();
        expect(toNumber('0b')).toBeNaN();
        expect(toNumber('0o')).toBeNaN();
    });
});
