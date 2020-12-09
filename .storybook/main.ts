import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';

function webpackFinal(config: Configuration) {
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

export default {
  stories: [
    '../stories/**/index.@(js|ts)',
    '../stories/**/*.stories.@(js|ts|mdx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
  ],
  webpackFinal,
};
