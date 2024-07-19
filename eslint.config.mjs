import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import angular from 'angular-eslint';
import jestEslint from 'eslint-plugin-jest';
import unicornEslint from 'eslint-plugin-unicorn';
import sonarEslint from 'eslint-plugin-sonarjs';
import { fileURLToPath } from 'url';
import path from 'path';

import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

/**
 * @param {string} name the pugin name
 * @param {string} alias the plugin alias
 * @returns {import("eslint").ESLint.Plugin}
 */
function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}

export default tsEslint.config(
  {
    ignores: [
      'coverage',
      'dist',
      'release',
      'CHANGELOG.md',
      '.angular',
      '!.*.js',
      '!.storybook',
      'documentation.json',
    ],
  },
  sonarEslint.configs.recommended,
  {
    ...unicornEslint.configs['flat/recommended'],
    rules: {
      'unicorn/catch-error-name': [
        2,
        {
          name: 'error',
          ignore: ['^e(rr)?$'],
        },
      ],
      'unicorn/consistent-function-scoping': 0,
      'unicorn/filename-case': [
        2,
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
          // ignore UPPER_CASE markdown or yaml filenames
          ignore: [/^[A-Z](([\dA-Z]+_)*[\dA-Z]+)?\.(mdx?|ya?ml)$/],
        },
      ],
      'unicorn/no-array-reduce': 0,
      'unicorn/no-null': 0,
      'unicorn/no-unreadable-array-destructuring': 0, // conflict with `no-unused-vars`
      'unicorn/prefer-module': 0,
      'unicorn/prefer-object-from-entries': 0,
      'unicorn/prevent-abbreviations': 0,
      '@angular-eslint/template/no-negated-async': 0,
      '@typescript-eslint/member-ordering': 0,
      '@typescript-eslint/naming-convention': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-floating-promises': 0,
      '@typescript-eslint/no-magic-numbers': 0,
      '@typescript-eslint/no-type-alias': 0,
      '@typescript-eslint/no-unnecessary-condition': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/prefer-ts-expect-error': 0,
      '@typescript-eslint/restrict-plus-operands': 0,
      '@typescript-eslint/sort-type-union-intersection-members': 0,
      '@typescript-eslint/unbound-method': 0,
      'accessor-pairs': 0,
      'no-magic-numbers': 0,
      'no-negated-condition': 0, // not auto-fixable
      'promise/always-return': 0,
      'promise/catch-or-return': 0,
      'unicorn/explicit-length-check': 0,
      'unicorn/no-array-for-each': 0,
      'unicorn/no-fn-reference-in-iterator': 0,
      'unicorn/prefer-number-properties': 0,
      'unicorn/prefer-prototype-methods': 0,
      'unicorn/prefer-spread': 0,
    },
  },
  {
    files: ['**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],

    ignores: ['**/*.spec.ts', '**/stories/**/*.ts'],
    processor: angular.processInlineTemplates,
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        requireConfigFile: false,
      },
    },
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['aui'],
          style: 'kebab-case',
        },
      ],

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ['aui'],
          style: 'camelCase',
        },
      ],

      'unicorn/prefer-event-target': 'off',

      '@typescript-eslint/consistent-generic-constructors': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@angular-eslint/no-output-native': 0,
      '@angular-eslint/no-inputs-metadata-property': 'off',
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-rename': 'off',
      '@angular-eslint/no-host-metadata-property': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'markup/markup': 'off',
      'regexp/strict': 'off',
      'no-empty': [
        2,
        {
          allowEmptyCatch: true,
        },
      ],
      'no-empty-function': 0,
      '@typescript-eslint/consistent-indexed-object-style': 0,
      '@typescript-eslint/array-type': [
        2,
        {
          default: 'array-simple',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    files: ['**/*.spec.ts'],
    extends: [
      js.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    ...jestEslint.configs['flat/recommended'],
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      'jest/expect-expect': 'off',
      'jest/no-export': 'off',
      'sonarjs/no-duplicate-string': 'off',

      'n/no-extraneous-import': 0,
      'n/no-extraneous-require': 0,
      'n/no-unsupported-features/es-builtins': 0,
      'jest/no-conditional-expect': 'error',
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/array-type': [
        2,
        {
          default: 'array-simple',
        },
      ],
    },
  },
  ...compat.extends('plugin:import/typescript'),
  {
    plugins: {
      import: legacyPlugin('eslint-plugin-import', 'import'),
    },
  },
);
