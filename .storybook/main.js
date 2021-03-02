const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const IgnoreNotFoundExportPlugin = require('./IgnoreNotFoundExportPlugin.js');

function webpackFinal(config) {
  config.resolve.plugins = [
    new TsconfigPathsPlugin({
      configFile: '.storybook/tsconfig.json',
    }),
  ];

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

  // remove useless import type warning
  config.plugins.push(new IgnoreNotFoundExportPlugin());

  return config;
}

module.exports = {
  stories: [
    '../stories/**/index.@(js|ts)',
    '../stories/**/*.stories.@(js|ts|mdx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    'storybook-dark-mode',
  ],
  webpackFinal,
};
