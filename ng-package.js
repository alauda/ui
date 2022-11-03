const { getBuildDest } = require('./scripts/utils');

module.exports = {
  $schema: './node_modules/ng-packagr/ng-package.schema.json',
  dest: getBuildDest(),
  lib: {
    entryFile: './src/index.ts',
  },
};
