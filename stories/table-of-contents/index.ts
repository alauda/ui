import { TableOfContentsModule } from '@alauda/ui';
import { storiesOf } from '@storybook/angular';

import { DemoComponent } from './demo.component';

storiesOf('Toc', module).add('toc', () => ({
  component: DemoComponent,
  moduleMetadata: {
    imports: [TableOfContentsModule],
    declarations: [DemoComponent],
  },
}));
