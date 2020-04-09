import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';

import { BackTopComponent } from './back-top.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [BackTopComponent],
  exports: [BackTopComponent],
})
export class BackTopModule {}
