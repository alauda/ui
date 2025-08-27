import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { BackTopComponent } from './back-top.component';

@NgModule({
  imports: [CommonModule, IconModule, ButtonModule, BackTopComponent],
  exports: [BackTopComponent],
})
export class BackTopModule {}
