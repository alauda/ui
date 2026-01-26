import { Config } from '@jest/types';
import { createEsmPreset } from 'jest-preset-angular/presets';

const preset = createEsmPreset();

const config: Config.InitialOptions = {
  ...preset,
  // Angular packages ship ESM (.mjs); allow transforming those in node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$|tslib))',
  ],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        useESM: true,
      },
    ],
  },
  testMatch: ['<rootDir>/src/**/*.+(spec|test).+(ts|js)?(x)'],
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
