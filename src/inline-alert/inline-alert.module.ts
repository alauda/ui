import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';

import { InlineAlertTitleDirective } from './helper-directives';
import { InlineAlertComponent } from './inline-alert.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [InlineAlertComponent, InlineAlertTitleDirective],
  exports: [InlineAlertComponent, InlineAlertTitleDirective],
})
export class InlineAlertModule {}
