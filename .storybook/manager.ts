import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  panelPosition: 'right',
  theme: create({
    base: 'light',
    brandTitle: 'Alauda UI',
  }),
});
