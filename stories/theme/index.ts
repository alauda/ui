import { storiesOf } from '@storybook/angular';

import {
  PaletteCardDirective,
  PaletteComponent,
} from './palette/palette.component';

storiesOf('Theme', module).add('platte', () => ({
  moduleMetadata: {
    declarations: [PaletteCardDirective],
  },
  component: PaletteComponent,
}));
