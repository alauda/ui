import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
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
    '(\\w*/)*index\\.ts',
    '/node_modules/',
  ],
};

export default config;
