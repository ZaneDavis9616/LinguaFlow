module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src'
  ],
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/$1',
  },
};
