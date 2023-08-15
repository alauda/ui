import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { InputModule } from '../input';
import { SelectModule } from '../select';

import { PAGINATOR_INTL_PROVIDER } from './paginator-intl';
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
  providers: [PAGINATOR_INTL_PROVIDER],
})
export class PaginatorModule {}
