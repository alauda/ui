import { A11yModule } from '@angular/cdk/a11y';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '../button/public-api';
import { IconModule } from '../icon/public-api';

import {
  TabBodyComponent,
  TabBodyPortalDirective,
  TabContentDirective,
  TabHeaderAddonDirective,
  TabLabelDirective,
  TabLabelWrapperDirective,
  TabTitleDirective,
} from './tab-body.component';
import { TabGroupComponent } from './tab-group.component';
import { TabHeaderActiveIndicatorComponent } from './tab-header-active-indicator.component';
import { TabHeaderComponent } from './tab-header.component';
import { TabComponent } from './tab.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PortalModule,
    ButtonModule,
    IconModule,
    A11yModule,
    ObserversModule,
  ],
  declarations: [
    TabGroupComponent,
    TabComponent,
    TabLabelDirective,
    TabContentDirective,
    TabHeaderAddonDirective,
    TabTitleDirective,
    TabHeaderComponent,
    TabBodyComponent,
    TabBodyPortalDirective,
    TabLabelWrapperDirective,
    TabHeaderActiveIndicatorComponent,
  ],
  exports: [
    TabGroupComponent,
    TabComponent,
    TabLabelDirective,
    TabContentDirective,
    TabHeaderAddonDirective,
    TabTitleDirective,
    TabLabelWrapperDirective,
    TabHeaderComponent,
  ],
})
export class TabsModule {}
