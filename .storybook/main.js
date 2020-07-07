const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    '../stories/**/index.(js|ts)',
    '../stories/**/*.stories.(js|ts|mdx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
  ],
  webpackFinal,
};

function webpackFinal(config) {
  config.resolve.plugins = [new TsconfigPathsPlugin()];

  // story source addon
  config.module.rules.push({
    test: /stories\/\S+\/index.ts$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  });

  return config;
}
