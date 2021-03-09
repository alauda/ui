import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import { IgnoreNotFoundExportPlugin } from './IgnoreNotFoundExportPlugin';

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
    'storybook-dark-mode',
  ],
  webpackFinal(config: Configuration) {
    return merge(config, {
      resolve: {
        plugins: [
          new TsconfigPathsPlugin({
            configFile: '.storybook/tsconfig.json',
          }),
        ],
      },
      module: {
        rules: [
          {
            test: /stories\/\S+\/index.ts$/,
            loaders: [
              {
                loader: require.resolve('@storybook/source-loader'),
                options: { parser: 'typescript' },
              },
            ],
            enforce: 'pre',
          },
        ],
      },
      plugins: [
        // remove useless import type warning
        new IgnoreNotFoundExportPlugin(),
      ],
    });
  },
};
