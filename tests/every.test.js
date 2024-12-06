import { jest } from '@jest/globals';
import every from '../src/every';

describe('every', () => {
    test('should return true for an empty array', () => {
        const result = every([], Boolean);
        expect(result).toBe(true);
    });

    test('should return true when all elements satisfy the predicate', () => {
        const isEven = (num) => num % 2 === 0;
        expect(every([2, 4, 6], isEven)).toBe(true);
    });

    test('should return false when some elements do not satisfy the predicate', () => {
        const isEven = (num) => num % 2 === 0;
        expect(every([2, 3, 6], isEven)).toBe(false);
    });

    test('should return false when no elements satisfy the predicate', () => {
        const isPositive = (num) => num > 0;
        expect(every([-1, -2, -3], isPositive)).toBe(false);
    });

    test('should work with a truthy predicate (e.g., Boolean)', () => {
        expect(every([true, 1, 'yes'], Boolean)).toBe(true);
        expect(every([true, 0, 'yes'], Boolean)).toBe(false);
    });

    test('should work with complex predicates', () => {
        const isShortString = (str) => typeof str === 'string' && str.length < 5;
        expect(every(['cat', 'dog', 'bat'], isShortString)).toBe(true);
        expect(every(['cat', 'elephant', 'bat'], isShortString)).toBe(false);
    });

    test('should return true for null or undefined arrays', () => {
        expect(every(null, Boolean)).toBe(true);
        expect(every(undefined, Boolean)).toBe(true);
    });

    test('should stop iteration as soon as a predicate returns false', () => {
        const mockPredicate = jest.fn((num) => num % 2 === 0);
        every([2, 4, 5, 6], mockPredicate);
        expect(mockPredicate).toHaveBeenCalledTimes(3); // Stops after the third element
    });

    test('should pass the correct arguments to the predicate', () => {
        const mockPredicate = jest.fn(() => true);
        const array = [1, 2, 3];
        every(array, mockPredicate);
        expect(mockPredicate).toHaveBeenCalledWith(1, 0, array);
        expect(mockPredicate).toHaveBeenCalledWith(2, 1, array);
        expect(mockPredicate).toHaveBeenCalledWith(3, 2, array);
    });
});
