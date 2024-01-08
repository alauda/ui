import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-preset-angular',
  testMatch: ['<rootDir>/src/**/+(*.)+(spec|test).+(ts|js)?(x)'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
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
