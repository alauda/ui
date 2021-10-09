import { IconModule, NavMenuModule, PageModule } from '@alauda/ui';
import { Component } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { NavMenuDemoComponent } from '../nav-menu';

storiesOf('Page', module)
  .addDecorator(withKnobs)
  .add('page', () => ({
    moduleMetadata: {
      imports: [PageModule, NavMenuModule, IconModule],
      declarations: [NavMenuDemoComponent, DemoComponent],
    },
    component: DemoComponent,
  }));

@Component({
  template: `
    <aui-page>
      <div *auiPageHeader>page header</div>
      <div *auiPageContent><aui-card>page content</aui-card></div>
      <div *auiPageToolbar>toolbar</div>
      <div *auiPageSnackbar>snackbar</div>
      <aui-nav-demo *auiPageSider></aui-nav-demo>
    </aui-page>
  `,
  styles: [
    `
      ::ng-deep body {
        padding: 0 !important;
      }
    `,
  ],
})
class DemoComponent {}
