import add from "../src/add";

describe('add', () => {
  describe('adding numbers', () => {
    test('should return the correct sum of two positive numbers', () => {
      expect(add(6, 4)).toBe(10);
    });
  
    test('should return the correct sum of two negative numbers', () => {
      expect(add(-6, -4)).toBe(-10);
    });
  
    test('should return the correct sum when one number is zero', () => {
      expect(add(0, 4)).toBe(4);
      expect(add(6, 0)).toBe(6);
    });
  
    test('should return the correct sum of positive and negative numbers', () => {
      expect(add(6, -4)).toBe(2);
      expect(add(-6, 4)).toBe(-2);
    });
  
    test('should return 0 when adding two zeros', () => {
      expect(add(0, 0)).toBe(0);
    });
  })

  describe('edge cases', () => {
    test('should correctly add large numbers', () => {
      expect(add(1000000000, 2000000000)).toBe(3000000000);
    });
  
    test('should correctly add a large and a small number', () => {
      expect(add(1000000000, 1)).toBe(1000000001);
    });

    test('should return the first argument when the second is null', () => {
      expect(add(6, null)).toBe(6);
    });
  
    test('should return the second argument when the first is null', () => {
      expect(add(null, 4)).toBe(4);
    });
    
    test('should return the first argument when the second is undefined', () => {
      expect(add(6, undefined)).toBe(6);
    });
  
    test('should return the second argument when the first is undefined', () => {
      expect(add(undefined, 4)).toBe(4);
    });
  
    test('handles non-numeric string values', () => {
      expect(add('a', 'b')).toBe('ab');
      expect(add('a', 4)).toBe('a4');
      expect(add(6, 'b')).toBe('6b');
    })
  
    test('handles numeric string values', () => {
      expect(add('6', '4')).toBe('64');
      expect(add('4', 6)).toBe('46');
      expect(add('6', 4)).toBe('64');
    })
  
    test('should coerce boolean values to numbers', () => {
      expect(add(true, 4)).toBe(5);  // true equals to 1
      expect(add(6, false)).toBe(6); // false equals to 0
    });
  
    test('should return the default value 0 when no argument is passed', () => {
      expect(add()).toBe(0);
    });
  });
});