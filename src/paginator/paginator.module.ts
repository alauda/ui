import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/public-api';
import { IconModule } from '../icon/public-api';
import { InputModule } from '../input/public-api';
import { SelectModule } from '../select/public-api';

import { PAGINATOR_INTL_PROVIDER } from './paginator-intl';
import { PaginatorComponent } from './paginator.component';

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule, SelectModule, InputModule],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
  providers: [PAGINATOR_INTL_PROVIDER],
})
export class PaginatorModule {}
