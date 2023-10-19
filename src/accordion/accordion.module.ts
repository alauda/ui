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
  imports: [
    CommonModule,
    CdkAccordionModule,
    IconModule,
    ButtonModule,
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemHeaderDirective,
    AccordionItemContentDirective,
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemHeaderDirective,
    AccordionItemContentDirective,
  ],
})
export class AccordionModule {}

export const ACCORDION_MODULE = [
  AccordionComponent,
  AccordionItemComponent,
  AccordionItemHeaderDirective,
  AccordionItemContentDirective,
] as const;
