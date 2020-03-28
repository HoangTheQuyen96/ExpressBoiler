module.exports = {
  verbose: true,
  bail: true,
  testURL: 'http://localhost/',
  globals: {
    __DEV__: true,
  },
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/config/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/config/'],
};
