module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/src/**/+(*.)+(spec|test).+(ts|js)?(x)'],
  coverageReporters: ['text', 'html'],
  coverageDirectory: '<rootDir>/coverage',
  modulePathIgnorePatterns: [
    '<rootDir>/release',
    '<rootDir>/dist',
    '<rootDir>/stories',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/release',
    '<rootDir>/dist',
    '<rootDir>/stories',
    '(\\w*/)*(\\w|\\.)+\\.html',
    '(\\w*/)*public-api\\.ts',
    '/node_modules/',
  ],
};
