import { addons } from '@storybook/addons';

const channel = addons.getChannel();

channel.addListener('DARK_MODE', isDark => {
  document
    .querySelector('html')
    .setAttribute('aui-theme-mode', isDark ? 'dark' : 'light');
});
