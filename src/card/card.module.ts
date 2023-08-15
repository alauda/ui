import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from './card.component';
import {
  CardFooterDirective,
  CardHeaderDirective,
  SectionTitleDirective,
} from './helper-directives';
import { SectionComponent } from './section.component';

@NgModule({
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderDirective,
    CardFooterDirective,
    SectionComponent,
    SectionTitleDirective,
  ],
  exports: [
    CardComponent,
    CardHeaderDirective,
    CardFooterDirective,
    SectionComponent,
    SectionTitleDirective,
  ],
})
export class CardModule {}
