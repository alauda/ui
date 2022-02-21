module.exports = {
  core: {
    builder: 'webpack5',
  },
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
          options: { parser: 'typescript' },
        },
      ],
      enforce: 'pre',
    });
    return config;
  },
};
