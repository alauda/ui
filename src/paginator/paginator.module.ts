import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { InputModule } from '../input';
import { SelectModule } from '../select';

import { PaginatorComponent } from './paginator.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    SelectModule,
    InputModule,
    PaginatorComponent,
  ],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
