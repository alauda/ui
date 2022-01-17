import '!style-loader!css-loader!sass-loader!./global.scss';
import { addons } from '@storybook/addons';

const channel = addons.getChannel();

channel.addListener('DARK_MODE', (isDark: boolean) => {
  document
    .querySelector('html')
    .setAttribute('aui-theme-mode', isDark ? 'dark' : 'light');
});
