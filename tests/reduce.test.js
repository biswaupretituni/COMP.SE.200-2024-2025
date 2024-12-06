import { expect, jest } from '@jest/globals';

import reduce from '../src/reduce';

describe('reduce', () => {
  describe('reducing arrays', () => {
    test('reduces array with accumulator', () => {
      const array = [1, 2, 3, 4];
      const result = reduce(array, (sum, n) => sum + n, 0);
      expect(result).toBe(10);
    });
  
    test('reduces array without accumulator', () => {
      const array = [1, 2, 3, 4];
      const result = reduce(array, (sum, n) => sum + n);
      expect(result).toBe(10);
    });

    test('handles empty array with accumulator', () => {
      const array = [];
      const result = reduce(array, (sum, n) => sum + n, 0);
      expect(result).toBe(0);
    });

    test('handles array with one element without accumulator', () => {
      const array = [1];
      const result = reduce(array, (sum, n) => sum + n);
      expect(result).toBe(1);
    });
  });
  
  describe('reducing objects', () => {
    test('reduces object with accumulator', () => {
      const object = { 'a': 1, 'b': 2, 'c': 3 };
      const result = reduce(object, (sum, n) => sum + n, 0);
      expect(result).toBe(6);
    });

    test('reduces object without accumulator', () => {
      const object = { 'a': 1, 'b': 2, 'c': 3 };
      const result = reduce(object, (sum, n) => sum + n);
      expect(result).toBe(6);
    });

    test('handles empty object with accumulator', () => {
      const object = {};
      const result = reduce(object, (sum, n) => sum + n, 0);
      expect(result).toBe(0);
    });

    test('groups object values by key', () => {
      const object = { 'a': 1, 'b': 2, 'c': 1 };
      const result = reduce(object, (res, val, key) => {
        (res[val] || (res[val] = [])).push(key);
        return res;
      }, {});
      expect(result).toEqual({ '1': ['a', 'c'], '2': ['b'] });
    });
  });

  describe('edge cases', () => {
    test('handles null collection', () => {
      const result = reduce(null, (sum, n) => sum + n, 0);
      expect(result).toBe(0);
    });

    test('handles undefined collection', () => {
      const result = reduce(undefined, (sum, n) => sum + n, 0);
      expect(result).toBe(0);
    });

    test('handles empty array without accumulator', () => {
      const array = [];
      const result = reduce(array, (sum, n) => sum + n);
      expect(result).toBeUndefined();
    });

    test('passes correct arguments to iteratee for arrays', () => {
      const spy = jest.fn((acc, value) => `${acc}-${value}`);
      const array = ['a', 'b', 'c'];
      reduce(array, spy, 'initial');
      

      expect(spy).toHaveBeenNthCalledWith(1, 'initial', 'a', 0, array); 
      expect(spy).toHaveBeenNthCalledWith(2, 'initial-a', 'b', 1, array);
      expect(spy).toHaveBeenNthCalledWith(3, 'initial-a-b', 'c', 2, array);

      expect(spy).toHaveBeenCalledTimes(3);
    });

    test('passes correct arguments to iteratee for objects', () => {
      const spy = jest.fn((acc, value) => `${acc}-${value}`);
      const object = { 'a': 1, 'b': 2 };
      reduce(object, spy, 'initial');
      
      expect(spy).toHaveBeenCalledWith('initial', 1, 'a', object);
      expect(spy).toHaveBeenCalledWith(expect.any(String), 2, 'b', object);
    });

    test('throws error if iteratee is not a function', () => {
      expect(() => reduce([1, 2, 3], null)).toThrow(TypeError);
    });
  });
});