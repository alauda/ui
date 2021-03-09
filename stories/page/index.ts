import { IconModule, PageModule, PlatformNavModule } from '@alauda/ui';
import { Component } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { PlatformNavDemoComponent } from '../nav-menu';

storiesOf('Page', module)
  .addDecorator(withKnobs)
  .add('page', () => ({
    moduleMetadata: {
      imports: [PageModule, PlatformNavModule, IconModule],
      declarations: [PlatformNavDemoComponent, DemoComponent],
    },
    component: DemoComponent,
  }));

@Component({
  template: `
    <aui-page>
      <div *auiPageHeader>page header</div>
      <div *auiPageContent>page content</div>
      <div *auiPageToolbar>toolbar</div>
      <div *auiPageSnackbar>snackbar</div>
      <platform-nav-demo *auiPageSider></platform-nav-demo>
    </aui-page>
  `,
  styles: [
    `
      ::ng-deep body {
        padding: 0;
      }
    `,
  ],
})
class DemoComponent {}
