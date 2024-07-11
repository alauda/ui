const config = require('@1stg/config');

const { iniRcFiles, jsoncFiles, nonJsonRcFiles, shRcFiles } = config;

/**
 * @type {import('prettier').Config}
 */
module.exports = {
  arrowParens: 'avoid',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlWhitespaceSensitivity: 'ignore',
  svelteIndentScriptAndStyle: false, // align with default option of `vueIndentScriptAndStyle`
  overrides: [
    {
      files: iniRcFiles,
      options: {
        parser: 'ini',
      },
    },
    {
      files: jsoncFiles,
      options: {
        parser: 'json',
      },
    },
    {
      files: ['.*rc', '*.json'],
      excludeFiles: [...nonJsonRcFiles, ...jsoncFiles],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: shRcFiles,
      options: {
        parser: 'sh',
      },
    },
    {
      files: '*.html',
      options: {
        parser: 'angular',
      },
    },
  ],
};
