require('!style-loader!css-loader!sass-loader!./global.scss');

const { addons } = require('@storybook/addons');

const channel = addons.getChannel();

channel.addListener('DARK_MODE', isDark => {
  document
    .querySelector('html')
    .setAttribute('aui-color-mode', isDark ? 'dark' : 'light');
});
