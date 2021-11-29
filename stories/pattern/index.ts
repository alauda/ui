import { IconModule, TooltipModule } from '@alauda/ui';
import { storiesOf } from '@storybook/angular';

import { GlobalStyleComponent } from './global-style/global-style.component';
import { ShadowComponent } from './shadow/shadow.component';

storiesOf('Pattern', module)
  .add('global style', () => ({
    moduleMetadata: {
      imports: [IconModule, TooltipModule],
      declarations: [GlobalStyleComponent],
    },
    component: GlobalStyleComponent,
  }))
  .add('shadow', () => ({
    moduleMetadata: {
      declarations: [ShadowComponent],
    },
    component: ShadowComponent,
  }));
