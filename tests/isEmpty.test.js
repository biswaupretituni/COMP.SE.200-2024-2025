
import isEmpty from  '../src/isEmpty';

describe('isEmpty', () => {
    test('should return true for null and undefined', () => {
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
    });

    test('should return true for primitive values', () => {
        expect(isEmpty(true)).toBe(true);
        expect(isEmpty(false)).toBe(true);
        expect(isEmpty(0)).toBe(true);
        expect(isEmpty(1)).toBe(true);
        expect(isEmpty('')).toBe(true);
    });

    test('should return false for non-empty strings', () => {
        expect(isEmpty('abc')).toBe(false);
    });

    test('should return true for empty arrays and false for non-empty arrays', () => {
        expect(isEmpty([])).toBe(true);
        expect(isEmpty([1, 2, 3])).toBe(false);
    });

    test('should return true for empty objects and false for non-empty objects', () => {
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({ a: 1 })).toBe(false);
    });

    test('should return true for empty maps and sets, false for non-empty ones', () => {
        const emptyMap = new Map();
        const nonEmptyMap = new Map([['key', 'value']]);
        const emptySet = new Set();
        const nonEmptySet = new Set([1, 2, 3]);

        expect(isEmpty(emptyMap)).toBe(true);
        expect(isEmpty(nonEmptyMap)).toBe(false);
        expect(isEmpty(emptySet)).toBe(true);
        expect(isEmpty(nonEmptySet)).toBe(false);
    });

    test('should return true for empty buffers and false for non-empty buffers', () => {
        const emptyBuffer = Buffer.alloc(0);
        const nonEmptyBuffer = Buffer.from('data');

        expect(isEmpty(emptyBuffer)).toBe(true);
        expect(isEmpty(nonEmptyBuffer)).toBe(false);
    });

    test('should handle array-like objects correctly', () => {
        function testFunc() {
            expect(isEmpty(arguments)).toBe(true);
        }
        testFunc();
        function testFuncNonEmpty() {
            expect(isEmpty(arguments)).toBe(false);
        }
        testFuncNonEmpty(1);
    });

    test('should handle prototypes correctly', () => {
        function Test() {}
        Test.prototype.prop = 'value';
        const obj = new Test();
        expect(isEmpty(obj)).toBe(true);
    });

    test('should handle edge cases', () => {
        expect(isEmpty(() => {})).toBe(true); // Functions
        expect(isEmpty(new Date())).toBe(true); // Dates with no properties
    });
});
