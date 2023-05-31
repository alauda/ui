import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  core: {},
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
  webpackFinal(config) {
    config.module.rules.push({
      test: /\.stories\.tsx?$/,
      use: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            parser: 'typescript',
          },
        },
      ],
      enforce: 'pre',
    });
    return config;
  },
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  features: {
    legacyMdx1: true, // Enables MDX v1 support
    storyStoreV7: false, // Opt out of on-demand story loading
  },
};
export default config;
