const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    '../stories/**/index.(js|ts)',
    '../stories/**/*.stories.(js|ts|mdx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-options',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
  ],
  webpackFinal,
};

function webpackFinal(config) {
  config.resolve.plugins = [new TsconfigPathsPlugin()];

  return config;
}
