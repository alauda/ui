import { setCompodocJson } from '@storybook/addon-docs/angular';
import { addons } from '@storybook/addons';
import type { Preview } from '@storybook/angular';

import docJson from '../documentation.json';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import '!style-loader!css-loader!sass-loader!./global.scss';

setCompodocJson(docJson);

const channel = addons.getChannel();

channel.addListener('DARK_MODE', isDark => {
  document
    .querySelector('html')
    .setAttribute('aui-theme-mode', isDark ? 'dark' : 'light');
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
