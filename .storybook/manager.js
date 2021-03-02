const { addons } = require('@storybook/addons');
const { create } = require('@storybook/theming');

addons.setConfig({
  panelPosition: 'right',
  theme: create({
    base: 'light',
    brandTitle: 'Alauda UI',
  }),
});
