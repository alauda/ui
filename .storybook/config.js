import { addParameters, configure } from '@storybook/angular';

addParameters({
  options: {
    panelPosition: 'right',
    theme: {
      brandTitle: 'Alauda UI',
    },
  },
});

configure(() => require('../stories'), module);
