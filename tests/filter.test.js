import { expect, jest } from '@jest/globals';
import filter from '../src/filter';

describe('filter', () => {
  describe('filtering collections', () => {
    test('should filter numbers based on predicate', () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const result = filter(numbers, num => num % 2 === 0);
      expect(result).toEqual([2, 4, 6]);
    });
  
    test('should filter objects based on property', () => {
      const users = [
        { 'user': 'barney', 'active': true },
        { 'user': 'fred', 'active': false }
      ];
      const result = filter(users, ({ active }) => active);
      expect(result).toEqual([{ 'user': 'barney', 'active': true }]);
    });
  
    test('should return empty array when input array is empty', () => {
      const result = filter([], () => true);
      expect(result).toEqual([]);
    });
  
    test('should handle null/undefined array', () => {
      expect(filter(null, () => true)).toEqual([]);
      expect(filter(undefined, () => true)).toEqual([]);
    });
  
    test('should pass value, index, and array to predicate', () => {
      const array = ['a', 'b', 'c'];
      const predicate = jest.fn();
      filter(array, predicate);
      
      expect(predicate).toHaveBeenCalledTimes(3);
      expect(predicate).toHaveBeenNthCalledWith(1, 'a', 0, array);
      expect(predicate).toHaveBeenNthCalledWith(2, 'b', 1, array);
      expect(predicate).toHaveBeenNthCalledWith(3, 'c', 2, array);
    });
  
    test('should handle complex filtering conditions', () => {
      const items = [
        { id: 1, value: 10, type: 'A' },
        { id: 2, value: 20, type: 'B' },
        { id: 3, value: 30, type: 'A' },
        { id: 4, value: 40, type: 'C' }
      ];
      
      const result = filter(items, item => 
        item.value > 20 && item.type === 'A'
      );
      
      expect(result).toEqual([
        { id: 3, value: 30, type: 'A' }
      ]);
    });
  
    test('should filter strings based on length', () => {
      const words = ['cat', 'dog', 'elephant', 'rat', 'hippopotamus'];
      const result = filter(words, word => word.length > 3);
      expect(result).toEqual(['elephant', 'hippopotamus']);
    });
  
    test('should handle arrays with falsy values', () => {
      const array = [0, 1, false, 2, '', 3, null, undefined, NaN];
      const result = filter(array, Boolean);
      expect(result).toEqual([1, 2, 3]);
    });
  
    test('should not modify the original array', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      filter(original, num => num % 2 === 0);
      expect(original).toEqual(originalCopy);
    });

    test('should work with array-like objects', () => {
      const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
      const result = filter(arrayLike, num => num % 2 !== 0);
      expect(result).toEqual([1, 3]);
    });
  
    test('should work with sparse arrays', () => {
      const sparseArray = [1, , 3, , 5];
      const result = filter(sparseArray, x => x != null);
      expect(result).toEqual([1, 3, 5]);
    });
  
    test('should return all elements when all match predicate', () => {
      const numbers = [2, 4, 6, 8];
      const result = filter(numbers, num => num % 2 === 0);
      expect(result).toEqual([2, 4, 6, 8]);
    });
  
    test('should return empty array when no elements match predicate', () => {
      const numbers = [2, 4, 6, 8];
      const result = filter(numbers, num => num % 2 !== 0);
      expect(result).toEqual([]);
    });
  
    test('should handle predicates returning non-boolean values', () => {
      const array = [0, 1, 2, '', 'hello', null];
      const result = filter(array, item => item); // truthy values
      expect(result).toEqual([1, 2, 'hello']);
    });
  
    test('should handle large arrays', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const result = filter(largeArray, num => num % 100 === 0);
      expect(result).toEqual([0, 100, 200, 300, 400, 500, 600, 700, 800, 900]);
    });
  
    test('should work with nested arrays', () => {
      const nested = [[1, 2], [3, 4], [5, 6]];
      const result = filter(nested, arr => arr[0] % 2 === 0);
      expect(result).toEqual([]);
    });
  });

  describe('edge cases', () => {
    test('should handle arrays with mixed data types', () => {
      const mixed = [1, 'two', undefined, false, { key: 'value' }, [1, 2, 3]];
      const result = filter(mixed, item => typeof item === 'object' && !Array.isArray(item));
      expect(result).toEqual([{ key: 'value' }]);
    });
  
    test('should return empty array when predicate is always false', () => {
      const numbers = [1, 2, 3, 4];
      const result = filter(numbers, () => false);
      expect(result).toEqual([]);
    });
  
    test('should handle extremely large arrays', () => {
      const largeArray = Array.from({ length: 10 ** 6 }, (_, i) => i);
      const result = filter(largeArray, num => num % 100000 === 0);
      expect(result).toEqual([0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000]);
    });
  
    test('should handle objects with array-like properties', () => {
      const obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
      const result = filter(obj, char => char === 'b');
      expect(result).toEqual(['b']);
    });
  
    test('should handle arrays with NaN values', () => {
      const array = [NaN, 1, 2, NaN, 3];
      const result = filter(array, num => !isNaN(num));
      expect(result).toEqual([1, 2, 3]);
    });
  
    test('should handle arrays with duplicate values', () => {
      const duplicates = [1, 2, 2, 3, 3, 3];
      const result = filter(duplicates, num => num === 3);
      expect(result).toEqual([3, 3, 3]);
    });
  
    test('should handle empty predicate function', () => {
      const array = [1, 2, 3];
      const result = filter(array, () => {});
      expect(result).toEqual([]);
    });
  
    test('should handle arrays with undefined gaps', () => {
      const sparseArray = [1, , 3, , 5];
      const result = filter(sparseArray, x => x !== undefined);
      expect(result).toEqual([1, 3, 5]);
    });
  
    test('should handle arrays with only falsy values', () => {
      const falsyArray = [null, undefined, 0, '', false, NaN];
      const result = filter(falsyArray, Boolean);
      expect(result).toEqual([]);
    });
  });
});