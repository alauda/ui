const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ config }) => {
  config.resolve.plugins = [new TsconfigPathsPlugin()];
  config.module.rules.push({
    test: /stories\/\S+\/index.ts$/,
    loaders: [
      {
        loader: '@storybook/source-loader',
        options: {
          parser: 'typescript',
        },
      },
    ],
    enforce: 'pre',
  });

  return config;
};
