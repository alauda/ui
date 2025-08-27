import { Directive } from '@angular/core';

@Directive({
  selector: '[auiCardHeader]',
  host: {
    '[class.aui-card__header]': 'true',
  },
  standalone: true,
})
export class CardHeaderDirective {}

@Directive({
  selector: '[auiCardFooter]',
  host: {
    '[class.aui-card__footer]': 'true',
  },
  standalone: true,
})
export class CardFooterDirective {}

@Directive({
  selector: '[auiSectionTitle]',
  host: {
    '[class.aui-section__title]': 'true',
  },
  standalone: true,
})
export class SectionTitleDirective {}
