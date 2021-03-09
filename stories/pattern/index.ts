import {
  CardModule,
  IconModule,
  InputModule,
  TableModule,
  TooltipModule,
} from '@alauda/ui';
import { storiesOf } from '@storybook/angular';

import { GlobalStyleComponent } from './global-style/global-style.component';
import { ShadowComponent } from './shadow/shadow.component';
import { TableCardComponent } from './table-card/table-card.component';

storiesOf('Pattern', module)
  .add('global style', () => ({
    moduleMetadata: {
      imports: [IconModule, TooltipModule],
      declarations: [GlobalStyleComponent],
    },
    component: GlobalStyleComponent,
  }))
  .add('table card', () => ({
    moduleMetadata: {
      imports: [TableModule, CardModule, InputModule],
      declarations: [TableCardComponent],
    },
    component: TableCardComponent,
  }))
  .add('shadow', () => ({
    moduleMetadata: {
      declarations: [ShadowComponent],
    },
    component: ShadowComponent,
  }));
