import countBy from '../src/countBy';

describe('countBy', () => {
  describe('countBy with different collections', () => {
    // Test with array of objects
    test('should count objects by iteratee function result', () => {
      const users = [
        { 'user': 'barney', 'active': true },
        { 'user': 'betty', 'active': true },
        { 'user': 'fred', 'active': false }
      ];

      const result = countBy(users, value => value.active);
      expect(result).toEqual({ 'true': 2, 'false': 1 });
    });

    // Test with array of numbers
    test('should count numbers by their floor value', () => {
      const numbers = [4.3, 6.1, 6.4, 4.2, 2.1];
      const result = countBy(numbers, Math.floor);
      expect(result).toEqual({ '2': 1, '4': 2, '6': 2 });
    });

    // Test with array of strings
    test('should count strings by their length', () => {
      const words = ['one', 'two', 'three', 'four', 'five'];
      const result = countBy(words, word => word.length);
      expect(result).toEqual({ '3': 2, '4': 2, '5': 1 });
    });

    // Test with empty collection
    test('should return empty object for empty collection', () => {
      const result = countBy([], value => value);
      expect(result).toEqual({});
    });

    // Test with object as collection
    test('should work with objects as collection', () => {
      const object = {
        a: { type: 'fruit' },
        b: { type: 'vegetable' },
        c: { type: 'fruit' },
        d: { type: 'vegetable' }
      };
      const result = countBy(object, value => value.type);
      expect(result).toEqual({ 'fruit': 2, 'vegetable': 2 });
    });

    // Test with custom iteratee
    test('should work with custom complex iteratee', () => {
      const data = [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
        { category: 'A', value: 30 },
        { category: 'C', value: 40 },
        { category: 'B', value: 50 }
      ];
      const result = countBy(data, item => item.value > 25 ? 'high' : 'low');
      expect(result).toEqual({ 'high': 3, 'low': 2 });
    });

    // Test with boolean values
    test('should count boolean values', () => {
      const booleans = [true, false, true, true, false, true];
      const result = countBy(booleans, Boolean);
      expect(result).toEqual({ 'true': 4, 'false': 2 });
    });
  });
  
  describe('edge cases', () => {
    // Test with null/undefined handling
    test('should handle null and undefined values', () => {
      const values = [null, undefined, 'hello', null, 'world', undefined];
      const result = countBy(values, value => value ?? 'empty');
      expect(result).toEqual({ 'empty': 4, 'hello': 1, 'world': 1 });
    });

    // Test invalid collections
    test('should return empty object for invalid collections', () => {
      expect(countBy(null, value => value)).toEqual({});
      expect(countBy(undefined, value => value)).toEqual({});
      expect(countBy(42, value => value)).toEqual({});
      expect(countBy(true, value => value)).toEqual({});
    });

    // Test with non-function iteratee
    test('should throw error for non-function iteratee', () => {
      expect(() => {
        countBy([1, 2, 3], 'not a function');
      }).toThrow();
    });
  });
})