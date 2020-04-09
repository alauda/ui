// https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js
const { cloneDeep, last } = require('lodash');
const config = cloneDeep(require('@1stg/commitlint-config'));

last(config.rules['type-enum']).push('icon');

module.exports = config;
