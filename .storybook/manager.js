import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  panelPosition: 'right',
  theme: create({
    base: 'light',
    brandTitle: 'Alauda UI',
  }),
});
