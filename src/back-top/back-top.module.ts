import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';

import { BackTopComponent } from './back-top.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  imports: [CommonModule, IconModule, ButtonModule],
  declarations: [BackTopComponent],
  exports: [BackTopComponent],
})
export class BackTopModule {}
