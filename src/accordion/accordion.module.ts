import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button';
import { IconModule } from '../icon';

import {
  AccordionItemComponent,
  AccordionItemContentDirective,
  AccordionItemHeaderDirective,
} from './accordion-item/accordion-item.component';
import { AccordionComponent } from './accordion.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemHeaderDirective,
    AccordionItemContentDirective,
  ],
  imports: [CommonModule, CdkAccordionModule, IconModule, ButtonModule],
  exports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemHeaderDirective,
    AccordionItemContentDirective,
  ],
  providers: [],
})
export class AccordionModule {}
