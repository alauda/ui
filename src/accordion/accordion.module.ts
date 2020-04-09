import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/public-api';
import { IconModule } from '../icon/public-api';

import {
  AccordionItemComponent,
  AccordionItemHeaderDirective,
} from './accordion-item/accordion-item.component';
import { AccordionComponent } from './accordion.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemHeaderDirective,
  ],
  imports: [CommonModule, CdkAccordionModule, IconModule, ButtonModule],
  exports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemHeaderDirective,
  ],
  providers: [],
})
export class AccordionModule {}
