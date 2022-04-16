module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{tsx|ts}', '!src/**/*.{d.ts,spec.tsx}'],
  coverageReporters: ['lcov', 'json'],
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
};
