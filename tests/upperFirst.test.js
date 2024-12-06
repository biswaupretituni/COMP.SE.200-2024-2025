import upperFirst from '../src/upperFirst';

describe('upperFirst', () => {
    test('should capitalize the first character of a string', () => {
        expect(upperFirst('hello')).toBe('Hello');
        expect(upperFirst('world')).toBe('World');
    });

    test('should not modify a string if the first character is already uppercase', () => {
        expect(upperFirst('Hello')).toBe('Hello');
        expect(upperFirst('World')).toBe('World');
    });

    test('should handle empty strings gracefully', () => {
        expect(upperFirst('')).toBe('');
    });

    test('should handle strings with special characters at the start', () => {
        expect(upperFirst('@special')).toBe('@special');
        expect(upperFirst('!important')).toBe('!important');
    });

    test('should handle Unicode characters', () => {
        expect(upperFirst('ñandú')).toBe('Ñandú'); // Lowercase Unicode
        expect(upperFirst('Ñandú')).toBe('Ñandú'); // Already Uppercase Unicode
        expect(upperFirst('😀happy')).toBe('😀happy'); // Emoji as first character
    });

    test('should handle non-string inputs', () => {
        expect(upperFirst(null)).toBe('');
        expect(upperFirst(undefined)).toBe('');
        expect(upperFirst(['a', 'b'])).toBe('Ab');
        expect(() => upperFirst(123)).toThrow(TypeError);
        expect(() => upperFirst(true)).toThrow(TypeError);
        expect(() => upperFirst([])).toThrow(TypeError);
        expect(() => upperFirst({})).toThrow(TypeError);
    });

    test('should handle strings with whitespace', () => {
        expect(upperFirst('  hello')).toBe('  hello');
        expect(upperFirst('\nhello')).toBe('\nhello');
    });

    test('should handle strings with mixed casing', () => {
        expect(upperFirst('mIxEd')).toBe('MIxEd');
        expect(upperFirst('UPPERcase')).toBe('UPPERcase');
    });
});
