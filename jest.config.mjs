// jest.config.mjs
export default {
  testEnvironment: 'node', // Or 'jsdom' if you're testing in the browser
  roots: ['<rootDir>/tests'], // Test files location
  testMatch: ['**/*.test.js'], // Match test files ending with `.test.js`
  moduleFileExtensions: ['js', 'json', 'node'],
  coveragePathIgnorePatterns: [
    '/src/.internal/',     // Exclude .internal directory
  ]
};
